import React from "react";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeading">
          <h2>SyncRoom</h2>
        </div>
        <div className="navlist">
          <p>Join as Guest</p>
          <p>Register</p>
          <p role="button">Log in </p>
        </div>
      </nav>
      <div className="mainContainer">
        <div>
          <h1>
            <span>Connect</span> with your loved ones
          </h1>
          <p>Cover a distance by SyncRoom</p>
          <div role="button">
            <Link to={"/auth"}> Get Started</Link>
          </div>
        </div>
        <div>
          <img src="/media/mobile.png" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
