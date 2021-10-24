fetch('/.netlify/functions/get-user?password=lol&id=742120229081')
  .then(response => response.json())
  .then(data => console.log(data));
