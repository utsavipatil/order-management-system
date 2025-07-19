/**
 * OrderForm Component
 * 
 * A comprehensive form component for creating and managing customer orders.
 * 
 * Features:
 * - Collects customer information (name, email, phone)
 * - Product selection with quantity
 * - Shipping address details
 * - Order summary with real-time calculations
 * - Form validation
 * - Responsive layout using Material-UI Grid
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Callback function to close the form
 * @returns {JSX.Element} The OrderForm component
 */
import React, { useState } from "react";
import { TextField, Grid, MenuItem, Typography } from "@mui/material";
import {
  FormContainer,
  FormHeader,
  FormTitle,
  FormCard,
  FormCardContent,
  SectionTitle,
  FormDivider,
  SummaryContainer,
  SummaryItem,
  SubmitButton,
  CloseButton,
  ShoppingCart,
  Person,
  LocalShipping,
  Home,
  Notes,
} from "./orderform-styles";

const products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Smartphone", price: 699.99 },
  { id: 3, name: "Headphones", price: 149.99 },
  { id: 4, name: "Tablet", price: 349.99 },
  { id: 5, name: "Smartwatch", price: 199.99 },
];

const OrderForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    productId: "",
    quantity: 1,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    specialInstructions: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim())
      newErrors.customerName = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.productId) newErrors.productId = "Please select a product";
    if (formData.quantity < 1)
      newErrors.quantity = "Quantity must be at least 1";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would submit the form data to your backend here
      console.log("Form submitted:", formData);
      // Show success message and close the form
      alert("Order placed successfully!");
      if (onClose) {
        onClose();
      }
    }
  };

  const selectedProduct = products.find(
    (p) => p.id === Number(formData.productId)
  );
  const subtotal = selectedProduct
    ? selectedProduct.price * formData.quantity
    : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle variant="h4">
          <ShoppingCart /> Place a New Order
        </FormTitle>
        {onClose && (
          <CloseButton onClick={handleClose} color="inherit">
            ✕
          </CloseButton>
        )}
      </FormHeader>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Left column - Customer Information */}
          <Grid item xs={12} md={8}>
            <FormCard>
              <FormCardContent>
                <SectionTitle variant="h5">
                  <Person /> Customer Information
                </SectionTitle>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      error={!!errors.customerName}
                      helperText={errors.customerName}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      margin="normal"
                      required
                    />
                  </Grid>
                </Grid>

                <FormDivider />

                <SectionTitle variant="h5">
                  <LocalShipping /> Order Details
                </SectionTitle>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      fullWidth
                      label="Select Product"
                      name="productId"
                      value={formData.productId}
                      onChange={handleChange}
                      error={!!errors.productId}
                      helperText={errors.productId}
                      margin="normal"
                      required
                    >
                      <MenuItem value="">Select a product</MenuItem>
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name} - ${product.price.toFixed(2)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleChange}
                      error={!!errors.quantity}
                      helperText={errors.quantity}
                      margin="normal"
                      inputProps={{ min: 1 }}
                      required
                    />
                  </Grid>
                </Grid>

                <FormDivider />

                <SectionTitle variant="h5">
                  <Home /> Shipping Information
                </SectionTitle>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Street Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      error={!!errors.address}
                      helperText={errors.address}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      error={!!errors.city}
                      helperText={errors.city}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="State/Province"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      error={!!errors.state}
                      helperText={errors.state}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="ZIP/Postal Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      error={!!errors.zipCode}
                      helperText={errors.zipCode}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Special Instructions"
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <Notes sx={{ mr: 1, color: "action.active" }} />
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </FormCardContent>
            </FormCard>
          </Grid>

          {/* Right column - Order Summary */}
          <Grid item xs={12} md={4}>
            <FormCard>
              <FormCardContent>
                <SectionTitle variant="h5">Order Summary</SectionTitle>

                {selectedProduct && (
                  <SummaryContainer>
                    <SummaryItem>
                      <span>
                        {selectedProduct.name} × {formData.quantity}
                      </span>
                      <span>
                        $
                        {(selectedProduct.price * formData.quantity).toFixed(2)}
                      </span>
                    </SummaryItem>

                    <FormDivider />

                    <SummaryItem>
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </SummaryItem>

                    <SummaryItem>
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </SummaryItem>

                    <FormDivider />

                    <SummaryItem className="total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </SummaryItem>
                  </SummaryContainer>
                )}

                <SubmitButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Place Order
                </SubmitButton>

                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mt: 2, display: "block" }}
                >
                  By placing this order, you agree to our terms and conditions.
                </Typography>
              </FormCardContent>
            </FormCard>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default OrderForm;
