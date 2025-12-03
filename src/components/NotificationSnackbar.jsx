import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

function NotificationSnackbar({ notification, onClose }) {
  const getAlertSeverity = (type) => {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'info';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '💡';
    }
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{
        '& .MuiSnackbar-root': {
          position: 'relative'
        }
      }}
    >
      <Alert
        severity={getAlertSeverity(notification.type)}
        variant="filled"
        icon={getAlertIcon(notification.type)}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          width: '100%',
          '& .MuiAlert-message': {
            flex: 1,
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }
        }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}

export default NotificationSnackbar;