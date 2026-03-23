import { gql } from 'graphql-request';

const FRAGMENTS = gql`
  fragment ExternalConnectionResult on ExternalConnection {
    ipv4
    ipv6
    ports {
      allowList
      externalPort
      internalPort
      protocol
    }
  }

  fragment CloudDatabaseClusterDatabaseResult on Database {
    name
    description
    status
  }

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

  fragment CloudDatabaseClusterResult on CloudDatabaseCluster {
    id
    databases {
      ...CloudDatabaseClusterDatabaseResult
    }
    name
    hostname
    namespace {
      name
    }
    plan {
      cpu
      group
      id
      memory(unit: GB)
      name
      price {
        amount
        currency
      }
      storage
    }
    spec {
      type
      version
    }
    users {
      ...CloudDatabaseClusterUserResult
    }
    adminUser {
      ...CloudDatabaseClusterUserResult
    }
    externalConnection {
      ...ExternalConnectionResult
    }
    state
    locked
  }
`;

export const DB_CLUSTER_LIST = gql`
  ${FRAGMENTS}
  query getCloudDatabaseClusters {
    cloudDatabaseClusters {
      ...CloudDatabaseClusterResult
    }
  }
`;

export const DB_CLUSTER_GET = gql`
  ${FRAGMENTS}
  query getCloudDatabaseCluster($cloudDatabaseClusterInput: CloudDatabaseClusterResourceInput!) {
    cloudDatabaseCluster(cloudDatabase: $cloudDatabaseClusterInput) {
      ...CloudDatabaseClusterResult
    }
  }
`;

export const DB_CLUSTER_CREATE = gql`
  ${FRAGMENTS}
  mutation cloudDatabaseClusterCreate(
    $cloudDatabaseClusterInput: CloudDatabaseClusterCreateInput!
  ) {
    cloudDatabaseClusterCreate(cloudDatabaseClusterInput: $cloudDatabaseClusterInput) {
      ...CloudDatabaseClusterResult
    }
  }
`;

export const DB_CLUSTER_MODIFY = gql`
  ${FRAGMENTS}
  mutation cloudDatabaseClusterModify(
    $cloudDatabaseClusterModifyInput: CloudDatabaseClusterModifyInput!
  ) {
    cloudDatabaseClusterModify(cloudDatabaseClusterInput: $cloudDatabaseClusterModifyInput) {
      ...CloudDatabaseClusterResult
    }
  }
`;

export const DB_CLUSTER_DELETE = gql`
  mutation cloudDatabaseClusterDelete(
    $cloudDatabaseClusterResourceInput: CloudDatabaseClusterResourceInput!
  ) {
    cloudDatabaseClusterDelete(cloudDatabase: $cloudDatabaseClusterResourceInput)
  }
`;

export const DB_CLUSTER_LIST_PLANS = gql`
  query clusterPlans {
    cloudDatabaseClusterPlans {
      cpu
      group
      id
      memory(unit: GB)
      name
      price {
        amount
        currency
      }
      storage
    }
  }
`;

export const DB_CLUSTER_LIST_VERSIONS = gql`
  query clusterVersions {
    cloudDatabaseClusterVersions {
      type
      version
    }
  }
`;

export const DB_USER_CREDENTIALS = gql`
  query getCloudDatabaseClusterUserCredentials(
    $cloudDatabase: CloudDatabaseClusterResourceInput!
    $userName: String!
  ) {
    cloudDatabaseClusterUserCredentials(cloudDatabase: $cloudDatabase, username: $userName) {
      dsn
    }
  }
`;
