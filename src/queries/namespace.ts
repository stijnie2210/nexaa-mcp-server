import { gql } from "graphql-request";

const NAMESPACE_FRAGMENT = gql`
  fragment NamespaceResult on Namespace {
    name
    description
    state
    containerJobs {
      name
    }
    containers {
      name
    }
    volumes {
      name
    }
    cloudDatabaseClusters {
      name
    }
    messageQueues {
      name
    }
  }
`;

export const NAMESPACE_LIST = gql`
  ${NAMESPACE_FRAGMENT}
  query namespaceList {
    namespaces {
      ...NamespaceResult
    }
  }
`;

export const NAMESPACE_GET = gql`
  ${NAMESPACE_FRAGMENT}
  query namespaceGet($name: String!) {
    namespace(name: $name) {
      ...NamespaceResult
    }
  }
`;

export const NAMESPACE_CREATE = gql`
  ${NAMESPACE_FRAGMENT}
  mutation namespaceCreate($input: NamespaceCreateInput!) {
    namespaceCreate(namespaceInput: $input) {
      ...NamespaceResult
    }
  }
`;

export const NAMESPACE_DELETE = gql`
  mutation namespaceDelete($name: String!) {
    namespaceDelete(namespace: { name: $name })
  }
`;
