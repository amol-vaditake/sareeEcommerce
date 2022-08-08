import React from "react";
import "./update.scss";
function UpdatesInsta() {
  return (
    <React.Fragment>
      <div className="updateContainer">
        <div className="leftContainer">
          <img src="home1.jpeg" alt="pic" />
        </div>
        <div className="rightContainer">
          <h3>Need Instant Product Updates?</h3>
          <p>You can view our latest categories and product updates at our instagram page @akalpa_by_harshitha</p><br/>
         <a href="https://www.instagram.com/akalpa_by_harshitha/"> <button>Follow on instagram</button></a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UpdatesInsta;
