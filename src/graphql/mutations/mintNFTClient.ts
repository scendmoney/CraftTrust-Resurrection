import { gql } from '@apollo/client';

const MINT_NFT_CLIENT = gql`
  mutation mintNFTClient($surveyId: String!) {
    mintNFTClient(surveyId: $surveyId)
  }
`;
export default MINT_NFT_CLIENT;
