import { getClient, getAuth, getUser } from './soap';
import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  const client = await getClient();
  const auth = await getAuth(client);
  const user = await getUser(client, auth, event.queryStringParameters!.id);

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
    }),
  }
}
