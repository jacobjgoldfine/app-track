// **  NOTE this is nested version. everything works on it
// **  kept this file in here just in case. 
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import { TextField } from "@mui/material";
// import { useState } from "react";
// import React from "react";
// import { useMutation } from "@apollo/client";
// import { ADD_APPLICATION, ADD_APPLICATION_WITH_URL } from "../../utils/mutations";
// import SendIcon from "@mui/icons-material/Send";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 900,
//   height: 300,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const style2 = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 1000,
//   height: 500,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// function DetailsModal() {
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const [addApplication, { error }] = useMutation(ADD_APPLICATION);

//   //will console log any errors
//   if (error) {
//     console.log("error:", error);
//   }

//   //takes form info from the input fields and sets up a state for them
//   const [formData, setFormData] = useState({
//     jobTitle: "",
//     companyName: "",
//     salary: "",
//     location: "",
//   });

//   // need to add mutation
//   const handleManualSubmit = (e) => {
//     e.preventDefault();
//     handleClose();
//     console.log('YOU DID IT!')
//     addApplication({
//       variables: {
//         jobTitle: formData.jobTitle,
//         companyName: formData.companyName,
//         salary: formData.salary,
//         location: formData.location,
//       },
//     });
//     console.log(formData);
//   };

//   return (
//     <React.Fragment>
//       <Button sx={{ mr: 82 }} onClick={handleOpen} variant="outlined">
//         Skip
//       </Button>
//       <Button onClick={handleOpen} variant="contained" endIcon={<SendIcon />}>
//         Submit{" "}
//       </Button>
//       <Modal
//         hideBackdrop
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...style2 }}>
//           <h2 id="child-modal-title">New Application Details</h2>
//           <p id="child-modal-description">
//             Please complete the fields below and click submit to post your new application.
//           </p>
//           <form id="form-input" noValidate autoComplete="off">
//             <TextField
//               fullWidth
//               id="jobTitle"
//               label="Job Title"
//               type="text"
//               name="Job Title"
//               onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
//               value={formData.jobTitle}
//               margin="normal"
//               variant="outlined"
//               required
//               autoFocus
//             />
//             <TextField
//               fullWidth
//               id="companyName"
//               label="Company Name"
//               type="text"
//               onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
//               value={formData.companyName}
//               margin="normal"
//               variant="outlined"
//               required
//             />
//             <TextField
//               fullWidth
//               id="salary"
//               label="Salary"
//               type="text"
//               onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
//               value={formData.salary}
//               margin="normal"
//               variant="outlined"
//             />
//             <TextField
//               fullWidth
//               id="location"
//               label="location"
//               type="text"
//               onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//               value={formData.location}
//               margin="normal"
//               variant="outlined"
//             />
//           </form>
//           <Button sx={{ ml: 90 }} onClick={handleManualSubmit} variant="contained" type='submit' endIcon={<SendIcon />}>
//             Submit Application{" "}
//           </Button>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

// export default function UrlModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   //useMutation to add form elements to DB with URL
//   const [addApplicationURL, { error }] = useMutation(ADD_APPLICATION_WITH_URL);

//   //will console log any errors
//   if (error) {
//     console.log("error:", error);
//   }

//   //takes form info from the input fields and sets up a state for them
//   const [formData, setFormData] = useState({
//     URL: "",
//   });

//   // need to add mutation
//   const handleSubmitIndeedForm = (e) => {
//     e.preventDefault();
//     console.log('indeed form')
//     addApplicationURL({
//       variables: {
//         URL: formData.URL,
//       },
//     });
//     console.log(formData);
//   };

//   return (
//     <div>
//       <Button onClick={handleOpen}>New Application</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Box sx={{ ...style }}>
//           <h2 id="parent-modal-title">Indeed URL</h2>
//           <p id="parent-modal-description">
//             If you are found this job through Indeed, paste the job posting link in the URL.
//           </p>
//           <form>
//             <TextField
//               fullWidth
//               id="IndeedURL"
//               label="Indeed URL"
//               type="text"
//               onChange={(e) => setFormData({ ...formData, URL: e.target.value })}
//               value={formData.URL}
//               margin="normal"
//               variant="outlined"
//               onSubmit={handleSubmitIndeedForm}
//             />
//           </form>
//           <DetailsModal />
//         </Box>
//       </Modal>
//     </div>
//   );
// }
