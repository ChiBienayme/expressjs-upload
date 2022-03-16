import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UserCard from "./components/userCard"

function App() {
  const [actualList, setActualList] = useState([ { userName: "Chi" }])
  const [image, setImage] = useState();
  const [inputName, setInputName] = useState("");
 
  useEffect(() => {
    async function fetchListUsers(){
        try {
            const urlRequest = "http://localhost:8000/uploads"
            const respond = await fetch(urlRequest)
            const respondData= await respond.json()

            setActualList(respondData)
        } catch (error) {
            console.log("Failed to fetch..." + error.message)
        }
    }

    fetchListUsers()
  }, []);


  // submit SEND
  const send = () => {
    const formData = new FormData();
    formData.append("image", image);
    fetch("http://localhost:8000/uploads", {
      method: "POST",
      body: formData,
    });

    const newUser = {
      userName: inputName,
    }
    const usersList = [...actualList, newUser]

    if(inputName !== "") {
      setActualList(usersList);
      setInputName("")
    } else {
      console.log("Error");
    }
  };

  return (
    <> 
    {/* FORM */}
      <div>
        <input
          id="image"
          placeholder="image"
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
        ></input>

        <input
          id="user name"
          placeholder="user name"
          type="text"
          onChange={(event) => setInputName(event.target.value)}
        ></input>

        <button  className="btn btn-primary m-3"
        onClick={send}> Send </button>
      </div> 

    {/* Updated List */}
      <div className="nav nav-pills nav-justified row">
      {actualList.map((user) => { 
              return (
                <UserCard 
                  name={user.userName} />
              )
          })}
      </div>
      
    </>
  );
}

export default App;