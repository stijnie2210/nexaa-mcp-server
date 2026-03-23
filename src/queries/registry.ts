import { gql } from 'graphql-request';

const REGISTRY_FRAGMENT = gql`
  fragment RegistryResult on PrivateRegistry {
    name
    source
    username
    state
    locked
  }
`;

export const REGISTRY_LIST = gql`
  ${REGISTRY_FRAGMENT}
  query registryList($namespaceName: String!) {
    namespace(name: $namespaceName) {
      privateRegistries {
        ...RegistryResult
      }
    }
  }
`;

export const REGISTRY_CREATE = gql`
  ${REGISTRY_FRAGMENT}
  mutation registryCreate($input: RegistryCreateInput!) {
    registryConnectionCreate(registryInput: $input) {
      ...RegistryResult
    }
  }
`;

export const REGISTRY_DELETE = gql`
  mutation registryDelete($namespaceName: String!, $registryName: String!) {
    registryConnectionDelete(registryConnection: { name: $registryName, namespace: $namespaceName })
  }
`;
