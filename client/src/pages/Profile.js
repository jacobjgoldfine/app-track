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


const Profile = () => {
  return (
    <main>
      <URLModal />
      <ManualApp/>
      <div>
        <Link href="/" variant="body2">
          <button id="homeBtn">Home</button>
        </Link>
      </div>
      <div className="flex-row justify-center">
        <Board />
      </div>
    </main>
  );
};

export default Profile;
