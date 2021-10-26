const getData = async () => {
  const response = await fetch(
    "/.netlify/functions/get-club?password=bazinga&id=7421"
  );
  const data = await response.json();
  console.log(data);
};
