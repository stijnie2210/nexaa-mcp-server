import { gql } from 'graphql-request';

const VOLUME_FRAGMENT = gql`
  fragment VolumeResult on Volume {
    name
    size
    usage
    state
    containers {
      name
    }
    containerJobs {
      name
    }
    locked
  }
`;

export const VOLUME_LIST = gql`
  ${VOLUME_FRAGMENT}
  query volumeList($namespaceName: String!) {
    namespace(name: $namespaceName) {
      volumes {
        ...VolumeResult
      }
    }
  }
`;

export const VOLUME_CREATE = gql`
  ${VOLUME_FRAGMENT}
  mutation volumeCreate($input: VolumeCreateInput!) {
    volumeCreate(volumeInput: $input) {
      ...VolumeResult
    }
  }
`;

export const VOLUME_INCREASE = gql`
  ${VOLUME_FRAGMENT}
  mutation volumeIncrease($input: VolumeModifyInput!) {
    volumeIncrease(volumeInput: $input) {
      ...VolumeResult
    }
  }
`;

export const VOLUME_DELETE = gql`
  mutation volumeDelete($namespaceName: String!, $volumeName: String!) {
    volumeDelete(volume: { name: $volumeName, namespace: $namespaceName })
  }
`;
