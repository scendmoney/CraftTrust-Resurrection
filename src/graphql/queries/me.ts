import { gql } from '@apollo/client';

const ME = gql`
  query me {
    me {
      id
      role
      fullName
      email

      asset {
        id
        url
      }

      context {
        id
        displayName
        role
        description

        license {
          licenseNumber
        }

        isChatMessage

        owner {
          id
          fullName
        }
        userContact {
          id
          phoneNumber
          email
        }

        name
        asset {
          id
          url
        }
      }
    }
  }
`;

export const ME_POFILE_EDIT = gql`
  query me {
    me {
      asset {
        id
        url
      }

      email

      fullName
      id

      phoneNumber

      role

      license {
        licenseEndDate
        licenseNumber
        isLicenseActive
      }

      dates {
        createdDate
      }
    }
  }
`;

export const ME_FACILITY_EDIT = gql`
  query me {
    me {
      id
      userToFacilities {
        id

        owner {
          id
        }

        displayName
        name
        description
        role

        asset {
          id
          url
        }

        userContact {
          id
        }

        users {
          id
          fullName
          phoneNumber
          email

          license {
            licenseEndDate
            licenseNumber
            licenseStartDate
            licenseType
          }
          dates {
            createdDate
          }
          role

          asset {
            id
            url
          }
        }

        license {
          licenseEndDate
          licenseNumber
          licenseStartDate
          licenseType
        }

        dates {
          createdDate
        }
      }
    }
  }
`;

export const ME_USER_SEND_INVITE = gql`
  query me {
    me {
      id
      userToFacilities {
        id
        name
        owner {
          id
        }
      }
    }
  }
`;

export const ME_USER_TO_FACILITIES = gql`
  query me {
    me {
      id
      userToFacilities {
        id
        name
        asset {
          id
          url
        }
        owner {
          id
        }
        isOwner
      }
    }
  }
`;

export const ME_TWILIO_CHAT = gql`
  query me {
    me {
      id
      userToFacilities {
        id
        name
        asset {
          id
          url
        }
        facilityBuyerRelations {
          id
          chatSid
        }
        owner {
          id
        }
      }
    }
  }
`;

export const ME_USER_CONTEXT_PROFILE = gql`
  query me {
    me {
      id

      context {
        id
        email
        phoneNumber
        address {
          address
          fullAddress
          googlePlaceId
        }
        socials {
          facebook
          instagram
          site
          twitterX
          youtube
        }
        campaignEmail

        credentialedDate

        displayName
        role
        description

        license {
          licenseEndDate
          licenseNumber
          isLicenseActive
        }

        userContact {
          id
          phoneNumber
          email
        }

        asset {
          id
          url
        }

        owner {
          id
          fullName
        }
        users {
          id
          fullName
          phoneNumber
          email

          license {
            licenseEndDate
            licenseNumber
            licenseStartDate
            licenseType
          }
          dates {
            createdDate
          }
          role

          asset {
            id
            url
          }
        }
      }
    }
  }
`;

export const ME_CHANGE_CONTEXT = gql`
  query me {
    me {
      id
      context {
        id
        owner {
          id
        }
      }
    }
  }
`;

export const ME_CHAT_IS_MESSAGE = gql`
  query me {
    me {
      id
      context {
        isChatMessage
      }
    }
  }
`;

export const ME_CHECKOUT = gql`
  query me {
    me {
      id
      context {
        id
        facilityCultivatorRelations {
          id
          isNetActivated
        }
      }
    }
  }
`;

export default ME;
