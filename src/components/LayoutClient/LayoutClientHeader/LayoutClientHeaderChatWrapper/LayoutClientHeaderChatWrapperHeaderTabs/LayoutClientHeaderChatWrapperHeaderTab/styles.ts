import { colors } from 'mui/theme/colors';

const styles = (isSelected: boolean) => {
  return {
    button: {
      mx: 1,
      textTransform: 'initial',
      mt: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'left',
      borderRadius: '0px',
      minWidth: '200px',
      maxWidth: '100%',
      borderBottom: isSelected ? `2px solid ${colors.secondary}` : `2px solid transparent`,
      color: isSelected ? colors.black : colors.gray2,
      span: {
        fontWeight: 500
      }
    },
    badge: {
      span: {
        outline: '2px solid #fff',
        bottom: '6px',
        right: '6px'
      }
    },
    newRoundNotification: {
      background: colors.red,
      borderRadius: '50%',
      width: '12px',
      height: '12px',
      overflow: 'hidden'
    }
  };
};
export default styles;

// import { colors } from 'mui/theme/colors';

// const styles = (isSelected: boolean) => {
//   return {
//     tab: {
//       textTransform: 'initial',
//       minHeight: '60px',
//       minWidth: '240px',
//       borderBottom: isSelected ? `2px solid ${colors.secondary}` : `2px solid transparent`,
//       borderRadius: 0,
//       color: colors.black,
//       justifyContent: 'flex-start',
//       display: 'flex',
//       '@media only screen and (min-width: 768px)': {
//         '&:nth-of-type(1)': {
//           ml: 2
//         }
//       }
//     },
//     badge: {
//       span: {
//         outline: '2px solid #fff',
//         top: '6px',
//         right: '6px'
//       }
//     }
//   };
// };
// export default styles;
