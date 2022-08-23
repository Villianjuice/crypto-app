import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';

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

  const handleSubmit = () => {
    
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
