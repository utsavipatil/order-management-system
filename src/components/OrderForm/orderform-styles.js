/**
 * OrderForm Styles
 * 
 * This file contains all the styled components used by the OrderForm component.
 * It uses Material-UI's styled API to create custom-styled components with a consistent theme.
 * 
 * The styled components include:
 * - FormContainer: Main container for the order form
 * - FormHeader: Header section with title and close button
 * - FormTitle: Styled title with icon
 * - FormCard: Card container for form sections
 * - FormCardContent: Content wrapper for form cards
 * - SectionTitle: Styled section headers
 * - FormDivider: Custom divider between form sections
 * - SummaryContainer: Container for order summary
 * - SummaryItem: Individual summary line items
 * - SubmitButton: Primary action button
 * - CloseButton: Button to close the form
 * 
 * Icons are imported from Material-UI and can be used throughout the styled components.
 */

import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Card, CardContent, Divider } from '@mui/material';
import { ShoppingCart, Person, LocalShipping, Home, Notes } from '@mui/icons-material';

export const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const FormHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(2),
  },
}));

export const FormCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[3],
}));

export const FormCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  },
}));

export const FormDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

export const SummaryContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  height: '100%',
}));

export const SummaryItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
  '&.total': {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    fontWeight: 'bold',
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontSize: '1.1rem',
}));

export const CloseButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: theme.spacing(1),
}));

// Export all icons for consistency
export { ShoppingCart, Person, LocalShipping, Home, Notes };