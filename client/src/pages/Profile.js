import React from "react";
import Board from "../components/Board/index";
import Link from "@mui/material/Link";
import URLModal from "../components/Board/urlModal";
import ManualApp from "../components/Board/manualAppModel";
import Auth from "../utils/auth";

const Profile = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <main>
      <URLModal />
      <div>
        <Link positionhref="/">
          <button  id="logoutbtn" onClick={logout}>
            Logout
          </button>
        </Link>
      </div>
      <ManualApp />

      <div className="flex-row justify-center">
        <Board />
      </div>
    </main>
  );
};

export default Profile;
