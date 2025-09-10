import React, { useState, useEffect, useCallback } from 'react';
import { orderApi } from '../../services/api';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Chip,
  InputAdornment,
  Pagination,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as ExportIcon,
  ViewList as OrdersTableIcon,
  LocationSearching as OrderTrackingIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  Inventory as ProcessingIcon,
  LocalShippingOutlined as OutForDeliveryIcon,
  LocalShipping as LocalShippingIcon
} from '@mui/icons-material';

// Sample data for demonstration - will be replaced with API data
/*const sampleOrders = [
  {
    id: 'ORD-2024-001',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567'
    },
    address: {
      street: '123 Main Street',
      details: 'Apt 4B, New York, NY 10001'
    },
    items: [
      { name: 'Wireless Headphones', quantity: 2 },
      { name: 'Phone Case', quantity: 1 }
    ],
    status: 'Delivered',
    total: 189.97,
    date: 'Jan 15, 2024'
  },
  {
    id: 'ORD-2024-002',
    customer: {
      name: 'Michael Chen',
      email: 'm.chen@company.com',
      phone: '+1 (555) 987-6543'
    },
    address: {
      street: '456 Oak Avenue',
      details: 'Suite 200, Los Angeles, CA 90210'
    },
    items: [
      { name: 'Laptop Stand', quantity: 1 },
      { name: 'USB Cable', quantity: 3 }
    ],
    status: 'In Transit',
    total: 124.99,
    date: 'Jan 16, 2024'
  },
  {
    id: 'ORD-2024-003',
    customer: {
      name: 'Emily Rodriguez',
      email: 'emily.r@gmail.com',
      phone: '+1 (555) 456-7890'
    },
    address: {
      street: '789 Pine Street',
      details: 'Unit 15, Chicago, IL 60601'
    },
    items: [
      { name: 'Bluetooth Speaker', quantity: 1 },
      { name: 'Power Bank', quantity: 2 }
    ],
    status: 'Processing',
    total: 159.98,
    date: 'Jan 17, 2024'
  },
  {
    id: 'ORD-2024-004',
    customer: {
      name: 'David Wilson',
      email: 'd.wilson@business.net',
      phone: '+1 (555) 321-0987'
    },
    address: {
      street: '321 Elm Drive',
      details: 'Building C, Miami, FL 33101'
    },
    items: [
      { name: 'Wireless Mouse', quantity: 1 },
      { name: 'Keyboard', quantity: 1 }
    ],
    status: 'Cancelled',
    total: 89.99,
    date: 'Jan 18, 2024'
  }
];*/

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pageSize, setPageSize] = useState(5); // Default page size
  
  // Order tracking state
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (event, value) => {
    // Calculate the maximum valid page based on total orders and page size
    const maxValidPage = Math.max(1, Math.ceil(totalOrders / pageSize));
    
    // Ensure the requested page is valid
    const validPage = Math.min(value, maxValidPage);
    
    setPage(validPage);
    // Backend uses 0-based indexing, so we subtract 1 from the page number
    fetchOrders(validPage - 1, pageSize);
  };
  
  const handlePageSizeChange = (event) => {
    const newSize = event.target.value;
    setPageSize(newSize);
    
    // Calculate if the current page would still be valid with the new page size
    const newMaxPage = Math.max(1, Math.ceil(totalOrders / newSize));
    
    // If current page exceeds the new max page, reset to page 1
    const newPage = page > newMaxPage ? 1 : page;
    setPage(newPage);
    
    // Backend uses 0-based indexing, so we subtract 1 from the page number
    fetchOrders(newPage - 1, newSize);
  };
  
  // Function to fetch orders from the API - wrapped in useCallback to prevent recreation on every render
  const fetchOrders = useCallback(async (pageIndex, size) => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderApi.getAllOrders(pageIndex, size);
      setOrders(response.data);
      
      // For now, we're setting a fixed total count since the API might not return it
      // In a real implementation, the API should return the total count
      const estimatedTotal = response.data.length > 0 ? 10 : 0; // Assuming 10 total orders for pagination
      setTotalOrders(estimatedTotal);
      
      // If we got no data and we're not on page 1, it means we've gone too far
      // Automatically go back to page 1
      if (response.data.length === 0 && pageIndex > 0) {
        console.log('No data found on this page, returning to page 1');
        setPage(1);
        // Fetch page 1 data (index 0)
        fetchOrders(0, size);
        return;
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders. Please try again later.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Fetch orders when component mounts
  useEffect(() => {
    // Backend uses 0-based indexing, so we subtract 1 from the page number
    fetchOrders(page - 1, pageSize);
  }, [fetchOrders, page, pageSize]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Reset tracking states when switching tabs
    if (newValue === 1) {
      setTrackingOrderId('');
      setTrackingResult(null);
      setTrackingError(null);
    }
  };

  const handleExport = () => {
    console.log('Exporting data...');
    // Implementation for exporting data would go here
  };

  // Get status chip color based on status
  const getStatusChipColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success'; // Green
      case 'in transit':
        return 'warning'; // Orange/Yellow
      case 'processing':
        return 'info'; // Blue
      case 'cancelled':
        return 'error'; // Red
      case 'out for delivery':
        return 'primary'; // Blue
      case 'shipped':
        return 'secondary'; // Purple
      case 'confirmed':
        return 'warning'; // Yellow
      case 'pending':
        return 'info'; // Blue
      case 'created':
        return 'default'; // Gray
      default:
        return 'default'; // Gray
    }
  };
  
  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <DeliveredIcon sx={{ color: 'success.main' }} />; // Green
      case 'in transit':
        return <ShippingIcon sx={{ color: 'warning.main' }} />; // Orange/Yellow
      case 'processing':
        return <ProcessingIcon sx={{ color: 'info.main' }} />; // Blue
      case 'cancelled':
        return <ProcessingIcon sx={{ color: 'error.main' }} />; // Red
      case 'out for delivery':
        return <OutForDeliveryIcon sx={{ color: 'primary.main' }} />; // Blue
      case 'shipped':
        return <LocalShippingIcon sx={{ color: 'secondary.main' }} />; // Purple
      case 'confirmed':
        return <ProcessingIcon sx={{ color: 'warning.main' }} />; // Yellow
      case 'pending':
        return <ProcessingIcon sx={{ color: 'info.light' }} />; // Light Blue
      case 'created':
        return <ProcessingIcon sx={{ color: 'text.secondary' }} />; // Gray
      default:
        return <ProcessingIcon sx={{ color: 'text.secondary' }} />; // Gray
    }
  };
  
  // Handle tracking order search
  const handleTrackOrder = async () => {
    if (!trackingOrderId.trim()) return;
    
    setTrackingLoading(true);
    setTrackingError(null);
    setTrackingResult(null);
    
    try {
      // Call the real API endpoint
      const response = await orderApi.getOrderStatusHistory(trackingOrderId);
      
      // Format date function
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      };
      
      // Map API response to our UI format
      const formattedResult = {
        orderId: response.data.orderId,
        customer: response.data.customerName,
        total: response.data.totalAmount,
        currentStatus: response.data.currentStatus,
        statusHistory: response.data.statusHistoryList.map(item => ({
          status: item.newStatus,
          date: formatDate(item.changedAt),
          updatedBy: item.changedBy,
          previous: item.prevStatus
        }))
      };
      
      setTrackingResult(formattedResult);
    } catch (error) {
      console.error('Error fetching order status history:', error);
      setTrackingError('Failed to fetch order details. Please check the order ID and try again.');
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <OrdersTableIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h5" component="h1">
          Order Management Dashboard
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ ml: 'auto', color: 'text.secondary' }}
        >
          Operations Team
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
          <Tab 
            icon={<OrdersTableIcon />} 
            iconPosition="start" 
            label="Orders Table" 
            id="tab-0" 
          />
          <Tab 
            icon={<OrderTrackingIcon />} 
            iconPosition="start" 
            label="Order Tracking" 
            id="tab-1" 
          />
        </Tabs>
      </Box>

      {/* Conditional rendering based on selected tab */}
      {tabValue === 0 ? (
        <Paper sx={{ mb: 3, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            All Orders
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              placeholder="Search orders..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: '300px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<ExportIcon />}
              onClick={handleExport}
            >
              Export
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress size={40} thickness={4} />
              <Typography sx={{ mt: 2 }}>Loading orders...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
              <Typography>{error}</Typography>
            </Box>
          ) : (
          <TableContainer component={Paper} elevation={0} sx={{ mb: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell>ORDER ID</TableCell>
                  <TableCell>CUSTOMER</TableCell>
                  <TableCell>ADDRESS</TableCell>
                  <TableCell>ITEMS</TableCell>
                  <TableCell>STATUS</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>DATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length > 0 ? orders.map((orderData) => (
                  <TableRow
                    key={orderData.order.orderId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ color: 'primary.main' }}>
                      #{orderData.order.orderId}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{orderData.user.name}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {orderData.user.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {orderData.user.phoneNo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{orderData.address.streetAddress}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {orderData.address.city}, {orderData.address.state} {orderData.address.zipcode}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {orderData.itemList.map((item, index) => (
                        <Typography key={index} variant="body2">
                          {item.name} × {item.quantity}
                        </Typography>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={orderData.order.status} 
                        size="small" 
                        color={getStatusChipColor(orderData.order.status)}
                        sx={{ 
                          fontWeight: 500,
                          minWidth: '90px',
                          textAlign: 'center'
                        }} 
                      />
                    </TableCell>
                    <TableCell>${orderData.order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(orderData.order.orderDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1" sx={{ py: 2 }}>
                        No orders found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                {orders.length > 0 ? 
                  `Showing ${((page - 1) * pageSize) + 1} to ${Math.min(page * pageSize, totalOrders)} of ${totalOrders} results` : 
                  'No results to display'}
              </Typography>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="page-size-select-label">Page Size</InputLabel>
                <Select
                  labelId="page-size-select-label"
                  id="page-size-select"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  label="Page Size"
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {totalOrders > 0 && (
              <Pagination 
                count={Math.max(1, Math.ceil(totalOrders / pageSize))} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="medium"
                siblingCount={1}
                boundaryCount={1}
              />
            )}
          </Box>
        </Paper>
      ) : (
        /* Order Tracking UI */
        <Paper sx={{ mb: 3, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Order Tracking
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter an order ID to view complete status history
          </Typography>
          
          {/* Order ID Search */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Order ID</Typography>
            <Box sx={{ display: 'flex', maxWidth: 600, alignItems: 'center' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="medium"
                value={trackingOrderId}
                onChange={(e) => setTrackingOrderId(e.target.value)}
                placeholder="12"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                  },
                  mr: 2
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleTrackOrder}
                disabled={trackingLoading || !trackingOrderId.trim()}
                startIcon={trackingLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                sx={{ 
                  borderRadius: '8px',
                  py: 1.5,
                  px: 3,
                  bgcolor: '#1976d2',
                  height: '48px',
                  minWidth: '140px',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  '&:hover': {
                    bgcolor: '#1565c0'
                  }
                }}
              >
                Track Order
              </Button>
            </Box>
          </Box>
          
          {/* Loading and Error States */}
          {trackingLoading && !trackingResult && (
            <Box sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress size={40} thickness={4} />
              <Typography sx={{ mt: 2 }}>Tracking order...</Typography>
            </Box>
          )}
          
          {trackingError && !trackingLoading && (
            <Box sx={{ p: 3, textAlign: 'center', color: 'error.main', bgcolor: 'error.lighter', borderRadius: 1 }}>
              <Typography>{trackingError}</Typography>
            </Box>
          )}
          
          {/* Order Details */}
          {trackingResult && !trackingLoading && (
            <Box>
              {/* Order Header */}
              <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Order #{trackingResult.orderId}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">Customer:</Typography>
                    <Typography variant="body1" fontWeight="medium">{trackingResult.customer}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">Current Status:</Typography>
                    <Chip 
                      label={trackingResult.currentStatus} 
                      size="small" 
                      color={getStatusChipColor(trackingResult.currentStatus)}
                      sx={{ fontWeight: 500, mt: 0.5 }} 
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">Total:</Typography>
                    <Typography variant="body1" fontWeight="medium">${trackingResult.total}</Typography>
                  </Grid>
                </Grid>
              </Paper>
              
              {/* Status History */}
              <Typography variant="h6" sx={{ mb: 2 }}>
                Status History
              </Typography>
              
              <Box sx={{ ml: 1 }}>
                {trackingResult.statusHistory.map((status, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    mb: index === trackingResult.statusHistory.length - 1 ? 0 : 3,
                    position: 'relative'
                  }}>
                    {/* Status Icon */}
                    <Box sx={{ 
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {getStatusIcon(status.status)}
                    </Box>
                    
                    {/* Vertical Timeline Line */}
                    {index < trackingResult.statusHistory.length - 1 && (
                      <Box sx={{
                        position: 'absolute',
                        left: 12,
                        top: 30,
                        bottom: -30,
                        width: 2,
                        bgcolor: 'divider',
                        zIndex: 1
                      }} />
                    )}
                    
                    {/* Status Details */}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {status.status}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Previous: {status.previous}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body2">{status.date}</Typography>
                          <Typography variant="body2" color="text.secondary">Updated by: {status.updatedBy}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Dashboard;
