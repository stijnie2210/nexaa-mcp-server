import { gql } from "graphql-request";

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

  fragment MessageQueuePlanResult on MessageQueuePlan {
    cpu(unit: CPU)
    group
    id
    memory(unit: GB)
    name
    price {
      amount
      currency
    }
    replicas
    storage(unit: GB)
  }

  fragment MessageQueueVersionResult on MessageQueueSpec {
    patchLevelVersion
    type
    version
  }

  fragment MessageQueueIngressResult on MessageQueueIngress {
    allowList
  }

  fragment MessageQueueResult on MessageQueue {
    id
    locked
    name
    state
    namespace {
      name
    }
    adminUser {
      name
      role
      status
    }
    plan {
      ...MessageQueuePlanResult
    }
    spec {
      ...MessageQueueVersionResult
    }
    ingress {
      ...MessageQueueIngressResult
    }
    externalConnection {
      ...ExternalConnectionResult
    }
  }
`;

export const MQ_LIST = gql`
  ${FRAGMENTS}
  query messageQueuesGet {
    messageQueues {
      ...MessageQueueResult
    }
  }
`;

export const MQ_GET = gql`
  ${FRAGMENTS}
  query messageQueueGet($messageQueueInput: MessageQueueResourceInput!) {
    messageQueue(messageQueue: $messageQueueInput) {
      ...MessageQueueResult
    }
  }
`;

export const MQ_CREATE = gql`
  ${FRAGMENTS}
  mutation messageQueueCreate($messageQueueInput: MessageQueueCreateInput!) {
    messageQueueCreate(messageQueue: $messageQueueInput) {
      ...MessageQueueResult
    }
  }
`;

export const MQ_MODIFY = gql`
  ${FRAGMENTS}
  mutation messageQueueModify($messageQueueInput: MessageQueueModifyInput!) {
    messageQueueModify(messageQueue: $messageQueueInput) {
      ...MessageQueueResult
    }
  }
`;

export const MQ_DELETE = gql`
  mutation messageQueueDelete($messageQueueInput: MessageQueueResourceInput!) {
    messageQueueDelete(messageQueue: $messageQueueInput)
  }
`;

export const MQ_LIST_PLANS = gql`
  query messageQueuePlansGet {
    messageQueuePlans {
      cpu(unit: CPU)
      group
      id
      memory(unit: GB)
      name
      price {
        amount
        currency
      }
      replicas
      storage(unit: GB)
    }
  }
`;

export const MQ_LIST_VERSIONS = gql`
  query messageQueueVersionsGet {
    messageQueueVersions {
      patchLevelVersion
      type
      version
    }
  }
`;

export const MQ_USER_CREDENTIALS = gql`
  query messageQueueUserCredentialsGet(
    $messageQueueInput: MessageQueueResourceInput!
    $username: String!
  ) {
    messageQueueUserCredentials(
      messageQueue: $messageQueueInput
      username: $username
    ) {
      name
      dsn
      password
      role
      status
    }
  }
`;
