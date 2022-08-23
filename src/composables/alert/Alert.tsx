import { Alert, Snackbar } from '@mui/material'
import { useCryptoContext } from '../../context/CryptoContext'

export const AlertMessage = () => {
  const {alert, setAlert} = useCryptoContext()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(prev => ({...prev, open: false}))
  };

  return (
    <Snackbar 
      open={alert.open}
      autoHideDuration={2500}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        elevation={10}
        variant='filled'
        severity={alert.type}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}
