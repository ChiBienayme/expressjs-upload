import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState();
  const [userName, setUserName] = useState("")

  const send = () => {
    const formData = new FormData();
    formData.append("image", image);
    fetch("http://localhost:8000/user", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <>
      <input
        placeholder="image"
        type="file"
        onChange={(event) => setImage(event.target.files[0])}
      ></input>

      <input
        placeholder="user name"
        type="text"
        onChange={(event) => setUserName(event.target.value)}
      ></input>

      <button onClick={send}>Send</button>
    </>
  );
}

export default App;