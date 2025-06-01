import { colors } from 'mui/theme/colors';

import { EButtonType, IProps } from './types';

const styles = (props: IProps) => {
  const defaultStyles = {
    padding: '12px 14px',
    fontSize: '16px',
    borderRadius: '12px',
    minWidth: props.minWidth || '11.11vw',
    lineHeight: '120%',
    backgroundColor: props?.disabled ? colors.gray1 : colors.secondary,
    color: props?.disabled ? colors.gray3 : colors.white,
    fontWeight: 500,
    border: props?.disabled ? `1px solid ${colors.gray1}` : `1px solid ${colors.secondary}`,
    textTransform: 'initial',
    '&:hover': {
      backgroundColor: props?.disabled ? colors.secondary : colors.black1
    }
  };
  let addStyles = {};
  switch (props.var) {
    case EButtonType.Primary:
      addStyles = {};
      break;
    case EButtonType.PrimaryBordered:
      addStyles = {
        backgroundColor: 'transparent',
        color: colors.black,
        borderColor: colors.secondary,
        '&:hover': {
          backgroundColor: props?.disabled ? colors.secondary : colors.secondary,
          color: colors.white
        }
      };
      break;
    case EButtonType.Secondary:
      addStyles = {
        backgroundColor: props?.disabled ? colors.gray1 : colors.black,
        borderColor: props?.disabled ? colors.gray1 : colors.black
      };
      break;
    case EButtonType.Bordered:
      addStyles = {
        backgroundColor: 'transparent',
        color: colors.black,
        borderColor: colors.gray3,
        '&:hover': {
          backgroundColor: props?.disabled ? colors.black : colors.black1,
          color: colors.white
        }
      };
      break;
    case EButtonType.Gray:
      addStyles = {
        backgroundColor: colors.gray1,
        color: colors.black,
        borderColor: colors.gray1,
        '&:hover': {
          backgroundColor: props?.disabled ? colors.black : colors.black1,
          color: colors.white
        }
      };
      break;
    case EButtonType.White:
      addStyles = {
        backgroundColor: colors.white,
        color: colors.black,
        borderColor: colors.gray1,
        fontWeight: 400,
        '&:hover': {
          backgroundColor: colors.gray2
        }
      };
      break;
    case EButtonType.Green:
      addStyles = {
        backgroundColor: colors.green,
        color: colors.black,
        borderColor: colors.green,
        '&:hover': {
          backgroundColor: props?.disabled ? colors.gray1 : colors.black1,
          color: colors.white
        }
      };
      break;
    case EButtonType.Text:
      addStyles = {
        backgroundColor: 'transparent',
        color: colors.black,
        minWidth: 'initial',
        padding: '12px 2px',
        borderRadius: 0,
        borderColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent'
        }
      };
      break;
    case EButtonType.GrayBordered:
      addStyles = {
        backgroundColor: 'transparent',
        color: colors.gray5,
        borderColor: colors.gray5,
        '&:hover': {
          backgroundColor: props?.disabled ? colors.black : colors.black1,
          color: colors.white
        }
      };
      break;
    case EButtonType.WhiteBordered:
      addStyles = {
        backgroundColor: 'transparent',
        color: colors.white,
        borderColor: colors.white,
        '&:hover': {
          backgroundColor: colors.black1,
          color: colors.white
        }
      };
      break;
    case EButtonType.TextWithIcon:
      addStyles = {
        backgroundColor: 'transparent',
        color: colors.black,
        padding: '8px 8px',
        minWidth: 'max-content',
        fontSize: '14px',
        borderRadius: '12px',
        borderColor: 'transparent',
        justifyContent: 'start',
        '&:hover': {
          backgroundColor: 'transparent'
        },
        '& svg': {
          width: '24px',
          height: '24px'
        }
      };
      break;
    case EButtonType.PrimarySmall:
      addStyles = {
        fontSize: '12px',
        padding: '8px 12px'
      };
      break;
    default:
      addStyles = {};
      break;
  }

  return { ...defaultStyles, ...addStyles };
};

export default styles;
