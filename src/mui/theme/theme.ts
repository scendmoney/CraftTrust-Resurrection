import { createTheme } from '@mui/material/styles';

import { colors } from './colors';

function theme(font: string, font2: string) {
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primary
      },
      secondary: {
        main: colors.secondary
      },
      success: {
        main: '#18D458'
      }
    },
    typography: {
      fontFamily: font,
      fontSize: 14,
      button: {
        fontFamily: font
      },

      h1: {
        fontFamily: font,
        fontSize: 'clamp(50px, 5.787vw, 100px)',
        fontWeight: '433',
        lineHeight: '120%',
        letterSpacing: '-0.04em'
      },
      h2: {
        fontFamily: font,
        fontSize: 'clamp(30px, 2.778vw, 48px)',
        fontWeight: '500',
        lineHeight: '120%',
        letterSpacing: '-0.04em'
      },
      h3: {
        fontFamily: font,
        fontSize: 'clamp(18px, 1.852vw, 32px)',
        fontWeight: '500',
        letterSpacing: '-0.04em',
        textTransform: 'initial'
      },
      h4: {
        fontFamily: font,
        fontSize: 'clamp(16px, 1.389vw, 24px)',
        fontWeight: '500',
        letterSpacing: '-0.04em',
        textTransform: 'initial'
      },
      h5: {
        fontFamily: font
      },
      h6: {
        fontFamily: font
      },
      subtitle1: {
        // Large
        fontFamily: font,
        lineHeight: '120%',
        letterSpacing: '-0.04em',
        fontWeight: 400,
        fontSize: '16px'
      },
      subtitle2: {
        // Table head
        textTransform: 'uppercase',
        fontFamily: font2,
        letterSpacing: '0',
        lineHeight: '120%',
        fontWeight: 700,
        fontSize: '12px'
      },
      body1: {
        // Regular
        fontFamily: font,
        lineHeight: '120%',
        letterSpacing: '-0.04em',
        fontWeight: 400,
        fontSize: '14px'
      },
      body2: {
        // Small
        fontFamily: font,
        fontSize: '12px',
        lineHeight: '100%',
        fontWeight: '500',
        letterSpacing: '-0.04em'
      },
      caption: {
        // Tiny
        fontFamily: font,
        fontSize: '12px',
        lineHeight: '100%',
        fontWeight: '500',
        letterSpacing: '-0.03em'
      }
    },
    shape: {
      borderRadius: 12
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1000,
        lg: 1200,
        xl: 1536
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            a: {
              color: colors.primary
            }
          }
        }
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            boxShadow: '0 0 0'
          }
        }
      },

      MuiBadge: {
        styleOverrides: {
          badge: {
            // transform: 'translate(0px, 0px)'
          }
        }
      },

      MuiDialogActions: {
        styleOverrides: {
          root: {
            display: 'flex',
            padding: 0,
            justifyContent: 'flex-start',
            marginBottom: 2
          }
        }
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            background: 'rgb(0 0 0 / 10%)',
            backdropFilter: 'blur(0px)'
          }
        }
      },
      MuiCard: {
        variants: [
          {
            props: { variant: 'outlined' },
            style: {
              border: 0,
              borderRadius: 0
            }
          }
        ]
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            boxShadow: '0 10px 30px rgb(0 0 0 / 20%)'
          }
        }
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: '8px'
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRadius: `10px 0 0 10px`,
            boxShadow: '0 50px 50px rgb(0 0 0 / 20%)'
          }
        }
      },
      MuiSlider: {
        styleOverrides: {
          markLabel: {
            transform: 'translateX(-50%)',
            '&[data-index="0"]': {
              transform: 'none'
            },
            '&[style="left: 100%;"]': {
              transform: 'translateX(-100%)'
            }
          }
        }
      }
    }
  });
  return theme;
}

export default theme;
