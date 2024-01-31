Challenge: Given the url above, make this app fetch the data and display them in the table in the browser
Solution : https://codepen.io/Seemant-Kumar/pen/OJqvVZp?editors=1111

<-------------------------------------------------------------------------------------------------------------------------->

function App() {
  const url = "https://jsonplaceholder.typicode.com/users/1";
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(url);
    const responseJson = await response.json();
    setUserData(responseJson);
  };
  // No need to touch code below
  return (
    <div className="App">
      <h2>User Data</h2>
      <p>
        <strong>Name: </strong>{" "}
        {userData.name || "(Need to populate name here)"}
      </p>
      <p>
        <strong>Website: </strong>
        {userData.website || "(Need to populate website here)"}
      </p>
      <p>
        <strong>Email: </strong>
        {userData.email || "(Need to populate email here)"}
      </p>
      <p>
        <strong>Phone: </strong>
        {userData.phone || "(Need to populate phone here)"}
      </p>
      <table>
        <tr>
          <th>Name</th>
          <th>Website</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        <tr>
          <td>{userData.name}</td>
          <td>{userData.website}</td>
          <td>{userData.email}</td>
          <td>{userData.phone}</td>
        </tr>
      </table>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

