import { getClient, getAuth, getUser } from "../soap"
import { Handler } from "@netlify/functions"
import { isPasswordOk } from "../auth"

export const handler: Handler = async (event, context) => {
  if (!isPasswordOk(event)) {
    return { statusCode: 401, body: "Unauthorized" }
  }
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  }

  /* if (!userId) {
    return {
      statusCode: 404,
      body: "Parameter `id` missing",
    }
  } */
  //########################################################
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Successful preflight call." }),
    }
  } else if (event.httpMethod === "POST") {
    const userId = event.queryStringParameters?.id
    const client = await getClient()
    const auth = await getAuth(client)
    const user = await getUser(client, auth, userId)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        user,
      }),
    }
  }
  //########################################################
}
