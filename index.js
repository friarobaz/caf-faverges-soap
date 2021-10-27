const getData = async () => {
  const response = await fetch(
    "/.netlify/functions/get-user?password=bazinga&id=742120190080"
  );
  const data = await response.json();
  console.log(data);
};

// 742120190080
