import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_APPLICATION } from "../../utils/mutations";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  //handles modals open and close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //useMutation to add form elements to DB
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
  });

  // need to add mutation
  const handleSubmit = (e) => {
    e.preventDefault();
    addApplication({
      variables: {
        jobTitle: formData.jobTitle,
        companyName: formData.companyName,
        salary: formData.salary,
        location: formData.location,
      },
    });
    console.log(formData);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        New Application
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>
              <h3>New Application</h3>
              <p>
                Please complete the fields below and click submit to post a new
                application submitted.
              </p>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form
              id="form-input"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
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
            </form>
          </Typography>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
