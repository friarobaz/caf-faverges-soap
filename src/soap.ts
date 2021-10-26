import * as soap from "soap";

interface Client extends soap.Client {}

export const getClient = async (): Promise<Client> => {
  var url = "https://extranet-clubalpin.com/app/soap/extranet_pro.wsdl";
  return new Promise((resolve, reject) => {
    soap.createClient(url, (err, client) => {
      if (err) {
        return reject(err);
      }
      resolve(client);
    });
  });
};

type Auth = {
  utilisateur: string;
  motdepasse: string;
};
export const getAuth = async (client: Client): Promise<Auth> => {
  return new Promise((resolve, reject) => {
    client.auth(null, (err: unknown, result: any) => {
      if (err) {
        return reject(err);
      }
      resolve({
        ...result,
        utilisateur: process.env.SOAP_USER,
        motdepasse: process.env.SOAP_PASSWORD,
      });
    });
  });
};

type User = {
  id: string;
  lastname: string;
  firstname: string;
};
export const getUsers = async (
  client: Client,
  auth: Auth,
  clubId: string
): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    client.extractionAdherents(
      { connect: auth, idclub: clubId },
      (err: any, result: any) => {
        if (err) {
          return reject(err);
        }
        resolve(result.extractionAdherentsReturn.collection.item);
      }
    );
  });
};

const getValue = (input: { $value: string }): string => input.$value;

export const getUser = async (
  client: Client,
  auth: Auth,
  userId: string
): Promise<User> => {
  return new Promise((resolve, reject) => {
    client.extractionAdherent(
      { connect: auth, id: userId },
      (err: any, result: any) => {
        if (err) {
          console.log("get user error", err);
          return reject(err);
        }
        const user = result.extractionAdherentReturn;
        resolve({
          id: getValue(user.id),
          lastname: getValue(user.nom),
          firstname: getValue(user.prenom),
        });
      }
    );
  });
};

type Club = {};

export const getClub = async (
  client: Client,
  auth: Auth,
  clubId: string
): Promise<Club> => {
  return new Promise((resolve, reject) => {
    client.extractionClub(
      { connect: auth, idclub: clubId },
      (err: any, result: any) => {
        if (err) {
          console.log("get club error", err);
          return reject(err);
        }
        const club = result.extractionClubReturn;
        resolve(club);
      }
    );
  });
};
