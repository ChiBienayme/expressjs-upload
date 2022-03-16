import React from "react";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

export default function userCard(props) {
  return (
    
    <>
        <ul className="user-card nav nav-pills nav-justified col-sm-12 col-lg-6">
          <li className="nav-item" id="title-1">
            <h3>
              <span className="badge badge-pill badge-primary">
                {props.name}
              </span>
            </h3>
          </li>

        </ul>
    </>
  );
}
