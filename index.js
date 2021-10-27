const getUser = async () => {
  const response = await fetch(
    "/.netlify/functions/get-user?password=bazinga&id=742120190080"
  )
  const data = await response.json()
  console.log(data.user)
}

const getUsers = async () => {
  const response = await fetch(
    "/.netlify/functions/get-users?password=bazinga&clubId=7421"
  )
  const data = await response.json()
  console.log(data.users)
}

const getClub = async () => {
  const response = await fetch(
    "/.netlify/functions/get-club?password=bazinga&id=7421"
  )
  const data = await response.json()
  console.log(data.club)
}
