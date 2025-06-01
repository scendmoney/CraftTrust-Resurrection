import { gql } from '@apollo/client';

export const CARTS = gql`
  query carts {
    carts {
      id
      cartItems {
        cart {
          id
          cartItems {
            id
            product {
              id
            }
          }
        }
        id
        price
        total
        product {
          id
          quantityStock
          status
          thumbnail {
            id
            url
          }
          quantityStockMin
          facility {
            id
          }
          geneticCross
          item {
            id
            name
            productCategoryName
          }
          packagedDate
        }
        quantity
      }
      facilityBuyer {
        id
      }
      facilityCultivator {
        id
        displayName
        asset {
          id
          url
        }
      }

      total
      costProducts
    }
  }
`;

export const CARTS_HEADER = gql`
  query carts {
    carts {
      id
      cartItems {
        id
      }
    }
  }
`;

export const CARTS_PRODUCT_ID = gql`
  query carts {
    carts {
      id
      cartItems {
        id
        product {
          id
        }
      }
    }
  }
`;
