export const rootBoxStyle = {
  p: 3,
};

export const headerBoxStyle = {
  display: "flex",
  alignItems: "center",
  mb: 3,
};

export const headerIconStyle = {
  mr: 1,
  color: "primary.main",
};

export const headerSubtitleStyle = {
  ml: "auto",
  color: "text.secondary",
};

export const statsContainerStyle = {
  mb: 3,
};

export const statsPaperStyle = {
  p: 2,
  display: "flex",
  alignItems: "center",
  borderRadius: 2,
  border: "1px solid #e0e0e0",
};

export const totalProductsIconStyle = {
  fontSize: 40,
  color: "#3f51b5",
  mr: 2,
};

export const inStockIconStyle = {
  fontSize: 40,
  color: "#4caf50",
  mr: 2,
};

export const lowStockIconStyle = {
  fontSize: 40,
  color: "#ff9800",
  mr: 2,
};

export const outOfStockIconStyle = {
  fontSize: 40,
  color: "#f44336",
  mr: 2,
};

export const statsValueStyle = {
  fontWeight: "bold",
};

export const tabsBoxStyle = {
  display: "flex",
  mb: 3,
};

export const activeTabStyle = {
  mr: 2,
  borderBottom: "2px solid #1976d2",
  borderRadius: 0,
  px: 2,
};

export const inactiveTabStyle = {
  mr: 2,
  px: 2,
};

export const lastTabStyle = {
  px: 2,
};

export const catalogPaperStyle = {
  p: 3,
  borderRadius: 2,
};

export const catalogHeaderStyle = {
  mb: 2,
};

export const filterBoxStyle = {
  display: "flex",
  justifyContent: "space-between",
  mb: 2,
  flexWrap: "wrap",
  gap: 2,
};

export const searchFieldStyle = {
  width: { xs: "100%", sm: "300px" },
};

export const filterControlsStyle = {
  display: "flex",
  gap: 2,
  flexWrap: "wrap",
};

export const categorySelectStyle = {
  minWidth: 150,
};

export const statusSelectStyle = {
  minWidth: 120,
};

export const addProductButtonStyle = {
  whiteSpace: "nowrap",
};

export const tableStyle = {
  minWidth: 650,
};

export const productNameCellStyle = {
  display: "flex",
  alignItems: "center",
};

export const productNameTextBoxStyle = {
  ml: 1,
};

export const productNameStyle = {
  fontWeight: 500,
};

export const getAvailableCellStyle = (available) => ({
  color:
    available === 0
      ? "error.main"
      : available < 10
      ? "warning.main"
      : "success.main",
});

export const getStatusChipStyle = (status) => ({
  bgcolor:
    status === "In Stock"
      ? "rgba(76, 175, 80, 0.08)" // Much lighter green
      : status === "Low Stock"
      ? "rgba(255, 152, 0, 0.08)" // Much lighter amber
      : "rgba(244, 67, 54, 0.08)", // Much lighter red
  color:
    status === "In Stock"
      ? "success.dark"
      : status === "Low Stock"
      ? "warning.dark"
      : "error.dark",
  py: 0.5,
  px: 1,
  borderRadius: 1,
  display: "inline-block",
  fontSize: "0.75rem",
  fontWeight: "medium",
});

export const actionsCellStyle = {
  display: "flex",
};

export const actionButtonStyle = {
  ml: 1,
  fontSize: "0.75rem",
};

export const viewIconStyle = {
  ml: 1,
};
