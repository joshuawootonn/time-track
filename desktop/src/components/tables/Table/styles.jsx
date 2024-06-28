export default (theme) => ({
  //table
  headerCell: {
    background: `white`,
    position: `sticky`,
    top: 0,
    marginRight: 0,
    flex: 1,
  },
  // table
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  // header cell table
  flexContainer: {
    display: `flex`,
    alignItems: `center`,
    boxSizing: `border-box`,
    flex: 1,
    marginRight: 0,
    textTransform: `none`,
  },
  //table
  tableRow: {
    cursor: `pointer`,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  tableRowSelected: {
    cursor: `pointer`,
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
  },
  tableRowHover: {
    marginRight: 0,
    flex: 1,
  },
  // header cell
  tableCell: {
    flex: 1,
    marginRight: 0,
    fontSize: `.8rem`,
  },
})
