console.log("penis");
import { getClient, getAuth, getClub } from "../soap";
import { Handler } from "@netlify/functions";
import { isPasswordOk } from "../auth";

export const handler: Handler = async (event, context) => {
  if (!isPasswordOk(event)) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const clubId = event.queryStringParameters?.id;

  if (!clubId) {
    return {
      statusCode: 404,
      body: "Parameter `id` missing",
    };
  }

  const client = await getClient();
  const auth = await getAuth(client);
  const club = await getClub(client, auth, clubId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      club,
    }),
  };
};
