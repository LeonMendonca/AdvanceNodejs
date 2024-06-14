async function fetchData() {
  try {
    console.log("calling function");
      const response = await fetch('http://localhost:3000');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data; // Return the data to be used in Promise.all
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

let promises = [];
for (let i = 0; i < 6; i++) {
    promises.push(fetchData());
}

const result = await Promise.all(promises);
console.log(result);
