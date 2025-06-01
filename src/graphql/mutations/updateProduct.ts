import { gql } from '@apollo/client';

const UPDATE_PRODUCT = gql`
  mutation updateProduct($images: [Upload!], $payload: UpdateProductDTO!, $thumbnail: Upload) {
    updateProduct(images: $images, payload: $payload, thumbnail: $thumbnail) {
      id
      status
      description
      geneticCross
      price
      quantityStockMin
      terpenes
    }
  }
`;
export default UPDATE_PRODUCT;
