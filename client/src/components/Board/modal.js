import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <form id="form-input" noValidate autoComplete="off">
              <TextField
                fullWidth
                id="jobTitle"
                label="Job Title"
                type="text"
                name="Job Title"
                // autoComplete="email"
                margin="normal"
                variant="outlined"
                required
                autoFocus
              />
              <TextField
                fullWidth
                id="outlined"
                label="Company Name"
                type="text"
                // autoComplete="current-password"
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                id="outlined"
                label="Salary"
                type="text"
                // autoComplete="current-password"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined"
                label="location"
                type="text"
                // autoComplete="current-password"
                margin="normal"
                variant="outlined"
              />
            </form>
          </Typography>
          <Button
            onClick={() => {
              alert("Application submitted");
              //insert mutation for submission here
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
