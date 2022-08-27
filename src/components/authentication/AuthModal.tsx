import React, { useState } from "react";
import { Button, Fade, Modal, Box, Backdrop, AppBar, Tabs, Tab } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";

import { Login, SignUp } from "../index";
import { auth } from "../../firebase/firebase";
import { useCryptoContext } from "../../context/CryptoContext";

const sx = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    bgcolor: 'background.paper',
    color: "white",
  },
  button : {
    width: 95,
    height: 40,
    backgroundColor: "#EEBC1D",
    "&:hover": {
      border: "1px solid white",
      color: 'white',
      backgroundColor: '#EEBC1D'
    },
  },
  AppBar: {
    backgroundColor: "transparent",
    color: "white",
  },
  tabs: {
    borderRadius: 10
  },
  google: {
    padding: '24px',
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: '20px',
    fontSize: '16px',
    opacity: '0.8'
  }
}

export const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const {setAlert} = useCryptoContext()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async() => {
    try {
      const response = await signInWithPopup(auth, googleProvider)

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${response.user.email}`,
        type: 'success'
      })

      handleClose()
    }
    catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      setAlert({
        open: true,
        message: message,
        type: 'error'
      })
    }
  };

  return (
    <div>
      <Button sx={sx.button} variant="contained" onClick={handleOpen}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={sx.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={sx.paper} >
            <AppBar position="static" sx={sx.AppBar}>
               <Tabs 
                value={value}
                variant='fullWidth'
                sx={sx.tabs}
                onChange={handleChange}
                indicatorColor="secondary"
               >
                <Tab label='Login'/>
                <Tab label='Sign up'/>
               </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose}/>}
            {value === 1 && <SignUp handleClose={handleClose}/>}
            <Box sx={sx.google}>
              <span>Or</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}