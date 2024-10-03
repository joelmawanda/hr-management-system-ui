import { Close } from "@mui/icons-material";
import { Alert, AlertTitle, Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "../store/alertSlice";

const AlertModal = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const waitTime = 10000;
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (alert.open === true) {
        setTimeout(startTimer, waitTime);                   
    }
})

  const startTimer = () => {
    console.log('Let us close the alert');
        dispatch(closeAlert());
  }

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'flex-end'}}>
      {alert.title === "Success" ? (
        <Alert
          severity="success"
          variant="filled"
          sx={{
            // marginLeft: "70%",
            // maxWidth: "50%",
            // backgroundColor: "white",
            // color: "green",
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(closeAlert());
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      ) : (
        <Alert
          severity="error"
          variant="filled"
          sx={{
                       
            // marginLeft: "30%",
            // marginRight: '20px',
            // maxWidth: "50%",
            // backgroundColor: "white",
            // color: "red",
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(closeAlert());
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      )}
    </Box>
  );
};
export default AlertModal;
