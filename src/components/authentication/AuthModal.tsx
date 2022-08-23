import React, { useState } from "react";
import { Button, Fade, Modal, Box, Typography, Backdrop, AppBar, Tabs, Tab } from "@mui/material";
import { Login, SignUp } from "../index";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  }
}

export const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}