const password = "bazinga"

const getUser = async () => {
  const response = await fetch(
    `/.netlify/functions/get-user?password=${password}&id=742120190080`
  )
  const data = await response.json()
  const user = data.user
  document.getElementById("test").innerHTML = user.nom.$value
}

const getUsers = async () => {
  const response = await fetch(
    `/.netlify/functions/get-users?password=${password}&clubId=7421`
  )
  const data = await response.json()
  console.log(data.users)
}

const getClub = async () => {
  const response = await fetch(
    `/.netlify/functions/get-club?password=${password}&id=7421`
  )
  const data = await response.json()
  console.log(data.club)
}

getUser()
/* db.collection("users")
  .add({ couleur: "rouge" })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id)
  })
  .catch((error) => {
    console.error("Error adding document: ", error)
  }) */
