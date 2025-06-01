const styles = (
  type: 24 | 32 | 48 | 64 | 128 | 192 | 256,
  isHideBackground: boolean,
  isGrayBackground: boolean,
  isAddBorder: boolean
) => {
  return {
    avatar: {
      color: '#ddd',
      width: handleType(),
      height: handleType(),
      backgroundColor: isHideBackground ? 'transparent' : isGrayBackground ? '#efefef' : '#fff',
      border: isAddBorder ? '1px solid #ddd!important' : '1px solid transparent'
    }
  };

  function handleType() {
    if (type === 24) {
      return 24;
    }
    if (type === 32) {
      return 32;
    }
    if (type === 48) {
      return 48;
    }
    if (type === 64) {
      return 64;
    }
    if (type === 128) {
      return 128;
    }
    if (type === 192) {
      return 192;
    }
    if (type === 256) {
      return 256;
    }
  }
};

export default styles;
