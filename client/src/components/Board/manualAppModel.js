import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_APPLICATION } from "../../utils/mutations";
import SendIcon from "@mui/icons-material/Send";

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ManualApp() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [addApplication, { error }] = useMutation(ADD_APPLICATION);

  //will console log any errors
  if (error) {
    console.log("error:", error);
  }

  //takes form info from the input fields and sets up a state for them
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    salary: "",
    location: "",
    details: "",
  });

  // need to add mutation
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (formData.jobTitle === "" || formData.jobTitle === null) {
      alert("Please enter a Job Title");
      return;
    } else if (formData.companyName === "" || formData.companyName === null) {
      alert(" Please enter a the Company name");
      return;
    } else {
      handleClose();
      console.log("YOU DID IT!");
      addApplication({
        variables: {
          jobTitle: formData.jobTitle,
          companyName: formData.companyName,
          salary: formData.salary,
          location: formData.location,
          details: formData.details,
        },
      });
      window.location.reload();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>New Application</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style2 }}>
          <h2 id="child-modal-title">New Application Details</h2>
          <p id="child-modal-description">
            Please complete the fields below and click submit to post your new
            application.
          </p>
          <form id="form-input" noValidate autoComplete="off">
            <TextField
              fullWidth
              id="jobTitle"
              label="Job Title"
              type="text"
              name="Job Title"
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              value={formData.jobTitle}
              margin="normal"
              variant="outlined"
              required
              autoFocus
            />
            <TextField
              fullWidth
              id="companyName"
              label="Company Name"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              value={formData.companyName}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              id="salary"
              label="Salary"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              value={formData.salary}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="location"
              label="location"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              value={formData.location}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="details"
              label="details"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              value={formData.details}
              margin="normal"
              variant="outlined"
            />
          </form>
          <Button
            sx={{ ml: 90 }}
            onClick={handleManualSubmit}
            variant="contained"
            type="submit"
            endIcon={<SendIcon />}
          >
            Submit Application{" "}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
