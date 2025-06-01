import projectConstants from 'projectConstants';

const validations = {
  required: {
    required: 'Required'
  },
  text: {
    minLength: {
      value: 2,
      message: projectConstants.validations.min2Symbols
    },
    maxLength: {
      value: 128,
      message: projectConstants.validations.max128Symbols
    }
  },
  password: {
    required: 'Required',

    // @MinLength(8)
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long'
    },
    // @MaxLength(64)
    maxLength: {
      value: 64,
      message: 'Password must be at most 64 characters long'
    },
    // @NotContains(" ")
    validate: (value: string) => (!/\s/.test(value) ? true : 'Password must not contain spaces'),
    // @IsAscii()
    pattern: {
      value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      message: 'Must have one uppercase, one lowercase, and one number or special char'
    }
  },
  requiredText: {
    required: 'Required',
    minLength: {
      value: 2,
      message: projectConstants.validations.min2Symbols
    },
    maxLength: {
      value: 128,
      message: projectConstants.validations.max128Symbols
    }
  },
  requiredName: {
    required: 'Required',
    minLength: {
      value: 2,
      message: projectConstants.validations.min2Symbols
    },
    maxLength: {
      value: 64,
      message: projectConstants.validations.max64Symbols
    }
  },
  phone: {
    minLength: {
      value: 2,
      message: projectConstants.validations.min2Symbols
    },
    maxLength: {
      value: 128,
      message: projectConstants.validations.max128Symbols
    },
    pattern: {
      value: /^(( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
      message: projectConstants.validations.incorrectPhone
    }
  },
  requiredPhone: {
    required: 'Required',
    minLength: {
      value: 2,
      message: projectConstants.validations.min2Symbols
    },
    maxLength: {
      value: 128,
      message: projectConstants.validations.max128Symbols
    },
    pattern: {
      value: /^(( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
      message: projectConstants.validations.incorrectPhone
    }
  },
  requiredEmail: {
    required: 'Required',
    minLength: {
      value: 3,
      message: projectConstants.validations.min3Symbols
    },
    maxLength: {
      value: 128,
      message: projectConstants.validations.max128Symbols
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: projectConstants.validations.incorrectEmail
    }
  },
  email: {
    minLength: {
      value: 3,
      message: projectConstants.validations.min3Symbols
    },
    maxLength: {
      value: 128,
      message: projectConstants.validations.max128Symbols
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: projectConstants.validations.incorrectEmail
    }
  }
};

export default validations;
