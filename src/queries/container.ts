import { gql } from 'graphql-request';

const FRAGMENTS = gql`
  fragment EnvironmentVariableResult on EnvironmentVariable {
    name
    value
    secret
  }

  fragment ContainerMounts on Mount {
    path
    volume {
      name
      size
    }
  }

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

  fragment ContainerResult on Container {
    name
    image
    privateRegistry {
      name
    }
    resources
    command
    entrypoint
    environmentVariables {
      ...EnvironmentVariableResult
    }
    externalConnection {
      ...ExternalConnectionResult
    }
    ports
    ingresses {
      domainName
      port
      enableTLS
      allowlist
      state
    }
    mounts {
      ...ContainerMounts
    }
    healthCheck {
      port
      path
    }
    availableReplicas
    numberOfReplicas
    autoScaling {
      replicas {
        minimum
        maximum
      }
      triggers {
        type
        threshold
      }
    }
    state
    locked
    type
  }
`;

export const CONTAINER_LIST = gql`
  ${FRAGMENTS}
  query containerList($namespaceName: String!) {
    namespace(name: $namespaceName) {
      containers {
        ...ContainerResult
      }
    }
  }
`;

export const CONTAINER_GET = gql`
  ${FRAGMENTS}
  query containerByName($namespaceName: String!, $containerName: String!) {
    container(containerResourceInput: { name: $containerName, namespace: $namespaceName }) {
      ...ContainerResult
    }
  }
`;

export const CONTAINER_CREATE = gql`
  ${FRAGMENTS}
  mutation containerCreate($input: ContainerCreateInput!) {
    containerCreate(containerInput: $input) {
      ...ContainerResult
    }
  }
`;

export const CONTAINER_MODIFY = gql`
  ${FRAGMENTS}
  mutation containerModify($input: ContainerModifyInput!) {
    containerModify(containerInput: $input) {
      ...ContainerResult
    }
  }
`;

export const CONTAINER_DELETE = gql`
  mutation containerDelete($namespace: String!, $container: String!) {
    containerDelete(container: { name: $container, namespace: $namespace })
  }
`;

export const CONTAINER_LIST_PLANS = gql`
  query containerListPlans {
    resourceSpecifications(kind: "container") {
      id
      cpu
      ram
      price {
        amount
        currency
      }
    }
  }
`;
