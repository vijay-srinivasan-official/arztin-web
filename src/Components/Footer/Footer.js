import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Arztin
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        Your health, our priority.
      </Typography>
    </Box>
  );
};

export default Footer;
