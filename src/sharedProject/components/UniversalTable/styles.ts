const styles = (isHideLeftPadding?: boolean) => {
  return {
    container: {
      '> div': {
        height: '100%',

        '& .MuiTableCell-head': {
          borderBottom: '0px solid transparent!important'
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

        '& tbody tr .MuiTableCell-root': {
          transition: '0.3s ease-in-out'
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

        '& tbody tr:hover .MuiTableCell-root': {
          transition: '0.3s ease-in-out',
          backgroundColor: '#F5F5F5'
        },

        '& .MuiTableCell-root': {
          lineHeight: '120%',
          letterSpacing: '-0.04em',
          fontWeight: 500,
          fontSize: '14px',

          borderBottom: '1px solid #eee',

          '&.TableFilterCell-cell:first-of-type': {
            paddingLeft: isHideLeftPadding ? '0px' : '16px',
            '> div': {
              paddingLeft: '0px',
              '> div': {
                paddingLeft: isHideLeftPadding ? '0px' : '8px'
              }
            }
          },
          '&.CellLayout-cell:first-of-type': {
            paddingLeft: isHideLeftPadding ? '0px' : '24px'
          },
          '&.TableCell-cell:first-of-type': {
            paddingLeft: isHideLeftPadding ? '0px' : '24px'
          }
        },

        '& .MuiTableCell-root.TableFixedCell-dividerLeft': {
          borderLeft: '0px solid transparent!important',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '5px',
            background: 'linear-gradient(to left, transparent, #eee)'
          }
        },
        '& .MuiTableCell-root.TableFixedCell-dividerRight': {
          borderRight: '0px solid transparent!important',

          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '5px',
            background: 'linear-gradient(to left, transparent, #eee)'
          }
        },

        '& .MuiToolbar-root': {
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          mb: 0
        },

        '& .TableInvisibleRow-row': {
          height: '0!important',
          width: 0,
          overflow: 'hidden!important'
        },

        '& .MuiTableHead-root': {
          position: 'sticky',
          top: 0,
          zIndex: '1000',
          backgroundColor: '#ffffff'
        },

        '& .TableFixedCell-fixedCell': {
          backgroundColor: '#ffffff'
        }
      }
    },
    input: {}
  };
};

export default styles;
