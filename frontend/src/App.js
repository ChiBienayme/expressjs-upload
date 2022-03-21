import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/user")
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        setIsLoading(false);
      });
  }, []);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userName", userName);

    fetch("/user", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
      });
  };

  if (isLoading)
    return (
      <h3 className="d-flex justify-content-center align-items-center">
        Loading ...
      </h3>
    );

  return (
    <div className="container">
      <h1 className="text-center my-4"> Upload Fullstack </h1>
      <div className="row">
        <form className="col-12 col-md-6 mx-auto" onSubmit={onSubmit}>
          {/* User Name */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* Image */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary text-center mb-3">
            Submit
          </button>

        </form>
      </div>

      <div className="row mt-4">
        <div className="col col-md-6 mx-auto">
          
          <ul className="list-group">
            {userList &&
              userList.map((user, index) => {
                return (
                  <li key={index} className="list-group-item">
                    <div className="card mx-auto" style={{ width: "15rem" }}>
                      <img
                        className="card-img-top"
                        src={`${user.image}`}
                        alt={`${user.userName}`}
                      />

                      <div className="card-body">
                        <h5 className="card-title">{user.userName}</h5>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default App;
