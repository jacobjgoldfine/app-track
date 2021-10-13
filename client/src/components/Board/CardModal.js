// import React from "react";
// import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_APPLICATION } from "../../utils/queries";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CardModal(props) {
  //importing information for one single card to the modal

  const { loading, data } = useQuery(QUERY_SINGLE_APPLICATION, {
    variables: { applicationId: props.id },
  });

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p>{props.jobTitle}</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>{props.companyName}</p>
            <p>{props.salary}</p>
            <p>{props.location}</p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
