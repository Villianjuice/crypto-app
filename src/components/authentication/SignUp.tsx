import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';

import { useCryptoContext } from '../../context/CryptoContext';

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {setAlert} = useCryptoContext()

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Passwords do not match',
        type: 'error'
      })
    }
    return
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
