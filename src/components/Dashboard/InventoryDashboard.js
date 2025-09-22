import React, { useState, useEffect } from "react";
import { productApi } from "../../services/api";
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
} from "@mui/material";
import {
  Search as SearchIcon,
  Inventory as InventoryIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

const transformProductStatus = (status) => {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const InventoryDashboard = () => {
  const [products, setProducts] = useState([]);
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
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" ||
      product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All Status" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getProducts(0, 10);
        const transformedProducts = response.data.content.map((product) => ({
          ...product,
          status: transformProductStatus(product.status),
        }));
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Optionally, set an error state here to show an error message in the UI
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={styles.rootBoxStyle}>
      <Box sx={styles.headerBoxStyle}>
        <InventoryIcon sx={styles.headerIconStyle} />
        <Typography variant="h5" component="h1">
          Inventory Management System
        </Typography>
        <Typography variant="subtitle1" sx={styles.headerSubtitleStyle}>
          Warehouse Manager
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={styles.statsContainerStyle}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={styles.statsPaperStyle}>
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
          <Paper elevation={0} sx={styles.statsPaperStyle}>
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
          <Paper elevation={0} sx={styles.statsPaperStyle}>
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
          <Paper elevation={0} sx={styles.statsPaperStyle}>
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

        <Box sx={styles.filterBoxStyle}>
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
                <TableRow key={product.productId}>
                  <TableCell>
                    <Box sx={styles.productNameCellStyle}>
                      <Box sx={styles.productNameTextBoxStyle}>
                        <Typography
                          variant="body2"
                          sx={styles.productNameStyle}
                        >
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.description}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stockQty}</TableCell>
                  <TableCell>{product.reserved}</TableCell>
                  <TableCell
                    sx={styles.getAvailableCellStyle(product.available)}
                  >
                    {product.available}
                  </TableCell>
                  <TableCell>
                    <Box sx={styles.getStatusChipStyle(product.status)}>
                      {product.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="text"
                        color="primary"
                        sx={{
                          minWidth: "auto",
                          padding: "4px 8px",
                          color: "#1976d2",
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        variant="text"
                        color="primary"
                        sx={{
                          minWidth: "auto",
                          padding: "4px 8px",
                          color: "#757575",
                        }}
                      >
                        View
                      </Button>

                      <Button
                        size="small"
                        variant="text"
                        color="primary"
                        sx={{
                          minWidth: "auto",
                          padding: "4px 8px",
                          color: product.status.includes("In Stock")
                            ? "#4caf50"
                            : product.status.includes("Low Stock")
                            ? "#ff9800"
                            : "#f44336",
                        }}
                      >
                        {product.status.includes("In Stock")
                          ? "Reserve"
                          : product.status.includes("Low Stock")
                          ? "Reorder"
                          : "Restock"}
                      </Button>
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
