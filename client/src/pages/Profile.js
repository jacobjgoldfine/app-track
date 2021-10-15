import React from "react";
import Board from "../components/Board/index";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
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
        <Link positionhref="/" variant="body2">
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
