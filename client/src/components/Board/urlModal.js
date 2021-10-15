import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_APPLICATION_WITH_URL } from "../../utils/mutations";
import SendIcon from "@mui/icons-material/Send";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UrlModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //useMutation to add form elements to DB with URL
  const [addApplicationURL, { error }] = useMutation(ADD_APPLICATION_WITH_URL);

  //will console log any errors
  if (error) {
    console.log("error:", error);
  }

  //takes form info from the input fields and sets up a state for them
  const [formData, setFormData] = useState({
    URL: "",
  });

  // need to add mutation
  const handleSubmitIndeedForm = async (e) => {
    e.preventDefault();
    if (formData.URL === "" || formData.URL === null) {
      alert("please enter a Indeed URL");
      return;
    } else {
      console.log("indeed form");
      await addApplicationURL({
        variables: {
          URL: formData.URL,
        },
      });
      window.location.reload();
    }
  };

  return (
    <div>
      <Button variant="outlined" size="medium" onClick={handleOpen}>New Application With Indeed URL</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">Indeed URL</h2>
          <p id="parent-modal-description">
            If you are found this job through Indeed, paste the job posting link in the URL.
          </p>
          <form>
            <TextField
              fullWidth
              id="IndeedURL"
              name="urlLink"
              label="Indeed URL"
              type="text"
              onChange={(e) => setFormData({ ...formData, URL: e.target.value })}
              value={formData.URL}
              margin="normal"
              variant="outlined"
            />
          </form>
          <Button onClick={handleSubmitIndeedForm} variant="contained" endIcon={<SendIcon />}>
            Submit{" "}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
