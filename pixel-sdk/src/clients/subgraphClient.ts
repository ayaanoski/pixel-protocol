import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import type { Credential, PixelProtocolConfig } from '../types';

const GET_USER_CREDENTIALS = gql`
  query GetUserCredentials($userAddress: String!) {
    credentials(where: { userAddress: $userAddress }) {
      id
      userAddress
      issuerID
      credentialType
      data
      timestamp
    }
  }
`;

const GET_ISSUER_CREDENTIALS = gql`
  query GetIssuerCredentials($issuerID: String!) {
    credentials(where: { issuerID: $issuerID }) {
      id
      userAddress
      issuerID
      credentialType
      data
      timestamp
    }
  }
`;

export class SubgraphClient {
  private client: ApolloClient<any>;

  constructor(config: PixelProtocolConfig) {
    this.client = new ApolloClient({
      uri: config.subgraphUrl,
      cache: new InMemoryCache()
    });
  }

  async getUserCredentials(userAddress: string): Promise<Credential[]> {
    const { data } = await this.client.query({
      query: GET_USER_CREDENTIALS,
      variables: { userAddress: userAddress.toLowerCase() }
    });
    return data.credentials.map((cred: any) => ({
      ...cred,
      data: JSON.parse(cred.data)
    }));
  }

  async getIssuerCredentials(issuerID: string): Promise<Credential[]> {
    const { data } = await this.client.query({
      query: GET_ISSUER_CREDENTIALS,
      variables: { issuerID }
    });
    return data.credentials.map((cred: any) => ({
      ...cred,
      data: JSON.parse(cred.data)
    }));
  }

  async searchCredentials(query: {
    userAddress?: string;
    issuerID?: string;
    credentialType?: string;
    fromTimestamp?: number;
    toTimestamp?: number;
  }): Promise<Credential[]> {
    const whereClause = Object.entries(query)
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => {
        if (key === 'fromTimestamp') {
          return { ...acc, timestamp_gte: value };
        }
        if (key === 'toTimestamp') {
          return { ...acc, timestamp_lte: value };
        }
        return { ...acc, [key]: value };
      }, {});

    const { data } = await this.client.query({
      query: gql`
        query SearchCredentials($where: Credential_filter!) {
          credentials(where: $where) {
            id
            userAddress
            issuerID
            credentialType
            data
            timestamp
          }
        }
      `,
      variables: { where: whereClause }
    });

    return data.credentials.map((cred: any) => ({
      ...cred,
      data: JSON.parse(cred.data)
    }));
  }
}
