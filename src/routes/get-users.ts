import { getClient, getAuth, getUsers } from '../soap';
import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  const clubId = event.queryStringParameters?.clubId

  if (!clubId) {
    return {
      statusCode: 404,
      body: 'Parameter `clubId` missing'
    }
  }
  
  const client = await getClient();
  const auth = await getAuth(client);
  const users = await getUsers(client, auth, clubId);


  return {
    statusCode: 200,
    body: JSON.stringify({
      users,
    }),
  }
}
