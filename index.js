const getData = async () => {
  const response = await fetch(
    "/.netlify/functions/get-user-count?password=bazinga&clubId=7421"
  );
  const data = await response.json();
  console.log(data);
};
