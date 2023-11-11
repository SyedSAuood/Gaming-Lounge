import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState();
  //const urlWithProxy = "/api/v1";

  // function getDataFromServer() {
  //   axios
  //     .get("api/v1")
  //     .then((res) => setData(res.data))
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  // async function  getDataFromServer() {
  //   await axios
  //     .get("auth/redirect")
  //     .then((res) => console.log(res.data))
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  async function  getdata() {
    await axios
      .get("auth/api/user")

      .then(data =>{
        console.log(data)
        setData(data)
        
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function logineithdiscord (){
    window.location.assign('http://localhost:3000/auth/redirect')
  //     axios.get('http://localhost:3000/auth/redirect/allow-cors')
  //     .then( (res)=>{
  //     console.log(res.data)
  //  }).catch((err))
  }



  return (
    <div className="App">
      <button onClick={logineithdiscord}>Access server using proxy</button>
      <button onClick={getdata}>Getdata</button>
      <p>data : {data}</p>
    </div>
  );
}

export default App;
