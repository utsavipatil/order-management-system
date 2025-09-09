import React, { useState, useEffect } from 'react';
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
  InputLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as ExportIcon,
  ViewList as OrdersTableIcon,
  LocationSearching as OrderTrackingIcon
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
  
  // Function to fetch orders from the API
  const fetchOrders = async (pageIndex, size) => {
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
  };
  
  // Fetch orders when component mounts
  useEffect(() => {
    // Backend uses 0-based indexing, so we subtract 1 from the page number
    fetchOrders(page - 1, pageSize);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExport = () => {
    console.log('Exporting data...');
    // Implementation for exporting data would go here
  };

  // Get status chip color based on status
  const getStatusChipColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'in transit':
        return 'warning';
      case 'processing':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
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
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography>Loading orders...</Typography>
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
    </Box>
  );
};

export default Dashboard;
