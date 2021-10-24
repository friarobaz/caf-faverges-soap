import * as soap from "soap";

export const getClient = async (): Promise<any> => {
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

export const getAuth = async (client: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.auth(null, (err: any, result: any) => {
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
  id: string
  lastname: string
  firstname: string
}
export const getUsers = async (client: any, auth: any, clubId: any): Promise<User[]> => {
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

const getValue = (input: {$value: string}): string => input.$value

export const getUser = async (client: any, auth: any, userId: any): Promise<User> => {
  return new Promise((resolve, reject) => {
    client.extractionAdherent(
      { connect: auth, id: userId },
      (err: any, result: any) => {
        if (err) {
          return reject(err);
        }
        const user = result.extractionAdherentReturn
        resolve({
          id: getValue(user.id),
          lastname: getValue(user.nom),
          firstname: getValue(user.prenom),
        });
      }
    );
  });
};