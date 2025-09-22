import React, { useState, useEffect } from "react";
import * as styles from "./InventoryDashboard-styles";
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
  InputAdornment,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Inventory as InventoryIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";

// Sample data for demonstration - will be replaced with API data
const sampleProducts = [
  {
    id: "WH-001",
    name: "Wireless Headphones",
    description: "Premium Audio Device",
    category: "Electronics",
    stockQty: 150,
    reserved: 25,
    available: 125,
    status: "In Stock",
  },
  {
    id: "SC-002",
    name: "Smartphone Case",
    description: "Protective Phone Cover",
    category: "Electronics",
    stockQty: 8,
    reserved: 3,
    available: 5,
    status: "Low Stock",
  },
  {
    id: "RS-003",
    name: "Running Shoes",
    description: "Athletic Footwear",
    category: "Clothing",
    stockQty: 0,
    reserved: 0,
    available: 0,
    status: "Out of Stock",
  },
];

const InventoryDashboard = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Stats calculation
  const totalProducts = products.length;
  const inStockProducts = products.filter(
    (p) => p.status === "In Stock"
  ).length;
  const lowStockProducts = products.filter(
    (p) => p.status === "Low Stock"
  ).length;
  const outOfStockProducts = products.filter(
    (p) => p.status === "Out of Stock"
  ).length;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" ||
      product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All Status" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // API call would go here
    // For now, we're using the sample data
  }, []);

  return (
    <Box sx={styles.rootBoxStyle}>
      <Box sx={styles.headerBoxStyle}>
        <InventoryIcon sx={styles.headerIconStyle} />
        <Typography variant="h5" component="h1">
          Inventory Management System
        </Typography>
        <Typography
          variant="subtitle1"
          sx={styles.headerSubtitleStyle}
        >
          Warehouse Manager
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={styles.statsContainerStyle}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={styles.statsPaperStyle}
          >
            <InventoryIcon sx={styles.totalProductsIconStyle} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Products
              </Typography>
              <Typography variant="h4" sx={styles.statsValueStyle}>
                {totalProducts.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={styles.statsPaperStyle}
          >
            <CheckCircleIcon sx={styles.inStockIconStyle} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                In Stock
              </Typography>
              <Typography variant="h4" sx={styles.statsValueStyle}>
                {inStockProducts.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={styles.statsPaperStyle}
          >
            <WarningIcon sx={styles.lowStockIconStyle} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Low Stock
              </Typography>
              <Typography variant="h4" sx={styles.statsValueStyle}>
                {lowStockProducts.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={styles.statsPaperStyle}
          >
            <ErrorIcon sx={styles.outOfStockIconStyle} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Out of Stock
              </Typography>
              <Typography variant="h4" sx={styles.statsValueStyle}>
                {outOfStockProducts.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Navigation Tabs */}
      <Box sx={styles.tabsBoxStyle}>
        <Button
          variant="text"
          color="primary"
          sx={styles.activeTabStyle}
          startIcon={<InventoryIcon />}
        >
          Product Catalog
        </Button>
        <Button
          variant="text"
          color="inherit"
          sx={styles.inactiveTabStyle}
          startIcon={<InventoryIcon />}
        >
          Order Workflow
        </Button>
        <Button
          variant="text"
          color="inherit"
          sx={styles.inactiveTabStyle}
          startIcon={<WarningIcon />}
        >
          Low Stock Alerts
        </Button>
        <Button
          variant="text"
          color="inherit"
          sx={styles.inactiveTabStyle}
          startIcon={<InventoryIcon />}
        >
          Order History
        </Button>
        <Button
          variant="text"
          color="inherit"
          sx={styles.lastTabStyle}
          startIcon={<InventoryIcon />}
        >
          Reservations
        </Button>
      </Box>

      {/* Product Catalog Section */}
      <Paper sx={styles.catalogPaperStyle}>
        <Typography variant="h6" sx={styles.catalogHeaderStyle}>
          Product Catalog
        </Typography>

        <Box
          sx={styles.filterBoxStyle}
        >
          <TextField
            placeholder="Search products..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={styles.searchFieldStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={styles.filterControlsStyle}>
            <Select
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              size="small"
              sx={styles.categorySelectStyle}
            >
              <MenuItem value="All Categories">All Categories</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Clothing">Clothing</MenuItem>
            </Select>

            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              size="small"
              sx={styles.statusSelectStyle}
            >
              <MenuItem value="All Status">All Status</MenuItem>
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Low Stock">Low Stock</MenuItem>
              <MenuItem value="Out of Stock">Out of Stock</MenuItem>
            </Select>

            <Button
              variant="outlined"
              color="primary"
              sx={styles.addProductButtonStyle}
            >
              Add Product
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table sx={styles.tableStyle} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell>PRODUCT</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>CATEGORY</TableCell>
                <TableCell>STOCK QTY</TableCell>
                <TableCell>RESERVED</TableCell>
                <TableCell>AVAILABLE</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Box sx={styles.productNameCellStyle}>
                      <Box sx={styles.productNameTextBoxStyle}>
                        <Typography variant="body2" sx={styles.productNameStyle}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.description}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stockQty}</TableCell>
                  <TableCell>{product.reserved}</TableCell>
                  <TableCell
                    sx={styles.getAvailableCellStyle(product.available)}
                  >
                    {product.available}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={styles.getStatusChipStyle(product.status)}
                    >
                      {product.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={styles.actionsCellStyle}>
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      {product.status === "Out of Stock" && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={styles.actionButtonStyle}
                        >
                          Restock
                        </Button>
                      )}
                      {product.status === "In Stock" && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={styles.actionButtonStyle}
                        >
                          Reserve
                        </Button>
                      )}
                      <IconButton size="small" color="primary" sx={styles.viewIconStyle}>
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default InventoryDashboard;
