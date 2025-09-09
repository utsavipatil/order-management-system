import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, AppBar, Toolbar, Typography, Box, Dialog, Button } from '@mui/material';
import theme from './theme';
import OrderForm from './components/OrderForm/OrderForm';
import Section1 from './components/Section1/Section1';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const handleOrderNowClick = () => {
    setIsOrderFormOpen(true);
  };

  const handleCloseOrderForm = () => {
    setIsOrderFormOpen(false);
  };

  const handleDashboardClick = () => {
    setIsDashboardOpen(true);
  };
  
  const handleCloseDashboard = () => {
    setIsDashboardOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ display: 'inline', marginRight: 2 }}>
              Order Management System
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="medium" 
              onClick={handleDashboardClick}
              sx={{ mr: 'auto' }}
            >
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Section1 onOrderNowClick={handleOrderNowClick} />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Other content can go here */}
      </Container>
      
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 4, borderTop: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Order Management System. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <Dialog 
        open={isOrderFormOpen} 
        onClose={handleCloseOrderForm}
        maxWidth="md"
        fullWidth
      >
        <OrderForm onClose={handleCloseOrderForm} />
      </Dialog>

      <Dialog 
        open={isDashboardOpen} 
        onClose={handleCloseDashboard}
        maxWidth="xl"
        fullWidth
      >
        <Dashboard />
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
