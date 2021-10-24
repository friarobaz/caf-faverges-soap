import express from 'express';
import { getClient, getAuth, getUsers, getUser } from './soap';
const app = express()
const port = 3000

app.get('/help', async (req, res) => {
  const client = await getClient();
  console.log(client.describe());
  
  res.send({
    help: client.describe(),
  })
})

app.get('/users', async (req, res) => {
    const client = await getClient();
    const auth = await getAuth(client);
    const users = await getUsers(client, auth, "7421");
    console.log(users)
    res.send({
        // users
        user: users[0],
    })
})

app.get('/user/:id', async (req, res) => {
  const client = await getClient();
  const auth = await getAuth(client);
  const user = await getUser(client, auth, req.params.id);
  console.log(user)
  res.send({user})
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})