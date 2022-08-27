import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useCryptoContext } from '../../context/CryptoContext';
import { auth } from '../../firebase/firebase';

interface LoginProps {
  handleClose: () => void;
}

const sx = {
  box: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    p: '15px'
  }
}

export const Login: React.FC <LoginProps> = ({handleClose}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setAlert} = useCryptoContext()

  const handleSubmit = async() => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.displayName}`,
        type: 'success'
      })
      console.log(result)

      handleClose()
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      setAlert({
        open: true,
        message: message,
        type: 'error'
      })
    }
  }

  return (
    <Box sx={sx.box}>
      <TextField
        variant="outlined"

        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  )
}
