import { getClient, getAuth, getUser } from "../soap"
import { Handler } from "@netlify/functions"
import { isPasswordOk } from "../auth"

export const handler: Handler = async (event, context) => {
  if (!isPasswordOk(event)) {
    return { statusCode: 401, body: "Unauthorized" }
  }

  const userId = event.queryStringParameters?.id

  if (!userId) {
    return {
      statusCode: 404,
      body: "Parameter `id` missing",
    }
  }

  const client = await getClient()
  const auth = await getAuth(client)
  const user = await getUser(client, auth, userId)

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
    }),
  }
}
