const getData = async () => {
    const response = await fetch('/.netlify/functions/get-user?password=lol&id=742120229081')
    const data = await response.json()
    console.log(data)
}


