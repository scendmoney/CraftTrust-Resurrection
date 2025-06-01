const styles = (
  firstColumnWidth?: string,
  lastColumnWidth?: string,
  onRowClick?: ((id: string | number) => void) | undefined
) => {
  return {
    container: {
      '> div': {
        height: '100%',

        '& .MuiTableCell-head': {
          borderBottom: '1px solid transparent!important'
        },
        '& .Pagination-pagination': {
          display: 'flex',
          alignItems: 'center'
        },

        '& .Pager-pager': {
          padding: '4px',
          borderTop: '1px solid rgba(0, 0, 0, 0.10)',
          lineHeight: '20px!important'
        },

        '& .PageSizeSelector-pageSizeSelector': {
          fontSize: '14px!important',
          lineHeight: '20px!important'
        },

        '& .Pagination-rowsLabel': {
          fontSize: '14px!important',
          lineHeight: '20px!important'
        },

        '& .PageSizeSelector-inputRoot': {
          fontSize: '14px!important',
          lineHeight: '20px!important',
          display: 'flex',
          alignItems: 'center',
          fontWeight: '500',
          marginTop: '1px'
        },

        '& .PageSizeSelector-label': {
          paddingRight: '12px'
        },

        '& tbody tr .MuiTableCell-root.TableNoDataCell-cell': {
          border: '0px solid transparent!important',
          color: '#bbb',
          fontWeight: '400',
          py: 4
        },

        '& tbody tr:hover .MuiTableCell-root.TableNoDataCell-cell': {
          backgroundColor: 'transparent'
        },

        '& tbody .MuiTableCell-root.TableCell-cell div': {
          overflow: 'hidden'
        },

        '& .MuiTableBody-root': {
          '& .MuiTableRow-root': {
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              transition: 'all 0.3s ease-in-out',
              backgroundColor: onRowClick ? 'rgba(0, 0, 0, 0.10)' : 'transparent'
            }
          }
        },

        '& .MuiTableCell-root': {
          lineHeight: '120%',
          letterSpacing: '-0.04em',
          fontWeight: 500,
          fontSize: '14px',

          borderBottom: '1px solid #eee',
          '&.CellLayout-cell:first-of-type': {
            paddingLeft: '0px',
            width: firstColumnWidth
          },
          '&.CellLayout-cell:last-of-type': {
            width: lastColumnWidth
          },
          '&.TableCell-cell:first-of-type': {
            paddingLeft: '0px'
          }
        },

        '& .MuiTableCell-root.TableFixedCell-dividerLeft': {
          borderLeft: '0px solid transparent!important'
        },
        '& .MuiTableCell-root.TableFixedCell-dividerRight': {
          borderRight: '0px solid transparent!important'
        },

        '& .MuiTableHead-root': {
          position: 'sticky',
          top: 0,
          zIndex: '1000',
          backgroundColor: '#ffffff'
        },

        '& .TableFixedCell-fixedCell': {
          backgroundColor: '#ffffff99',
          backdropFilter: 'blur(4px)'
        }
      }
    },
    input: {}
  };
};

export default styles;
