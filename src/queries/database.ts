import { gql } from 'graphql-request';

const DB_FRAGMENT = gql`
  fragment CloudDatabaseClusterDatabaseResult on Database {
    name
    description
    status
  }
`;

export const DB_CREATE = gql`
  ${DB_FRAGMENT}
  mutation createCloudDatabaseClusterDatabase(
    $cloudDatabaseClusterDatabaseInput: CloudDatabaseClusterDatabaseCreateInput!
  ) {
    cloudDatabaseClusterDatabaseCreate(databaseInput: $cloudDatabaseClusterDatabaseInput) {
      ...CloudDatabaseClusterDatabaseResult
    }
  }
`;

export const DB_DELETE = gql`
  mutation deleteCloudDatabaseClusterDatabase(
    $cloudDatabaseClusterDatabaseInput: CloudDatabaseClusterDatabaseResourceInput!
  ) {
    cloudDatabaseClusterDatabaseDelete(databaseInput: $cloudDatabaseClusterDatabaseInput)
  }
`;
