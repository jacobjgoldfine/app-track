import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_APPLICATION } from "../../utils/queries";
import { DELETE_APPLICATION } from "../../utils/mutations";
const style = {
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
  overflow: "scroll",
  maxHeight: 600,
};

export default function CardModal(props) {
  //importing information for one single card to the modal

  const { loading, data } = useQuery(QUERY_SINGLE_APPLICATION, {
    variables: { applicationId: props.appID },
  });

  const [deleteHandler, { error }] = useMutation(DELETE_APPLICATION);

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const removeCard = async (appID) => {
    try {
      await deleteHandler({
        variables: {
          appID,
        },
      });
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Modal
            open={props.open && props.activeCard === props.appID}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div>
                  <h3 style={{ textAlign: "center" }}>
                    {data.application.jobTitle}
                  </h3>
                </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div style={{ marginTop: "15%" }}>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Company name:</span>{" "}
                    {data.application.companyName}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Salary:</span>{" "}
                    {data.application.salary}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                    {data.application.location}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Details:</span>{" "}
                    {data.application.details}
                  </p>
                </div>
              </Typography>
              <div style={{ marginTop: "10%" }}>
                <Button onClick={() => removeCard(props.appID)}>Delete</Button>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
