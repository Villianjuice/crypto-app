import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';

import { useCryptoContext } from '../../context/CryptoContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

interface SignUpProps {
  handleClose: () => void;
}

const sx = {
  box: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    p: '10px'
  }
}

export const SignUp: React.FC <SignUpProps> = ({handleClose}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {setAlert} = useCryptoContext()

  const handleSubmit = async() => {
    if (password !== confirmPassword ) {
      setAlert({
        open: true,
        message: 'Passwords do not match',
        type: 'error'
      })
      return
    }
    if (!name) {
      setAlert({
        open: true,
        message: 'Name not specified',
        type: 'error'
      })
      return
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(result.user, {
        displayName: name,
      });

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.displayName}`,
        type: 'success'
      })

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

        type="text"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
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
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
