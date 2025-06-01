import { gql } from '@apollo/client';

const CLIENT_NFTS = gql`
  query clientNfts($payload: FilterGetDTO!) {
    clientNfts(payload: $payload) {
      items {
        blockchainTransaction {
          id
        }
        dates {
          createdDate
        }
        description
        id
        ipfs
        logoURL
        name
        serial
        status
        survey {
          uuid
          status
          user {
            id
            fullName
          }
          subcompany {
            id
            company {
              facilityCultivator {
                id
                asset {
                  url
                }
                displayName
              }
              productSurvey {
                item {
                  id
                  name
                }
                thumbnail {
                  url
                }
              }
            }
          }
          id
          # product {
          #   id
          #   item {
          #     id
          #     name
          #   }
          #   thumbnail {
          #     url
          #     id
          #   }
          # }
        }

        tokenId
        type
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default CLIENT_NFTS;
