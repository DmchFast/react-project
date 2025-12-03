import { Button } from '@mui/material';

function MUIButton({ children, className = '', variant = 'contained', ...props }) {
  return (
    <Button
      variant={variant}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
}

export default MUIButton;