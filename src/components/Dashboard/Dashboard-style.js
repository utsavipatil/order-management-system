// Dashboard styles

// Icon styles
export const iconStyles = {
  delivered: { color: 'success.main' },
  inTransit: { color: 'warning.main' },
  processing: { color: 'info.main' },
  cancelled: { color: 'error.main' },
  outForDelivery: { color: 'primary.main' },
  shipping: { color: 'secondary.main' },
  pending: { color: 'warning.main' },
  returned: { color: 'info.light' },
  default: { color: 'text.secondary' }
};

// Container styles
export const containerStyles = {
  mainContainer: { p: 3 },
  headerContainer: { display: 'flex', alignItems: 'center', mb: 3 },
  headerIcon: { mr: 1, color: 'primary.main' },
  exportButton: { ml: 'auto', color: 'text.secondary' },
  tabsContainer: { borderBottom: 1, borderColor: 'divider', mb: 3 }
};

// Paper styles
export const paperStyles = {
  mainPaper: { mb: 3, p: 3, borderRadius: 2 },
  outlinedPaper: { p: 3, mb: 4, borderRadius: 2 }
};

// Typography styles
export const typographyStyles = {
  sectionTitle: { mb: 2 },
  sectionTitleLarge: { mb: 3 },
  loadingText: { mt: 2 },
  orderIdLabel: { mb: 1, fontWeight: 500 }
};

// Box styles
export const boxStyles = {
  searchContainer: { display: 'flex', justifyContent: 'space-between', mb: 2 },
  searchField: { width: '300px' },
  loadingContainer: { p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  errorContainer: { p: 3, textAlign: 'center', color: 'error.main' },
  errorContainerWithBg: { p: 3, textAlign: 'center', color: 'error.main', bgcolor: 'error.lighter', borderRadius: 1 },
  paginationContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pageSizeContainer: { display: 'flex', alignItems: 'center' },
  pageSizeLabel: { mr: 2 },
  trackingContainer: { mb: 4 },
  trackingInputContainer: { display: 'flex', maxWidth: 600, alignItems: 'center' },
  statusHistoryContainer: { ml: 1 },
  statusItemContainer: (isLast) => ({ 
    display: 'flex', 
    mb: isLast ? 0 : 3,
    position: 'relative'
  }),
  statusIconContainer: { 
    mr: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2
  },
  timelineLineContainer: {
    position: 'absolute',
    left: 12,
    top: 30,
    bottom: -30,
    width: 2,
    bgcolor: 'divider',
    zIndex: 1
  },
  statusDetailsContainer: { flex: 1 },
  statusDetailsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  statusDateContainer: { textAlign: 'right' }
};

// Table styles
export const tableStyles = {
  tableContainer: { mb: 2 },
  table: { minWidth: 650 },
  tableRow: { '&:last-child td, &:last-child th': { border: 0 } },
  orderIdCell: { color: 'primary.main' },
  emptyRow: { py: 2 }
};

// Form control styles
export const formControlStyles = {
  pageSizeSelect: { minWidth: 120 }
};

// Chip styles
export const chipStyles = {
  statusChip: { fontWeight: 500, mt: 0.5 }
};

// Button styles
export const buttonStyles = {
  trackOrderButton: { 
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
  }
};

// Input styles
export const inputStyles = {
  searchInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
    },
    mr: 2
  }
};
