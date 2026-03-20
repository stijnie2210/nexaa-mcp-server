import { gql } from "graphql-request";

const USER_FRAGMENT = gql`
  fragment CloudDatabaseClusterUserResult on DatabaseUser {
    name
    status
    permissions {
      databaseName
      permission
    }
    dsn
    password
    role
  }
`;

export const DB_USER_LIST = gql`
  ${USER_FRAGMENT}
  query getCloudDatabaseClusterUsers(
    $cloudDatabaseCluster: CloudDatabaseClusterResourceInput!
  ) {
    cloudDatabaseCluster(cloudDatabase: $cloudDatabaseCluster) {
      users {
        ...CloudDatabaseClusterUserResult
      }
    }
  }
`;

export const DB_USER_CREATE = gql`
  ${USER_FRAGMENT}
  mutation createCloudDatabaseClusterUser(
    $userInput: CloudDatabaseClusterUserCreateInput!
  ) {
    cloudDatabaseClusterUserCreate(userInput: $userInput) {
      ...CloudDatabaseClusterUserResult
    }
  }
`;

export const DB_USER_MODIFY = gql`
  ${USER_FRAGMENT}
  mutation modifyCloudDatabaseClusterUser(
    $userInput: CloudDatabaseClusterUserModifyInput!
  ) {
    cloudDatabaseClusterUserModify(userInput: $userInput) {
      ...CloudDatabaseClusterUserResult
    }
  }
`;

export const DB_USER_DELETE = gql`
  mutation deleteCloudDatabaseClusterUser(
    $userInput: CloudDatabaseClusterUserResourceInput!
  ) {
    cloudDatabaseClusterUserDelete(userInput: $userInput)
  }
`;
