import { gql } from "graphql-request";

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

  fragment ContainerJobResult on ContainerJob {
    name
    image
    namespace {
      name
    }
    privateRegistry {
      name
    }
    resources
    environmentVariables {
      ...EnvironmentVariableResult
    }
    command
    entrypoint
    mounts {
      ...ContainerMounts
    }
    schedule
    enabled
    state
    locked
  }
`;

export const CONTAINER_JOB_LIST = gql`
  ${FRAGMENTS}
  query containerJobList($namespaceName: String!) {
    namespace(name: $namespaceName) {
      containerJobs {
        ...ContainerJobResult
      }
    }
  }
`;

export const CONTAINER_JOB_GET = gql`
  ${FRAGMENTS}
  query containerJobByName($namespaceName: String!, $containerName: String!) {
    containerJob(name: $containerName, namespace: $namespaceName) {
      ...ContainerJobResult
    }
  }
`;

export const CONTAINER_JOB_CREATE = gql`
  ${FRAGMENTS}
  mutation containerJobCreate($scheduledJob: ContainerJobCreateInput!) {
    containerJobCreate(scheduledJob: $scheduledJob) {
      ...ContainerJobResult
    }
  }
`;

export const CONTAINER_JOB_MODIFY = gql`
  ${FRAGMENTS}
  mutation containerJobModify($scheduledJob: ContainerJobModifyInput!) {
    containerJobModify(scheduledJob: $scheduledJob) {
      ...ContainerJobResult
    }
  }
`;

export const CONTAINER_JOB_DELETE = gql`
  mutation containerJobDelete($namespaceName: String!, $containerJobName: String!) {
    containerJobDelete(
      scheduledJob: { name: $containerJobName, namespace: $namespaceName }
    )
  }
`;
