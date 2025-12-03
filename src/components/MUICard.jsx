import { Card, CardContent, CardActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function MUICard({ children, className = '', ...props }) {
  const theme = useTheme();
  
  return (
    <Card 
      className={className}
      sx={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Card>
  );
}

export const MUICardContent = CardContent;
export const MUICardActions = CardActions;

export default MUICard;