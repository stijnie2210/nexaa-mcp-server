import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The `DateTime` scalar type represents time data, represented as an ISO-8601 encoded UTC date string. */
  DateTime: { input: any; output: any };
  /** The unique identifier of a cluster namespace, represented as an integer. */
  NamespaceId: { input: any; output: any };
};

export type Account = {
  customer: Customer;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type Address = {
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  streetNameAndHouseNumber: Scalars['String']['output'];
};

export type AllowListInput = {
  /** IP address or a CIDR including the subnet */
  ip: Scalars['String']['input'];
  state?: State;
};

export type AuditLog = {
  account?: Maybe<Account>;
  changeSet: Array<AuditLogChange>;
  eventType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  modelId: Scalars['Int']['output'];
  modelName: Scalars['String']['output'];
  occurredAt: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
};

export type AuditLogChange = {
  name: Scalars['String']['output'];
  newValue?: Maybe<Scalars['String']['output']>;
  oldValue?: Maybe<Scalars['String']['output']>;
};

export type AuditLogFilterInput = {
  eventTypes: Array<Scalars['String']['input']>;
  modelNames: Array<Scalars['String']['input']>;
};

export type AutoScaling = {
  replicas: AutoScalingReplicas;
  triggers: Array<AutoScalingTrigger>;
};

export type AutoScalingInput = {
  replicas: ReplicasInput;
  triggers: Array<AutoScalingTriggerInput>;
};

export type AutoScalingReplicas = {
  maximum: Scalars['Int']['output'];
  minimum: Scalars['Int']['output'];
};

export type AutoScalingTrigger = {
  threshold: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type AutoScalingTriggerInput = {
  threshold: Scalars['Int']['input'];
  type: AutoScalingType;
};

export type AutoScalingType = 'CPU' | 'MEMORY';

export type CloudDatabase = {
  connectionString: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  hostname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Location;
  name: Scalars['String']['output'];
  nodeType: NodeType;
  state: Scalars['String']['output'];
  username: Scalars['String']['output'];
  version: DatabaseVersion;
  whitelist: Array<Scalars['String']['output']>;
};

/**
 * Enable this feature to get recommendations on how to improve your database usage.
 *
 * The tool will be providing you settings on a cluster level to tune your database, provide recommendations for
 * missing indexes and more.
 *
 * Database clusters will be analyzed once a day.
 */
export type CloudDatabaseAdvisorInput = {
  /** Set this field to `true` to enable recommendations on how to improve your database usage. */
  enabled?: Scalars['Boolean']['input'];
};

export type CloudDatabaseAdvisory = CloudDatabaseAdvisoryInterface & {
  createdAt: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type CloudDatabaseAdvisoryInterface = {
  createdAt: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type CloudDatabaseAdvisoryMissingIndex = CloudDatabaseAdvisoryInterface & {
  createdAt: Scalars['String']['output'];
  databaseName: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type CloudDatabaseAdvisoryType = 'MissingIndex' | 'SettingSuggestion';

export type CloudDatabaseCluster = {
  adminUser?: Maybe<DatabaseUser>;
  /** Cost: complexity = 10, multipliers = [type], defaultMultiplier = null */
  advisories: Array<CloudDatabaseAdvisoryInterface>;
  databases: Array<Database>;
  externalConnection?: Maybe<ExternalConnection>;
  /**
   * Returns the features available on a cluster.
   * Features are extra functionality or capabilities for database clusters.
   * They are opt-in and provide extra services for your database.
   *
   * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
   */
  features: Array<CloudDatabaseClusterFeature>;
  hostname: Scalars['String']['output'];
  id: Scalars['String']['output'];
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  namespace: Namespace;
  plan: Plan;
  port: Scalars['Int']['output'];
  spec: Spec;
  state: Scalars['String']['output'];
  users: Array<DatabaseUser>;
};

export type CloudDatabaseClusterAdvisoriesArgs = {
  type?: InputMaybe<CloudDatabaseAdvisoryType>;
};

export type CloudDatabaseClusterAdvisor = CloudDatabaseClusterFeature & {
  enabled: Scalars['Boolean']['output'];
  status: Scalars['String']['output'];
};

/**
 * Input for create cloud database cluster.
 *
 * A database cluster is accessible from within the namespace your created it in.
 * There is no limit on the number of users, or database.
 */
export type CloudDatabaseClusterCreateInput = {
  advisor?: InputMaybe<CloudDatabaseAdvisorInput>;
  databases?: InputMaybe<Array<DatabaseInput>>;
  externalConnection?: InputMaybe<ExternalConnectionInput>;
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  plan: Scalars['String']['input'];
  spec: CloudDatabaseClusterSpecInput;
  users?: InputMaybe<Array<DatabaseUserInput>>;
};

export type CloudDatabaseClusterDatabaseCreateInput = {
  cluster: CloudDatabaseClusterResourceInput;
  database: DatabaseInput;
};

export type CloudDatabaseClusterDatabaseResourceInput = {
  cluster: CloudDatabaseClusterResourceInput;
  name: Scalars['String']['input'];
};

export type CloudDatabaseClusterFeature = {
  enabled: Scalars['Boolean']['output'];
  status: Scalars['String']['output'];
};

export type CloudDatabaseClusterFeatureImpl = CloudDatabaseClusterFeature & {
  enabled: Scalars['Boolean']['output'];
  status: Scalars['String']['output'];
};

/**
 * Input for create cloud database cluster.
 *
 * A database cluster is accessible from within the namespace your created it in.
 * There is no limit on the number of users, or database.
 */
export type CloudDatabaseClusterModifyInput = {
  advisor?: InputMaybe<CloudDatabaseAdvisorInput>;
  databases?: InputMaybe<Array<DatabaseInput>>;
  externalConnection?: InputMaybe<ExternalConnectionInput>;
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  users?: InputMaybe<Array<DatabaseUserInput>>;
};

export type CloudDatabaseClusterResourceInput = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

export type CloudDatabaseClusterSpecInput = {
  type: Scalars['String']['input'];
  version: Scalars['String']['input'];
};

export type CloudDatabaseClusterUserCreateInput = {
  cluster: CloudDatabaseClusterResourceInput;
  user: DatabaseUserInput;
};

export type CloudDatabaseClusterUserModifyInput = {
  cluster?: InputMaybe<CloudDatabaseClusterResourceInput>;
  user?: InputMaybe<DatabaseUserInput>;
};

export type CloudDatabaseClusterUserResourceInput = {
  cluster: CloudDatabaseClusterResourceInput;
  name: Scalars['String']['input'];
};

export type Container = {
  autoScaling?: Maybe<AutoScaling>;
  availableReplicas: Scalars['Int']['output'];
  command?: Maybe<Array<Scalars['String']['output']>>;
  /** @deprecated use `type` instead */
  containerType: ContainerType;
  createdAt: Scalars['DateTime']['output'];
  /** @deprecated this field will be removed in the future, and doesn't have a replacement */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  entrypoint?: Maybe<Array<Scalars['String']['output']>>;
  environmentVariables: Array<EnvironmentVariable>;
  externalConnection?: Maybe<ExternalConnection>;
  healthCheck?: Maybe<HealthCheck>;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  ingresses: Array<Ingress>;
  locked: Scalars['Boolean']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  mounts: Array<Mount>;
  name: Scalars['String']['output'];
  numberOfReplicas: Scalars['Int']['output'];
  ports: Array<Scalars['String']['output']>;
  privateRegistry?: Maybe<PrivateRegistry>;
  replicas: Array<Replica>;
  /** @deprecated use `resources` instead */
  resourceSpecification: ResourceSpecification;
  resources: ContainerResources;
  startedAt: Scalars['DateTime']['output'];
  state: Scalars['String']['output'];
  type: ContainerType;
};

export type ContainerCreateInput = {
  /**
   * Command to run.
   * This is the command executed at the given schedule.
   * When the field is omitted, the default command of the image will be used.
   *
   * Null will reset the command to the default.
   * The command will be passed to the entrypoint as arguments. Use quotes to pass an argument with spaces.
   *
   * Environment variables can be used in the command by using the syntax `$(ENVIRONMENT_VARIABLE)`.
   *
   * Example: `echo "Hello $(NAME)"`.
   *
   * This field is defined in docker exec format. https://docs.docker.com/reference/dockerfile/#shell-and-exec-form
   */
  command?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Entrypoint of the container.
   * This field will overwrite the default entrypoint of the image. When the field is omitted, the default entrypoint of the image will be used.
   *
   * Null will reset the command to the default.
   *
   * Entry point is the first command executed when the container starts. It will receive the command as arguments.
   * For example when the entrypoint is `python`, the command `app.py` will be executed as `python app.py`.
   *
   * This field is defined in docker exec format. https://docs.docker.com/reference/dockerfile/#shell-and-exec-form
   */
  entrypoint?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Environment variables to be set in the job. */
  environmentVariables?: InputMaybe<Array<EnvironmentVariableInput>>;
  externalConnection?: InputMaybe<ExternalConnectionInput>;
  /**
   * Health check performed to check the status of the container.
   * Health checks are directly performed on the container so your application must expose
   * the port. Port mappings specified in the ports field are not used by the health check.
   *
   * When you want to disable the health check you must send us a null value. To leave the
   * current health check unchanged you can omit this field.
   */
  healthCheck?: InputMaybe<HealthCheckInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingresses?: Array<IngressInput>;
  mounts?: InputMaybe<Array<MountInput>>;
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  ports?: InputMaybe<Array<Scalars['String']['input']>>;
  registry?: InputMaybe<Scalars['String']['input']>;
  resources?: InputMaybe<ContainerResources>;
  scaling?: InputMaybe<ScalingInput>;
  type?: ContainerType;
};

export type ContainerDeleteInput = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

export type ContainerEndpoint = {
  allowList: Array<Scalars['String']['output']>;
  containerPort: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  ipv4Address: Scalars['String']['output'];
  ipv6Address: Scalars['String']['output'];
  port: Scalars['Int']['output'];
};

export type ContainerJob = {
  command?: Maybe<Array<Scalars['String']['output']>>;
  enabled: Scalars['Boolean']['output'];
  entrypoint?: Maybe<Array<Scalars['String']['output']>>;
  environmentVariables: Array<EnvironmentVariable>;
  image: Scalars['String']['output'];
  locked: Scalars['Boolean']['output'];
  mounts: Array<Mount>;
  name: Scalars['String']['output'];
  namespace: Namespace;
  privateRegistry?: Maybe<PrivateRegistry>;
  resources: ContainerResources;
  runs: Array<ContainerJobRun>;
  schedule: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type ContainerJobCreateInput = {
  /**
   * Command to run.
   * This is the command executed at the given schedule.
   * When the field is omitted, the default command of the image will be used.
   *
   * Null will reset the command to the default.
   * The command will be passed to the entrypoint as arguments. Use quotes to pass an argument with spaces.
   *
   * Environment variables can be used in the command by using the syntax `$(ENVIRONMENT_VARIABLE)`.
   *
   * Example: `echo "Hello $(NAME)"`.
   *
   * This field is defined in docker exec format. https://docs.docker.com/reference/dockerfile/#shell-and-exec-form
   */
  command?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Enable or disable the job.
   * By disabling a job, it will not be executed, we do keep the configuration.
   */
  enabled?: Scalars['Boolean']['input'];
  /**
   * Entrypoint of the container.
   * This field will overwrite the default entrypoint of the image. When the field is omitted, the default entrypoint of the image will be used.
   *
   * Null will reset the command to the default.
   *
   * Entry point is the first command executed when the container starts. It will receive the command as arguments.
   * For example when the entrypoint is `python`, the command `app.py` will be executed as `python app.py`.
   *
   * This field is defined in docker exec format. https://docs.docker.com/reference/dockerfile/#shell-and-exec-form
   */
  entrypoint?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Environment variables to be set in the job. */
  environmentVariables?: InputMaybe<Array<EnvironmentVariableInput>>;
  image: Scalars['String']['input'];
  mounts?: InputMaybe<Array<MountInput>>;
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  registry?: InputMaybe<Scalars['String']['input']>;
  resources: ContainerResources;
  /**
   * Cron notation to schedule jobs.
   * Format is equal to regular cron notation.
   * For example, to run a job every day at 4am, use `0 4 * * *`.
   * You can use https://crontab.guru/ to help you build your cron expressions.
   */
  schedule: Scalars['String']['input'];
};

export type ContainerJobModifyInput = {
  /**
   * Command to run.
   * This is the command executed at the given schedule.
   * When the field is omitted, the default command of the image will be used.
   *
   * Null will reset the command to the default.
   * The command will be passed to the entrypoint as arguments. Use quotes to pass an argument with spaces.
   *
   * Environment variables can be used in the command by using the syntax `$(ENVIRONMENT_VARIABLE)`.
   *
   * Example: `echo "Hello $(NAME)"`.
   *
   * This field is defined in docker exec format. https://docs.docker.com/reference/dockerfile/#shell-and-exec-form
   */
  command?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Enable or disable the job.
   * By disabling a job, it will not be executed, we do keep the configuration.
   */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Entrypoint of the container.
   * This field will overwrite the default entrypoint of the image. When the field is omitted, the default entrypoint of the image will be used.
   *
   * Null will reset the command to the default.
   *
   * Entry point is the first command executed when the container starts. It will receive the command as arguments.
   * For example when the entrypoint is `python`, the command `app.py` will be executed as `python app.py`.
   *
   * This field is defined in docker exec format. https://docs.docker.com/reference/dockerfile/#shell-and-exec-form
   */
  entrypoint?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Environment variables to be set in the job. */
  environmentVariables?: InputMaybe<Array<EnvironmentVariableInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  mounts?: InputMaybe<Array<MountInput>>;
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  registry?: InputMaybe<Scalars['String']['input']>;
  resources?: InputMaybe<ContainerResources>;
  /**
   * Cron notation to schedule jobs.
   * Format is equal to regular cron notation.
   * For example, to run a job every day at 4am, use `0 4 * * *`.
   * You can use https://crontab.guru/ to help you build your cron expressions.
   */
  schedule?: InputMaybe<Scalars['String']['input']>;
};

export type ContainerJobRun = {
  duration?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  startTime?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
};

export type ContainerModifyInput = {
  /**
   * Command to run.
   * This is the command executed at the given schedule.
   * When the field is omitted, the default command of the image will be used.
   *
   * Null will reset the command to the default.
   * The command will be passed to the entrypoint as arguments. Use quotes to pass an argument with spaces.
   *
   * Environment variables can be used in the command by using the syntax `$(ENVIRONMENT_VARIABLE)`.
   *
   * Example: `echo "Hello $(NAME)"`.
   *
   * This field is defined in docker exec format. https://docs.docker.com/reference/dockerfile/#shell-and-exec-form
   */
  command?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Entrypoint of the container.
   * This field will overwrite the default entrypoint of the image. When the field is omitted, the default entrypoint of the image will be used.
   *
   * Null will reset the command to the default.
   *
   * Entry point is the first command executed when the container starts. It will receive the command as arguments.
   * For example when the entrypoint is `python`, the command `app.py` will be executed as `python app.py`.
   *
   * This field is defined in docker exec format. https://docs.docker.com/reference/dockerfile/#shell-and-exec-form
   */
  entrypoint?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Environment variables to be set in the job. */
  environmentVariables?: InputMaybe<Array<EnvironmentVariableInput>>;
  externalConnection?: InputMaybe<ExternalConnectionInput>;
  /**
   * Health check performed to check the status of the container.
   * Health checks are directly performed on the container so your application must expose
   * the port. Port mappings specified in the ports field are not used by the health check.
   *
   * When you want to disable the health check you must send us a null value. To leave the
   * current health check unchanged you can omit this field.
   */
  healthCheck?: InputMaybe<HealthCheckInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingresses?: InputMaybe<Array<IngressInput>>;
  mounts?: InputMaybe<Array<MountInput>>;
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  ports?: InputMaybe<Array<Scalars['String']['input']>>;
  registry?: InputMaybe<Scalars['String']['input']>;
  resources?: InputMaybe<ContainerResources>;
  scaling?: InputMaybe<ScalingInput>;
};

export type ContainerResourceInput = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

export type ContainerResources =
  | 'CPU_250_RAM_500'
  | 'CPU_250_RAM_1000'
  | 'CPU_250_RAM_2000'
  | 'CPU_250_RAM_3000'
  | 'CPU_250_RAM_4000'
  | 'CPU_250_RAM_5000'
  | 'CPU_250_RAM_6000'
  | 'CPU_250_RAM_7000'
  | 'CPU_250_RAM_8000'
  | 'CPU_250_RAM_9000'
  | 'CPU_250_RAM_10000'
  | 'CPU_250_RAM_11000'
  | 'CPU_250_RAM_12000'
  | 'CPU_250_RAM_13000'
  | 'CPU_250_RAM_14000'
  | 'CPU_250_RAM_15000'
  | 'CPU_250_RAM_16000'
  | 'CPU_500_RAM_500'
  | 'CPU_500_RAM_1000'
  | 'CPU_500_RAM_2000'
  | 'CPU_500_RAM_3000'
  | 'CPU_500_RAM_4000'
  | 'CPU_500_RAM_5000'
  | 'CPU_500_RAM_6000'
  | 'CPU_500_RAM_7000'
  | 'CPU_500_RAM_8000'
  | 'CPU_500_RAM_9000'
  | 'CPU_500_RAM_10000'
  | 'CPU_500_RAM_11000'
  | 'CPU_500_RAM_12000'
  | 'CPU_500_RAM_13000'
  | 'CPU_500_RAM_14000'
  | 'CPU_500_RAM_15000'
  | 'CPU_500_RAM_16000'
  | 'CPU_750_RAM_500'
  | 'CPU_750_RAM_1000'
  | 'CPU_750_RAM_2000'
  | 'CPU_750_RAM_3000'
  | 'CPU_750_RAM_4000'
  | 'CPU_750_RAM_5000'
  | 'CPU_750_RAM_6000'
  | 'CPU_750_RAM_7000'
  | 'CPU_750_RAM_8000'
  | 'CPU_750_RAM_9000'
  | 'CPU_750_RAM_10000'
  | 'CPU_750_RAM_11000'
  | 'CPU_750_RAM_12000'
  | 'CPU_750_RAM_13000'
  | 'CPU_750_RAM_14000'
  | 'CPU_750_RAM_15000'
  | 'CPU_750_RAM_16000'
  | 'CPU_1000_RAM_500'
  | 'CPU_1000_RAM_1000'
  | 'CPU_1000_RAM_2000'
  | 'CPU_1000_RAM_3000'
  | 'CPU_1000_RAM_4000'
  | 'CPU_1000_RAM_5000'
  | 'CPU_1000_RAM_6000'
  | 'CPU_1000_RAM_7000'
  | 'CPU_1000_RAM_8000'
  | 'CPU_1000_RAM_9000'
  | 'CPU_1000_RAM_10000'
  | 'CPU_1000_RAM_11000'
  | 'CPU_1000_RAM_12000'
  | 'CPU_1000_RAM_13000'
  | 'CPU_1000_RAM_14000'
  | 'CPU_1000_RAM_15000'
  | 'CPU_1000_RAM_16000'
  | 'CPU_2000_RAM_500'
  | 'CPU_2000_RAM_1000'
  | 'CPU_2000_RAM_2000'
  | 'CPU_2000_RAM_3000'
  | 'CPU_2000_RAM_4000'
  | 'CPU_2000_RAM_5000'
  | 'CPU_2000_RAM_6000'
  | 'CPU_2000_RAM_7000'
  | 'CPU_2000_RAM_8000'
  | 'CPU_2000_RAM_9000'
  | 'CPU_2000_RAM_10000'
  | 'CPU_2000_RAM_11000'
  | 'CPU_2000_RAM_12000'
  | 'CPU_2000_RAM_13000'
  | 'CPU_2000_RAM_14000'
  | 'CPU_2000_RAM_15000'
  | 'CPU_2000_RAM_16000'
  | 'CPU_3000_RAM_500'
  | 'CPU_3000_RAM_1000'
  | 'CPU_3000_RAM_2000'
  | 'CPU_3000_RAM_3000'
  | 'CPU_3000_RAM_4000'
  | 'CPU_3000_RAM_5000'
  | 'CPU_3000_RAM_6000'
  | 'CPU_3000_RAM_7000'
  | 'CPU_3000_RAM_8000'
  | 'CPU_3000_RAM_9000'
  | 'CPU_3000_RAM_10000'
  | 'CPU_3000_RAM_11000'
  | 'CPU_3000_RAM_12000'
  | 'CPU_3000_RAM_13000'
  | 'CPU_3000_RAM_14000'
  | 'CPU_3000_RAM_15000'
  | 'CPU_3000_RAM_16000'
  | 'CPU_4000_RAM_500'
  | 'CPU_4000_RAM_1000'
  | 'CPU_4000_RAM_2000'
  | 'CPU_4000_RAM_3000'
  | 'CPU_4000_RAM_4000'
  | 'CPU_4000_RAM_5000'
  | 'CPU_4000_RAM_6000'
  | 'CPU_4000_RAM_7000'
  | 'CPU_4000_RAM_8000'
  | 'CPU_4000_RAM_9000'
  | 'CPU_4000_RAM_10000'
  | 'CPU_4000_RAM_11000'
  | 'CPU_4000_RAM_12000'
  | 'CPU_4000_RAM_13000'
  | 'CPU_4000_RAM_14000'
  | 'CPU_4000_RAM_15000'
  | 'CPU_4000_RAM_16000';

export type ContainerType = 'DEFAULT' | 'STARTER';

export type CpuUnit = 'CPU' | 'mCPU';

export type Customer = {
  /** @deprecated this field will be removed in the future */
  address?: Maybe<Address>;
  /** @deprecated this field will be removed in the future */
  billingPeriod: Scalars['Int']['output'];
  hasPaymentDetails: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** @deprecated this field will be removed in the future */
  name: Scalars['String']['output'];
  /** @deprecated this field will be removed in the future */
  recurringPayment: Scalars['Boolean']['output'];
  suspendedReason?: Maybe<SuspendedReason>;
  /** @deprecated this field will be removed in the future */
  termOfPayment: Scalars['Int']['output'];
};

export type Database = {
  description?: Maybe<Scalars['String']['output']>;
  extensions: Array<Extension>;
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type DatabaseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  state?: State;
};

export type DatabasePermission = 'READ_ONLY' | 'READ_WRITE';

export type DatabaseUser = {
  dsn: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  permissions: Array<DatabaseUserPermission>;
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type DatabaseUserInput = {
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  permissions: Array<DatabaseUserPermissionInput>;
  state?: State;
};

export type DatabaseUserPermission = {
  databaseName: Scalars['String']['output'];
  permission: DatabasePermission;
};

export type DatabaseUserPermissionInput = {
  databaseName: Scalars['String']['input'];
  permission: DatabasePermission;
  state?: State;
};

export type DatabaseVersion = {
  id: Scalars['Int']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type DeleteNamespaceInput = {
  name: Scalars['String']['input'];
};

export type DeleteRegistryConnectionInput = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

export type Endpoint = {
  allowList: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  ipv4Address: Scalars['String']['output'];
  ipv6Address: Scalars['String']['output'];
  port: Scalars['Int']['output'];
};

export type EnvironmentVariable = {
  /** @deprecated environment variables are identified by name */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  secret: Scalars['Boolean']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type EnvironmentVariableInput = {
  name: Scalars['String']['input'];
  secret?: Scalars['Boolean']['input'];
  state?: State;
  value: Scalars['String']['input'];
};

export type Extension = {
  name: Scalars['String']['output'];
};

export type ExternalConnection = {
  ipv4: Scalars['String']['output'];
  ipv6: Scalars['String']['output'];
  ports: Array<ExternalConnectionPort>;
};

export type ExternalConnectionInput = {
  ports?: Array<ExternalConnectionPortInput>;
  sharedIp?: Scalars['Boolean']['input'];
  state?: State;
};

export type ExternalConnectionPort = {
  allowList: Array<Scalars['String']['output']>;
  externalPort: Scalars['Int']['output'];
  internalPort?: Maybe<Scalars['Int']['output']>;
  protocol: Protocol;
};

export type ExternalConnectionPortInput = {
  allowList?: Array<AllowListInput>;
  externalPort?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Internal port is only used for external connections of containers.
   * For other resources, it's automatically selected
   *
   * See ports in `ContainerCreateInput` and `ContainerModifyInput`
   */
  internalPort?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Protocol is only used for external connections of containers.
   * For other resources, only TCP is allowed.
   */
  protocol?: Protocol;
  state?: State;
};

export type HealthCheck = {
  path: Scalars['String']['output'];
  port: Scalars['Int']['output'];
};

export type HealthCheckInput = {
  path: Scalars['String']['input'];
  port: Scalars['Int']['input'];
};

export type Ingress = {
  allowlist: Array<Scalars['String']['output']>;
  domainName: Scalars['String']['output'];
  enableTLS: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  namespace: Namespace;
  port: Scalars['Int']['output'];
  state: Scalars['String']['output'];
  url: Scalars['String']['output'];
  /** @deprecated use field `allowlist` instead */
  whitelist: Array<Scalars['String']['output']>;
};

export type IngressInput = {
  domainName?: InputMaybe<Scalars['String']['input']>;
  enableTLS?: Scalars['Boolean']['input'];
  port: Scalars['Int']['input'];
  state?: State;
  whitelist?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Location = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ManualScalingInput = {
  replicas: Scalars['Int']['input'];
};

export type MessageQueue = {
  adminUser?: Maybe<MessageQueueUser>;
  externalConnection?: Maybe<ExternalConnection>;
  id: Scalars['String']['output'];
  ingress: MessageQueueIngress;
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  namespace: Namespace;
  plan: MessageQueuePlan;
  spec: MessageQueueSpec;
  state: Scalars['String']['output'];
};

export type MessageQueueCreateInput = {
  allowList: Array<AllowListInput>;
  externalConnection?: InputMaybe<ExternalConnectionInput>;
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  plan: Scalars['String']['input'];
  spec: MessageQueueSpecInput;
};

export type MessageQueueIngress = {
  allowList?: Maybe<Array<Scalars['String']['output']>>;
  domainName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  status: Status;
  tlsEnabled: Scalars['Boolean']['output'];
};

export type MessageQueueModifyInput = {
  allowList?: InputMaybe<Array<AllowListInput>>;
  externalConnection?: InputMaybe<ExternalConnectionInput>;
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

export type MessageQueuePlan = {
  benchmark?: Maybe<MessageQueuePlanBenchmark>;
  cpu: Scalars['Float']['output'];
  group: Scalars['String']['output'];
  id: Scalars['String']['output'];
  memory: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  price: Price;
  replicas: Scalars['Int']['output'];
  storage: Scalars['Float']['output'];
};

export type MessageQueuePlanCpuArgs = {
  unit?: InputMaybe<CpuUnit>;
};

export type MessageQueuePlanMemoryArgs = {
  unit?: InputMaybe<Unit>;
};

export type MessageQueuePlanStorageArgs = {
  unit?: InputMaybe<Unit>;
};

export type MessageQueuePlanBenchmark = {
  connections: Scalars['Int']['output'];
  maximumMessageRate: Scalars['Int']['output'];
  minimumMessageRate: Scalars['Int']['output'];
};

export type MessageQueueResourceInput = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

export type MessageQueueSpec = {
  patchLevelVersion: Scalars['String']['output'];
  type: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type MessageQueueSpecInput = {
  type: Scalars['String']['input'];
  version: Scalars['String']['input'];
};

export type MessageQueueUser = {
  dsn: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type Mount = {
  path: Scalars['String']['output'];
  volume: Volume;
};

export type MountInput = {
  /** Path to mount the volume in the container. */
  path: Scalars['String']['input'];
  /**
   * Set the expected state of this mount.
   * When the state is set to `ABSENT`, the mount will be removed, the volume will be kept.
   */
  state?: State;
  volume: MountVolumeInput;
};

export type MountVolumeInput = {
  /** Create the volume if it does not exist. */
  autoCreate?: Scalars['Boolean']['input'];
  /** Increase the size of the volume if it already exists. */
  increase?: Scalars['Boolean']['input'];
  /** Name of the volume */
  name: Scalars['String']['input'];
  /** Size of the volume in GB */
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  /**
   * Cost: complexity = 100, multipliers = [], defaultMultiplier = null
   * @deprecated use `registryConnectionCreate` mutation
   */
  addPrivateRegistry: Scalars['Boolean']['output'];
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterCreate: CloudDatabaseCluster;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterDatabaseCreate: Database;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterDatabaseDelete: Scalars['Boolean']['output'];
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterDelete: Scalars['Boolean']['output'];
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterModify: CloudDatabaseCluster;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterUserCreate: DatabaseUser;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterUserDelete: Scalars['Boolean']['output'];
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterUserModify: DatabaseUser;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  containerCreate: Container;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  containerDelete: Scalars['Boolean']['output'];
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  containerJobCreate: ContainerJob;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  containerJobDelete: Scalars['Boolean']['output'];
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  containerJobModify: ContainerJob;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  containerModify: Container;
  /**
   * Cost: complexity = 100, multipliers = [], defaultMultiplier = null
   * @deprecated use `namespaceCreate` mutation
   */
  createNamespace: Scalars['Boolean']['output'];
  /**
   * Cost: complexity = 100, multipliers = [], defaultMultiplier = null
   * @deprecated use `volumeCreate` mutation
   */
  createVolume?: Maybe<Volume>;
  /**
   * Cost: complexity = 100, multipliers = [], defaultMultiplier = null
   * @deprecated use `namespaceDelete` mutation
   */
  deleteNamespace: Scalars['Boolean']['output'];
  /**
   * Cost: complexity = 100, multipliers = [], defaultMultiplier = null
   * @deprecated use `registryConnectionDelete` mutation instead
   */
  deletePrivateRegistry: Scalars['Boolean']['output'];
  /**
   * Deletes a volume.
   * Volumes can be deleted if they are not mounted to any container.
   *
   * Cost: complexity = 100, multipliers = [], defaultMultiplier = null
   * @deprecated use `volumeDelete` mutation
   */
  deleteVolume: Scalars['Boolean']['output'];
  /**
   * Increases the size of a volume.
   * Volumes sizes can only be increased. Increase of volume will not be possible if the volume state is locked.
   * We do increase volumes on the fly, so the volume will be increased without any downtime.
   *
   * Cost: complexity = 100, multipliers = [], defaultMultiplier = null
   * @deprecated use `volumeIncrease` mutation
   */
  increaseVolume: Volume;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  messageQueueCreate: MessageQueue;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  messageQueueDelete: Scalars['Boolean']['output'];
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  messageQueueModify: MessageQueue;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  messageQueueUserModify: MessageQueueUser;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  namespaceCreate: Namespace;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  namespaceDelete: Scalars['Boolean']['output'];
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  registryConnectionCreate: PrivateRegistry;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  registryConnectionDelete: Scalars['Boolean']['output'];
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  volumeCreate: Volume;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  volumeDelete: Scalars['Boolean']['output'];
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  volumeIncrease: Volume;
};

export type MutationAddPrivateRegistryArgs = {
  name: Scalars['String']['input'];
  namespaceId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
  source: Scalars['String']['input'];
  username: Scalars['String']['input'];
  verify?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationCloudDatabaseClusterCreateArgs = {
  cloudDatabaseClusterInput?: InputMaybe<CloudDatabaseClusterCreateInput>;
};

export type MutationCloudDatabaseClusterDatabaseCreateArgs = {
  databaseInput?: InputMaybe<CloudDatabaseClusterDatabaseCreateInput>;
};

export type MutationCloudDatabaseClusterDatabaseDeleteArgs = {
  databaseInput: CloudDatabaseClusterDatabaseResourceInput;
};

export type MutationCloudDatabaseClusterDeleteArgs = {
  cloudDatabase: CloudDatabaseClusterResourceInput;
};

export type MutationCloudDatabaseClusterModifyArgs = {
  cloudDatabaseClusterInput?: InputMaybe<CloudDatabaseClusterModifyInput>;
};

export type MutationCloudDatabaseClusterUserCreateArgs = {
  userInput?: InputMaybe<CloudDatabaseClusterUserCreateInput>;
};

export type MutationCloudDatabaseClusterUserDeleteArgs = {
  userInput: CloudDatabaseClusterUserResourceInput;
};

export type MutationCloudDatabaseClusterUserModifyArgs = {
  userInput?: InputMaybe<CloudDatabaseClusterUserModifyInput>;
};

export type MutationContainerCreateArgs = {
  containerInput?: InputMaybe<ContainerCreateInput>;
};

export type MutationContainerDeleteArgs = {
  container: ContainerDeleteInput;
};

export type MutationContainerJobCreateArgs = {
  scheduledJob: ContainerJobCreateInput;
};

export type MutationContainerJobDeleteArgs = {
  scheduledJob: ResourceNameInput;
};

export type MutationContainerJobModifyArgs = {
  scheduledJob?: InputMaybe<ContainerJobModifyInput>;
};

export type MutationContainerModifyArgs = {
  containerInput?: InputMaybe<ContainerModifyInput>;
};

export type MutationCreateNamespaceArgs = {
  customerId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  pricingPlanId?: InputMaybe<Scalars['Int']['input']>;
  resourceSpecificationId?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationCreateVolumeArgs = {
  name: Scalars['String']['input'];
  namespaceId: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type MutationDeleteNamespaceArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeletePrivateRegistryArgs = {
  privateRegistryId: Scalars['Int']['input'];
};

export type MutationDeleteVolumeArgs = {
  namespaceId: Scalars['NamespaceId']['input'];
  volumeId?: InputMaybe<Scalars['Int']['input']>;
  volumeName?: InputMaybe<Scalars['String']['input']>;
};

export type MutationIncreaseVolumeArgs = {
  name: Scalars['String']['input'];
  namespaceId: Scalars['NamespaceId']['input'];
  size: Scalars['Int']['input'];
};

export type MutationMessageQueueCreateArgs = {
  messageQueue?: InputMaybe<MessageQueueCreateInput>;
};

export type MutationMessageQueueDeleteArgs = {
  messageQueue: MessageQueueResourceInput;
};

export type MutationMessageQueueModifyArgs = {
  messageQueue?: InputMaybe<MessageQueueModifyInput>;
};

export type MutationMessageQueueUserModifyArgs = {
  userInput?: InputMaybe<CloudDatabaseClusterUserModifyInput>;
};

export type MutationNamespaceCreateArgs = {
  namespaceInput: NamespaceCreateInput;
};

export type MutationNamespaceDeleteArgs = {
  namespace: DeleteNamespaceInput;
};

export type MutationRegistryConnectionCreateArgs = {
  registryInput: RegistryCreateInput;
};

export type MutationRegistryConnectionDeleteArgs = {
  registryConnection: DeleteRegistryConnectionInput;
};

export type MutationVolumeCreateArgs = {
  volumeInput?: InputMaybe<VolumeCreateInput>;
};

export type MutationVolumeDeleteArgs = {
  volume: VolumeResourceInput;
};

export type MutationVolumeIncreaseArgs = {
  volumeInput?: InputMaybe<VolumeModifyInput>;
};

export type Namespace = {
  cloudDatabaseClusters: Array<CloudDatabaseCluster>;
  containerJobs: Array<ContainerJob>;
  containers?: Maybe<Array<Container>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** @deprecated this field will be removed in the future. There is no replacement */
  internalName: Scalars['String']['output'];
  messageQueues: Array<MessageQueue>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  pricingPlan: PricingPlan;
  privateRegistries: Array<PrivateRegistry>;
  resourceSpecification?: Maybe<ResourceSpecification>;
  state: Scalars['String']['output'];
  volumes?: Maybe<Array<Volume>>;
};

export type NamespaceIdArgs = {
  legacy?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NamespaceCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type NodeType = {
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  numberOfNodes: Scalars['Int']['output'];
  price: Price;
  specifications: NodeTypeSpecification;
};

export type NodeTypeSpecification = {
  cpu: Scalars['Int']['output'];
  ram: Scalars['Int']['output'];
  storage: Scalars['Int']['output'];
};

export type Plan = {
  cpu: Scalars['Int']['output'];
  group: Scalars['String']['output'];
  id: Scalars['String']['output'];
  memory: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  price: Price;
  replicas: Scalars['Int']['output'];
  storage: Scalars['Int']['output'];
};

export type PlanMemoryArgs = {
  unit?: InputMaybe<Unit>;
};

export type Price = {
  amount?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
};

export type PricingPlan = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type PrivateRegistry = {
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  namespace: Namespace;
  source: Scalars['String']['output'];
  state: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Protocol = 'TCP' | 'UDP';

export type Query = {
  /**
   * Returns the current user account.
   * This query will return the account of the currents api user.
   *
   * Cost: complexity = 100, multipliers = [], defaultMultiplier = null
   */
  account?: Maybe<Account>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  auditLogs: Array<Maybe<AuditLog>>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabase?: Maybe<CloudDatabase>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseCluster: CloudDatabaseCluster;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterPlans: Array<Plan>;
  /** Cost: complexity = 750, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterUserCredentials: DatabaseUser;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusterVersions: Array<Spec>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabaseClusters: Array<CloudDatabaseCluster>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  cloudDatabases: Array<CloudDatabase>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  container: Container;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  containerJob: ContainerJob;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  databaseVersions: Array<DatabaseVersion>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  locations: Array<Location>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  messageQueue: MessageQueue;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  messageQueuePlans: Array<MessageQueuePlan>;
  /** Cost: complexity = 750, multipliers = [], defaultMultiplier = null */
  messageQueueUserCredentials: MessageQueueUser;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  messageQueueVersions: Array<MessageQueueSpec>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  messageQueues: Array<MessageQueue>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  namespace: Namespace;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  namespaces: Array<Namespace>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  nodeType: NodeType;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  nodeTypes: Array<NodeType>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  pricingPlans: Array<PricingPlan>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  privateRegistries: Array<PrivateRegistry>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  resourceSpecifications: Array<ResourceSpecification>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  volume?: Maybe<Volume>;
  /** Cost: complexity = 100, multipliers = [], defaultMultiplier = null */
  volumes: Array<Volume>;
};

export type QueryAuditLogsArgs = {
  customerId: Scalars['ID']['input'];
  filter?: InputMaybe<AuditLogFilterInput>;
};

export type QueryCloudDatabaseArgs = {
  id: Scalars['ID']['input'];
};

export type QueryCloudDatabaseClusterArgs = {
  cloudDatabase: CloudDatabaseClusterResourceInput;
};

export type QueryCloudDatabaseClusterUserCredentialsArgs = {
  cloudDatabase: CloudDatabaseClusterResourceInput;
  username: Scalars['String']['input'];
};

export type QueryContainerArgs = {
  containerResourceInput?: InputMaybe<ContainerResourceInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryContainerJobArgs = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

export type QueryMessageQueueArgs = {
  messageQueue: MessageQueueResourceInput;
};

export type QueryMessageQueueUserCredentialsArgs = {
  messageQueue: MessageQueueResourceInput;
  username: Scalars['String']['input'];
};

export type QueryNamespaceArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type QueryNodeTypeArgs = {
  id: Scalars['String']['input'];
};

export type QueryNodeTypesArgs = {
  numberOfNodes?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryPrivateRegistriesArgs = {
  namespace?: InputMaybe<Scalars['String']['input']>;
  namespaceId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryResourceSpecificationsArgs = {
  kind: Scalars['String']['input'];
};

export type QueryVolumeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryVolumesArgs = {
  namespaceId: Scalars['Int']['input'];
};

export type RegistryCreateInput = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  password: Scalars['String']['input'];
  source: Scalars['String']['input'];
  username: Scalars['String']['input'];
  verify?: Scalars['Boolean']['input'];
};

export type Replica = {
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  statusMessage?: Maybe<Scalars['String']['output']>;
};

export type ReplicasInput = {
  maximum: Scalars['Int']['input'];
  minimum: Scalars['Int']['input'];
};

export type ResourceNameInput = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

export type ResourceSpecification = {
  cpu: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  kind: Scalars['String']['output'];
  price: Price;
  ram: Scalars['Float']['output'];
};

export type ScalingInput = {
  auto?: InputMaybe<AutoScalingInput>;
  manual?: InputMaybe<ManualScalingInput>;
};

export type Spec = {
  patchLevelVersion: Scalars['String']['output'];
  type: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type State = 'ABSENT' | 'PRESENT';

export type Status =
  | 'CREATED'
  | 'CREATE_REQUESTED'
  | 'CREATING'
  | 'DELETE_PENDING'
  | 'DELETE_REQUESTED'
  | 'DELETING'
  | 'FAILED'
  | 'ON_HOLD'
  | 'UNPROVISIONED'
  | 'UPDATED'
  | 'UPDATING';

export type Subscription = {
  /** A placeholder query used by thecodingmachine/graphqlite when there are no declared subscriptions. */
  dummySubscription?: Maybe<Scalars['String']['output']>;
};

export type SuspendedReason =
  | 'ABUSIVE_BEHAVIOUR'
  | 'DEFAULT'
  | 'MALICIOUS_ACTIVITY'
  | 'PAYMENT_ISSUES'
  | 'SUPPORTING_PROHIBITED_CONTENT';

export type Unit = 'GB' | 'MB' | 'TB';

export type Volume = {
  containerJobs: Array<ContainerJob>;
  containers: Array<Container>;
  id: Scalars['ID']['output'];
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  namespace: Namespace;
  size: Scalars['Float']['output'];
  state: Scalars['String']['output'];
  usage: Scalars['Float']['output'];
};

export type VolumeSizeArgs = {
  unit?: InputMaybe<Unit>;
};

export type VolumeUsageArgs = {
  unit?: InputMaybe<Unit>;
};

export type VolumeCreateInput = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};

export type VolumeModifyInput = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};

export type VolumeResourceInput = {
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

export type EnvironmentVariableResultFragment = {
  name: string;
  value?: string | null;
  secret: boolean;
};

export type ContainerMountsFragment = { path: string; volume: { name: string; size: number } };

export type ExternalConnectionResultFragment = {
  ipv4: string;
  ipv6: string;
  ports: Array<{
    allowList: Array<string>;
    externalPort: number;
    internalPort?: number | null;
    protocol: Protocol;
  }>;
};

export type ContainerResultFragment = {
  id: string;
  name: string;
  image: string;
  resources: ContainerResources;
  command?: Array<string> | null;
  entrypoint?: Array<string> | null;
  ports: Array<string>;
  availableReplicas: number;
  numberOfReplicas: number;
  state: string;
  locked: boolean;
  type: ContainerType;
  privateRegistry?: { name: string } | null;
  environmentVariables: Array<EnvironmentVariableResultFragment>;
  externalConnection?: ExternalConnectionResultFragment | null;
  ingresses: Array<{
    domainName: string;
    port: number;
    enableTLS: boolean;
    allowlist: Array<string>;
    state: string;
  }>;
  mounts: Array<ContainerMountsFragment>;
  healthCheck?: { port: number; path: string } | null;
  replicas: Array<{ name: string; status: string; statusMessage?: string | null }>;
  autoScaling?: {
    replicas: { minimum: number; maximum: number };
    triggers: Array<{ type: string; threshold: number }>;
  } | null;
};

export type ContainerListQueryVariables = Exact<{
  namespaceName: Scalars['String']['input'];
}>;

export type ContainerListQuery = {
  namespace: { containers?: Array<ContainerResultFragment> | null };
};

export type ContainerByNameQueryVariables = Exact<{
  namespaceName: Scalars['String']['input'];
  containerName: Scalars['String']['input'];
}>;

export type ContainerByNameQuery = { container: ContainerResultFragment };

export type ContainerCreateMutationVariables = Exact<{
  input: ContainerCreateInput;
}>;

export type ContainerCreateMutation = { containerCreate: ContainerResultFragment };

export type ContainerModifyMutationVariables = Exact<{
  input: ContainerModifyInput;
}>;

export type ContainerModifyMutation = { containerModify: ContainerResultFragment };

export type ContainerDeleteMutationVariables = Exact<{
  namespace: Scalars['String']['input'];
  container: Scalars['String']['input'];
}>;

export type ContainerDeleteMutation = { containerDelete: boolean };

export type ContainerListPlansQueryVariables = Exact<{ [key: string]: never }>;

export type ContainerListPlansQuery = {
  resourceSpecifications: Array<{
    id: string;
    cpu: number;
    ram: number;
    price: { amount?: number | null; currency?: string | null };
  }>;
};

export type ContainerJobEnvironmentVariableResultFragment = {
  name: string;
  value?: string | null;
  secret: boolean;
};

export type ContainerJobMountsFragment = { path: string; volume: { name: string; size: number } };

export type ContainerJobResultFragment = {
  name: string;
  image: string;
  resources: ContainerResources;
  command?: Array<string> | null;
  entrypoint?: Array<string> | null;
  schedule: string;
  enabled: boolean;
  state: string;
  locked: boolean;
  namespace: { name: string };
  privateRegistry?: { name: string } | null;
  environmentVariables: Array<ContainerJobEnvironmentVariableResultFragment>;
  mounts: Array<ContainerJobMountsFragment>;
};

export type ContainerJobListQueryVariables = Exact<{
  namespaceName: Scalars['String']['input'];
}>;

export type ContainerJobListQuery = {
  namespace: { containerJobs: Array<ContainerJobResultFragment> };
};

export type ContainerJobByNameQueryVariables = Exact<{
  namespaceName: Scalars['String']['input'];
  containerName: Scalars['String']['input'];
}>;

export type ContainerJobByNameQuery = { containerJob: ContainerJobResultFragment };

export type ContainerJobCreateMutationVariables = Exact<{
  scheduledJob: ContainerJobCreateInput;
}>;

export type ContainerJobCreateMutation = { containerJobCreate: ContainerJobResultFragment };

export type ContainerJobModifyMutationVariables = Exact<{
  scheduledJob: ContainerJobModifyInput;
}>;

export type ContainerJobModifyMutation = { containerJobModify: ContainerJobResultFragment };

export type ContainerJobDeleteMutationVariables = Exact<{
  namespaceName: Scalars['String']['input'];
  containerJobName: Scalars['String']['input'];
}>;

export type ContainerJobDeleteMutation = { containerJobDelete: boolean };

export type DatabaseResultFragment = { name: string; description?: string | null; status: string };

export type CreateCloudDatabaseClusterDatabaseMutationVariables = Exact<{
  cloudDatabaseClusterDatabaseInput: CloudDatabaseClusterDatabaseCreateInput;
}>;

export type CreateCloudDatabaseClusterDatabaseMutation = {
  cloudDatabaseClusterDatabaseCreate: DatabaseResultFragment;
};

export type DeleteCloudDatabaseClusterDatabaseMutationVariables = Exact<{
  cloudDatabaseClusterDatabaseInput: CloudDatabaseClusterDatabaseResourceInput;
}>;

export type DeleteCloudDatabaseClusterDatabaseMutation = {
  cloudDatabaseClusterDatabaseDelete: boolean;
};

export type DbExternalConnectionResultFragment = {
  ipv4: string;
  ipv6: string;
  ports: Array<{
    allowList: Array<string>;
    externalPort: number;
    internalPort?: number | null;
    protocol: Protocol;
  }>;
};

export type CloudDatabaseClusterDatabaseResultFragment = {
  name: string;
  description?: string | null;
  status: string;
};

export type CloudDatabaseClusterUserResultFragment = {
  name: string;
  status: string;
  dsn: string;
  password: string;
  role: string;
  permissions: Array<{ databaseName: string; permission: DatabasePermission }>;
};

export type CloudDatabaseClusterResultFragment = {
  id: string;
  name: string;
  hostname: string;
  state: string;
  locked: boolean;
  databases: Array<CloudDatabaseClusterDatabaseResultFragment>;
  namespace: { name: string };
  plan: {
    cpu: number;
    group: string;
    id: string;
    memory: number;
    name: string;
    storage: number;
    price: { amount?: number | null; currency?: string | null };
  };
  spec: { type: string; version: string };
  users: Array<CloudDatabaseClusterUserResultFragment>;
  adminUser?: CloudDatabaseClusterUserResultFragment | null;
  externalConnection?: DbExternalConnectionResultFragment | null;
};

export type GetCloudDatabaseClustersQueryVariables = Exact<{ [key: string]: never }>;

export type GetCloudDatabaseClustersQuery = {
  cloudDatabaseClusters: Array<CloudDatabaseClusterResultFragment>;
};

export type GetCloudDatabaseClusterQueryVariables = Exact<{
  cloudDatabaseClusterInput: CloudDatabaseClusterResourceInput;
}>;

export type GetCloudDatabaseClusterQuery = {
  cloudDatabaseCluster: CloudDatabaseClusterResultFragment;
};

export type CloudDatabaseClusterCreateMutationVariables = Exact<{
  cloudDatabaseClusterInput: CloudDatabaseClusterCreateInput;
}>;

export type CloudDatabaseClusterCreateMutation = {
  cloudDatabaseClusterCreate: CloudDatabaseClusterResultFragment;
};

export type CloudDatabaseClusterModifyMutationVariables = Exact<{
  cloudDatabaseClusterModifyInput: CloudDatabaseClusterModifyInput;
}>;

export type CloudDatabaseClusterModifyMutation = {
  cloudDatabaseClusterModify: CloudDatabaseClusterResultFragment;
};

export type CloudDatabaseClusterDeleteMutationVariables = Exact<{
  cloudDatabaseClusterResourceInput: CloudDatabaseClusterResourceInput;
}>;

export type CloudDatabaseClusterDeleteMutation = { cloudDatabaseClusterDelete: boolean };

export type ClusterPlansQueryVariables = Exact<{ [key: string]: never }>;

export type ClusterPlansQuery = {
  cloudDatabaseClusterPlans: Array<{
    cpu: number;
    group: string;
    id: string;
    memory: number;
    name: string;
    storage: number;
    price: { amount?: number | null; currency?: string | null };
  }>;
};

export type ClusterVersionsQueryVariables = Exact<{ [key: string]: never }>;

export type ClusterVersionsQuery = {
  cloudDatabaseClusterVersions: Array<{ type: string; version: string }>;
};

export type GetCloudDatabaseClusterUserCredentialsQueryVariables = Exact<{
  cloudDatabase: CloudDatabaseClusterResourceInput;
  userName: Scalars['String']['input'];
}>;

export type GetCloudDatabaseClusterUserCredentialsQuery = {
  cloudDatabaseClusterUserCredentials: { dsn: string };
};

export type DatabaseUserResultFragment = {
  name: string;
  status: string;
  dsn: string;
  password: string;
  role: string;
  permissions: Array<{ databaseName: string; permission: DatabasePermission }>;
};

export type GetCloudDatabaseClusterUsersQueryVariables = Exact<{
  cloudDatabaseCluster: CloudDatabaseClusterResourceInput;
}>;

export type GetCloudDatabaseClusterUsersQuery = {
  cloudDatabaseCluster: { users: Array<DatabaseUserResultFragment> };
};

export type CreateCloudDatabaseClusterUserMutationVariables = Exact<{
  userInput: CloudDatabaseClusterUserCreateInput;
}>;

export type CreateCloudDatabaseClusterUserMutation = {
  cloudDatabaseClusterUserCreate: DatabaseUserResultFragment;
};

export type ModifyCloudDatabaseClusterUserMutationVariables = Exact<{
  userInput: CloudDatabaseClusterUserModifyInput;
}>;

export type ModifyCloudDatabaseClusterUserMutation = {
  cloudDatabaseClusterUserModify: DatabaseUserResultFragment;
};

export type DeleteCloudDatabaseClusterUserMutationVariables = Exact<{
  userInput: CloudDatabaseClusterUserResourceInput;
}>;

export type DeleteCloudDatabaseClusterUserMutation = { cloudDatabaseClusterUserDelete: boolean };

export type MqExternalConnectionResultFragment = {
  ipv4: string;
  ipv6: string;
  ports: Array<{
    allowList: Array<string>;
    externalPort: number;
    internalPort?: number | null;
    protocol: Protocol;
  }>;
};

export type MessageQueuePlanResultFragment = {
  cpu: number;
  group: string;
  id: string;
  memory: number;
  name: string;
  replicas: number;
  storage: number;
  price: { amount?: number | null; currency?: string | null };
};

export type MessageQueueVersionResultFragment = {
  patchLevelVersion: string;
  type: string;
  version: string;
};

export type MessageQueueIngressResultFragment = { allowList?: Array<string> | null };

export type MessageQueueResultFragment = {
  id: string;
  locked: boolean;
  name: string;
  state: string;
  namespace: { name: string };
  adminUser?: { name: string; role: string; status: string } | null;
  plan: MessageQueuePlanResultFragment;
  spec: MessageQueueVersionResultFragment;
  ingress: MessageQueueIngressResultFragment;
  externalConnection?: MqExternalConnectionResultFragment | null;
};

export type MessageQueuesGetQueryVariables = Exact<{ [key: string]: never }>;

export type MessageQueuesGetQuery = { messageQueues: Array<MessageQueueResultFragment> };

export type MessageQueueGetQueryVariables = Exact<{
  messageQueueInput: MessageQueueResourceInput;
}>;

export type MessageQueueGetQuery = { messageQueue: MessageQueueResultFragment };

export type MessageQueueCreateMutationVariables = Exact<{
  messageQueueInput: MessageQueueCreateInput;
}>;

export type MessageQueueCreateMutation = { messageQueueCreate: MessageQueueResultFragment };

export type MessageQueueModifyMutationVariables = Exact<{
  messageQueueInput: MessageQueueModifyInput;
}>;

export type MessageQueueModifyMutation = { messageQueueModify: MessageQueueResultFragment };

export type MessageQueueDeleteMutationVariables = Exact<{
  messageQueueInput: MessageQueueResourceInput;
}>;

export type MessageQueueDeleteMutation = { messageQueueDelete: boolean };

export type MessageQueuePlansGetQueryVariables = Exact<{ [key: string]: never }>;

export type MessageQueuePlansGetQuery = {
  messageQueuePlans: Array<{
    cpu: number;
    group: string;
    id: string;
    memory: number;
    name: string;
    replicas: number;
    storage: number;
    price: { amount?: number | null; currency?: string | null };
  }>;
};

export type MessageQueueVersionsGetQueryVariables = Exact<{ [key: string]: never }>;

export type MessageQueueVersionsGetQuery = {
  messageQueueVersions: Array<{ patchLevelVersion: string; type: string; version: string }>;
};

export type MessageQueueUserCredentialsGetQueryVariables = Exact<{
  messageQueueInput: MessageQueueResourceInput;
  username: Scalars['String']['input'];
}>;

export type MessageQueueUserCredentialsGetQuery = {
  messageQueueUserCredentials: {
    name: string;
    dsn: string;
    password: string;
    role: string;
    status: string;
  };
};

export type NamespaceResultFragment = {
  id: string;
  name: string;
  description: string;
  state: string;
  containerJobs: Array<{ name: string }>;
  containers?: Array<{ name: string }> | null;
  volumes?: Array<{ name: string }> | null;
  cloudDatabaseClusters: Array<{ name: string }>;
  messageQueues: Array<{ name: string }>;
};

export type NamespaceListQueryVariables = Exact<{ [key: string]: never }>;

export type NamespaceListQuery = { namespaces: Array<NamespaceResultFragment> };

export type NamespaceGetQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type NamespaceGetQuery = { namespace: NamespaceResultFragment };

export type NamespaceCreateMutationVariables = Exact<{
  input: NamespaceCreateInput;
}>;

export type NamespaceCreateMutation = { namespaceCreate: NamespaceResultFragment };

export type NamespaceDeleteMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type NamespaceDeleteMutation = { namespaceDelete: boolean };

export type RegistryResultFragment = {
  name: string;
  source: string;
  username: string;
  state: string;
  locked: boolean;
};

export type RegistryListQueryVariables = Exact<{
  namespaceName: Scalars['String']['input'];
}>;

export type RegistryListQuery = { namespace: { privateRegistries: Array<RegistryResultFragment> } };

export type RegistryCreateMutationVariables = Exact<{
  input: RegistryCreateInput;
}>;

export type RegistryCreateMutation = { registryConnectionCreate: RegistryResultFragment };

export type RegistryDeleteMutationVariables = Exact<{
  namespaceName: Scalars['String']['input'];
  registryName: Scalars['String']['input'];
}>;

export type RegistryDeleteMutation = { registryConnectionDelete: boolean };

export type VolumeResultFragment = {
  name: string;
  size: number;
  usage: number;
  state: string;
  locked: boolean;
  containers: Array<{ name: string }>;
  containerJobs: Array<{ name: string }>;
};

export type VolumeListQueryVariables = Exact<{
  namespaceName: Scalars['String']['input'];
}>;

export type VolumeListQuery = { namespace: { volumes?: Array<VolumeResultFragment> | null } };

export type VolumeCreateMutationVariables = Exact<{
  input: VolumeCreateInput;
}>;

export type VolumeCreateMutation = { volumeCreate: VolumeResultFragment };

export type VolumeIncreaseMutationVariables = Exact<{
  input: VolumeModifyInput;
}>;

export type VolumeIncreaseMutation = { volumeIncrease: VolumeResultFragment };

export type VolumeDeleteMutationVariables = Exact<{
  namespaceName: Scalars['String']['input'];
  volumeName: Scalars['String']['input'];
}>;

export type VolumeDeleteMutation = { volumeDelete: boolean };

export const EnvironmentVariableResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnvironmentVariableResultFragment, unknown>;
export const ExternalConnectionResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ExternalConnectionResultFragment, unknown>;
export const ContainerMountsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerMountsFragment, unknown>;
export const ContainerResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Container' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'privateRegistry' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'resources' } },
          { kind: 'Field', name: { kind: 'Name', value: 'command' } },
          { kind: 'Field', name: { kind: 'Name', value: 'entrypoint' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environmentVariables' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EnvironmentVariableResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ExternalConnectionResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'ports' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingresses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'domainName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                { kind: 'Field', name: { kind: 'Name', value: 'enableTLS' } },
                { kind: 'Field', name: { kind: 'Name', value: 'allowlist' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerMounts' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'healthCheck' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'availableReplicas' } },
          { kind: 'Field', name: { kind: 'Name', value: 'numberOfReplicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'replicas' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'statusMessage' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'autoScaling' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replicas' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'minimum' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maximum' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triggers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'threshold' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerResultFragment, unknown>;
export const ContainerJobEnvironmentVariableResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerJobEnvironmentVariableResultFragment, unknown>;
export const ContainerJobMountsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerJobMountsFragment, unknown>;
export const ContainerJobResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ContainerJob' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'privateRegistry' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'resources' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environmentVariables' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'command' } },
          { kind: 'Field', name: { kind: 'Name', value: 'entrypoint' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerJobMounts' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'schedule' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerJobResultFragment, unknown>;
export const DatabaseResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DatabaseResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Database' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DatabaseResultFragment, unknown>;
export const CloudDatabaseClusterDatabaseResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Database' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CloudDatabaseClusterDatabaseResultFragment, unknown>;
export const CloudDatabaseClusterUserResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DatabaseUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'databaseName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permission' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
          { kind: 'Field', name: { kind: 'Name', value: 'password' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CloudDatabaseClusterUserResultFragment, unknown>;
export const DbExternalConnectionResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DbExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DbExternalConnectionResultFragment, unknown>;
export const CloudDatabaseClusterResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CloudDatabaseCluster' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'databases' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hostname' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'cpu' } },
                { kind: 'Field', name: { kind: 'Name', value: 'group' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'memory' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'unit' },
                      value: { kind: 'EnumValue', value: 'GB' },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'storage' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spec' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'version' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DbExternalConnectionResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Database' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DatabaseUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'databaseName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permission' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
          { kind: 'Field', name: { kind: 'Name', value: 'password' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DbExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CloudDatabaseClusterResultFragment, unknown>;
export const DatabaseUserResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DatabaseUserResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DatabaseUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'databaseName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permission' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
          { kind: 'Field', name: { kind: 'Name', value: 'password' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DatabaseUserResultFragment, unknown>;
export const MessageQueuePlanResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueuePlanResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueuePlan' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cpu' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'CPU' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'group' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'replicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'storage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueuePlanResultFragment, unknown>;
export const MessageQueueVersionResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueVersionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueSpec' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'patchLevelVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueueVersionResultFragment, unknown>;
export const MessageQueueIngressResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueIngressResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueIngress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'allowList' } }],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueueIngressResultFragment, unknown>;
export const MqExternalConnectionResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MqExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MqExternalConnectionResultFragment, unknown>;
export const MessageQueueResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueue' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageQueuePlanResult' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spec' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MessageQueueVersionResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MessageQueueIngressResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MqExternalConnectionResult' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueuePlanResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueuePlan' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cpu' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'CPU' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'group' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'replicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'storage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueVersionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueSpec' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'patchLevelVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueIngressResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueIngress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'allowList' } }],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MqExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueueResultFragment, unknown>;
export const NamespaceResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'NamespaceResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Namespace' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobs' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volumes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusters' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueues' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NamespaceResultFragment, unknown>;
export const RegistryResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegistryResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PrivateRegistry' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegistryResultFragment, unknown>;
export const VolumeResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VolumeResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Volume' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'size' } },
          { kind: 'Field', name: { kind: 'Name', value: 'usage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobs' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolumeResultFragment, unknown>;
export const ContainerListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'containerList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'containers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerResult' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Container' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'privateRegistry' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'resources' } },
          { kind: 'Field', name: { kind: 'Name', value: 'command' } },
          { kind: 'Field', name: { kind: 'Name', value: 'entrypoint' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environmentVariables' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EnvironmentVariableResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ExternalConnectionResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'ports' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingresses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'domainName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                { kind: 'Field', name: { kind: 'Name', value: 'enableTLS' } },
                { kind: 'Field', name: { kind: 'Name', value: 'allowlist' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerMounts' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'healthCheck' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'availableReplicas' } },
          { kind: 'Field', name: { kind: 'Name', value: 'numberOfReplicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'replicas' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'statusMessage' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'autoScaling' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replicas' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'minimum' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maximum' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triggers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'threshold' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerListQuery, ContainerListQueryVariables>;
export const ContainerByNameDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'containerByName' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'containerName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'container' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'containerResourceInput' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'containerName' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'namespace' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Container' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'privateRegistry' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'resources' } },
          { kind: 'Field', name: { kind: 'Name', value: 'command' } },
          { kind: 'Field', name: { kind: 'Name', value: 'entrypoint' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environmentVariables' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EnvironmentVariableResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ExternalConnectionResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'ports' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingresses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'domainName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                { kind: 'Field', name: { kind: 'Name', value: 'enableTLS' } },
                { kind: 'Field', name: { kind: 'Name', value: 'allowlist' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerMounts' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'healthCheck' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'availableReplicas' } },
          { kind: 'Field', name: { kind: 'Name', value: 'numberOfReplicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'replicas' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'statusMessage' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'autoScaling' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replicas' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'minimum' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maximum' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triggers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'threshold' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerByNameQuery, ContainerByNameQueryVariables>;
export const ContainerCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'containerCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ContainerCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'containerInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Container' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'privateRegistry' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'resources' } },
          { kind: 'Field', name: { kind: 'Name', value: 'command' } },
          { kind: 'Field', name: { kind: 'Name', value: 'entrypoint' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environmentVariables' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EnvironmentVariableResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ExternalConnectionResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'ports' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingresses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'domainName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                { kind: 'Field', name: { kind: 'Name', value: 'enableTLS' } },
                { kind: 'Field', name: { kind: 'Name', value: 'allowlist' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerMounts' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'healthCheck' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'availableReplicas' } },
          { kind: 'Field', name: { kind: 'Name', value: 'numberOfReplicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'replicas' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'statusMessage' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'autoScaling' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replicas' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'minimum' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maximum' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triggers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'threshold' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerCreateMutation, ContainerCreateMutationVariables>;
export const ContainerModifyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'containerModify' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ContainerModifyInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerModify' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'containerInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Container' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'privateRegistry' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'resources' } },
          { kind: 'Field', name: { kind: 'Name', value: 'command' } },
          { kind: 'Field', name: { kind: 'Name', value: 'entrypoint' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environmentVariables' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EnvironmentVariableResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ExternalConnectionResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'ports' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingresses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'domainName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                { kind: 'Field', name: { kind: 'Name', value: 'enableTLS' } },
                { kind: 'Field', name: { kind: 'Name', value: 'allowlist' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerMounts' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'healthCheck' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'availableReplicas' } },
          { kind: 'Field', name: { kind: 'Name', value: 'numberOfReplicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'replicas' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'statusMessage' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'autoScaling' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replicas' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'minimum' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maximum' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triggers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'threshold' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerModifyMutation, ContainerModifyMutationVariables>;
export const ContainerDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'containerDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'namespace' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'container' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'container' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'container' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'namespace' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'namespace' } },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerDeleteMutation, ContainerDeleteMutationVariables>;
export const ContainerListPlansDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'containerListPlans' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resourceSpecifications' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'kind' },
                value: { kind: 'StringValue', value: 'container', block: false },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cpu' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ram' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerListPlansQuery, ContainerListPlansQueryVariables>;
export const ContainerJobListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'containerJobList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'containerJobs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ContainerJobResult' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ContainerJob' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'privateRegistry' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'resources' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environmentVariables' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'command' } },
          { kind: 'Field', name: { kind: 'Name', value: 'entrypoint' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerJobMounts' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'schedule' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerJobListQuery, ContainerJobListQueryVariables>;
export const ContainerJobByNameDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'containerJobByName' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'containerName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJob' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'containerName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'namespace' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerJobResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ContainerJob' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'privateRegistry' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'resources' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environmentVariables' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'command' } },
          { kind: 'Field', name: { kind: 'Name', value: 'entrypoint' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerJobMounts' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'schedule' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerJobByNameQuery, ContainerJobByNameQueryVariables>;
export const ContainerJobCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'containerJobCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'scheduledJob' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ContainerJobCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'scheduledJob' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'scheduledJob' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerJobResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ContainerJob' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'privateRegistry' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'resources' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environmentVariables' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'command' } },
          { kind: 'Field', name: { kind: 'Name', value: 'entrypoint' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerJobMounts' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'schedule' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerJobCreateMutation, ContainerJobCreateMutationVariables>;
export const ContainerJobModifyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'containerJobModify' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'scheduledJob' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ContainerJobModifyInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobModify' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'scheduledJob' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'scheduledJob' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerJobResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EnvironmentVariable' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'secret' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobMounts' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Mount' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volume' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContainerJobResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ContainerJob' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'privateRegistry' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'resources' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environmentVariables' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ContainerJobEnvironmentVariableResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'command' } },
          { kind: 'Field', name: { kind: 'Name', value: 'entrypoint' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ContainerJobMounts' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'schedule' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerJobModifyMutation, ContainerJobModifyMutationVariables>;
export const ContainerJobDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'containerJobDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'containerJobName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'scheduledJob' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'containerJobName' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'namespace' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContainerJobDeleteMutation, ContainerJobDeleteMutationVariables>;
export const CreateCloudDatabaseClusterDatabaseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCloudDatabaseClusterDatabase' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cloudDatabaseClusterDatabaseInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseCreateInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterDatabaseCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'databaseInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cloudDatabaseClusterDatabaseInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DatabaseResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DatabaseResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Database' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCloudDatabaseClusterDatabaseMutation,
  CreateCloudDatabaseClusterDatabaseMutationVariables
>;
export const DeleteCloudDatabaseClusterDatabaseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteCloudDatabaseClusterDatabase' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cloudDatabaseClusterDatabaseInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResourceInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterDatabaseDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'databaseInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cloudDatabaseClusterDatabaseInput' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCloudDatabaseClusterDatabaseMutation,
  DeleteCloudDatabaseClusterDatabaseMutationVariables
>;
export const GetCloudDatabaseClustersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getCloudDatabaseClusters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusters' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterResult' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Database' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DatabaseUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'databaseName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permission' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
          { kind: 'Field', name: { kind: 'Name', value: 'password' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DbExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CloudDatabaseCluster' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'databases' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hostname' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'cpu' } },
                { kind: 'Field', name: { kind: 'Name', value: 'group' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'memory' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'unit' },
                      value: { kind: 'EnumValue', value: 'GB' },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'storage' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spec' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'version' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DbExternalConnectionResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCloudDatabaseClustersQuery, GetCloudDatabaseClustersQueryVariables>;
export const GetCloudDatabaseClusterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getCloudDatabaseCluster' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cloudDatabaseClusterInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterResourceInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseCluster' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cloudDatabase' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cloudDatabaseClusterInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterResult' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Database' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DatabaseUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'databaseName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permission' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
          { kind: 'Field', name: { kind: 'Name', value: 'password' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DbExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CloudDatabaseCluster' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'databases' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hostname' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'cpu' } },
                { kind: 'Field', name: { kind: 'Name', value: 'group' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'memory' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'unit' },
                      value: { kind: 'EnumValue', value: 'GB' },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'storage' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spec' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'version' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DbExternalConnectionResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCloudDatabaseClusterQuery, GetCloudDatabaseClusterQueryVariables>;
export const CloudDatabaseClusterCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'cloudDatabaseClusterCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cloudDatabaseClusterInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterCreateInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cloudDatabaseClusterInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cloudDatabaseClusterInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterResult' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Database' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DatabaseUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'databaseName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permission' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
          { kind: 'Field', name: { kind: 'Name', value: 'password' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DbExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CloudDatabaseCluster' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'databases' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hostname' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'cpu' } },
                { kind: 'Field', name: { kind: 'Name', value: 'group' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'memory' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'unit' },
                      value: { kind: 'EnumValue', value: 'GB' },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'storage' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spec' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'version' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DbExternalConnectionResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CloudDatabaseClusterCreateMutation,
  CloudDatabaseClusterCreateMutationVariables
>;
export const CloudDatabaseClusterModifyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'cloudDatabaseClusterModify' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cloudDatabaseClusterModifyInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterModifyInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterModify' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cloudDatabaseClusterInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cloudDatabaseClusterModifyInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterResult' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Database' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DatabaseUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'databaseName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permission' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
          { kind: 'Field', name: { kind: 'Name', value: 'password' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DbExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CloudDatabaseClusterResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CloudDatabaseCluster' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'databases' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterDatabaseResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hostname' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'cpu' } },
                { kind: 'Field', name: { kind: 'Name', value: 'group' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'memory' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'unit' },
                      value: { kind: 'EnumValue', value: 'GB' },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'storage' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spec' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'version' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CloudDatabaseClusterUserResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DbExternalConnectionResult' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CloudDatabaseClusterModifyMutation,
  CloudDatabaseClusterModifyMutationVariables
>;
export const CloudDatabaseClusterDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'cloudDatabaseClusterDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cloudDatabaseClusterResourceInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterResourceInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cloudDatabase' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cloudDatabaseClusterResourceInput' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CloudDatabaseClusterDeleteMutation,
  CloudDatabaseClusterDeleteMutationVariables
>;
export const ClusterPlansDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'clusterPlans' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterPlans' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'cpu' } },
                { kind: 'Field', name: { kind: 'Name', value: 'group' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'memory' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'unit' },
                      value: { kind: 'EnumValue', value: 'GB' },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'storage' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClusterPlansQuery, ClusterPlansQueryVariables>;
export const ClusterVersionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'clusterVersions' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterVersions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'version' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClusterVersionsQuery, ClusterVersionsQueryVariables>;
export const GetCloudDatabaseClusterUserCredentialsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getCloudDatabaseClusterUserCredentials' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cloudDatabase' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterResourceInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterUserCredentials' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cloudDatabase' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'cloudDatabase' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'username' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userName' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'dsn' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCloudDatabaseClusterUserCredentialsQuery,
  GetCloudDatabaseClusterUserCredentialsQueryVariables
>;
export const GetCloudDatabaseClusterUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getCloudDatabaseClusterUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cloudDatabaseCluster' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterResourceInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseCluster' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cloudDatabase' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'cloudDatabaseCluster' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'users' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'DatabaseUserResult' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DatabaseUserResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DatabaseUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'databaseName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permission' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
          { kind: 'Field', name: { kind: 'Name', value: 'password' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCloudDatabaseClusterUsersQuery,
  GetCloudDatabaseClusterUsersQueryVariables
>;
export const CreateCloudDatabaseClusterUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCloudDatabaseClusterUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userInput' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterUserCreateInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterUserCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userInput' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DatabaseUserResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DatabaseUserResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DatabaseUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'databaseName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permission' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
          { kind: 'Field', name: { kind: 'Name', value: 'password' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCloudDatabaseClusterUserMutation,
  CreateCloudDatabaseClusterUserMutationVariables
>;
export const ModifyCloudDatabaseClusterUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'modifyCloudDatabaseClusterUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userInput' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterUserModifyInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterUserModify' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userInput' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DatabaseUserResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DatabaseUserResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DatabaseUser' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'databaseName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permission' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
          { kind: 'Field', name: { kind: 'Name', value: 'password' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ModifyCloudDatabaseClusterUserMutation,
  ModifyCloudDatabaseClusterUserMutationVariables
>;
export const DeleteCloudDatabaseClusterUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteCloudDatabaseClusterUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userInput' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CloudDatabaseClusterUserResourceInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusterUserDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userInput' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCloudDatabaseClusterUserMutation,
  DeleteCloudDatabaseClusterUserMutationVariables
>;
export const MessageQueuesGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'messageQueuesGet' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueues' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageQueueResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueuePlanResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueuePlan' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cpu' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'CPU' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'group' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'replicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'storage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueVersionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueSpec' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'patchLevelVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueIngressResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueIngress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'allowList' } }],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MqExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueue' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageQueuePlanResult' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spec' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MessageQueueVersionResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MessageQueueIngressResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MqExternalConnectionResult' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueuesGetQuery, MessageQueuesGetQueryVariables>;
export const MessageQueueGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'messageQueueGet' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'messageQueueInput' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueResourceInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueue' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'messageQueue' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'messageQueueInput' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageQueueResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueuePlanResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueuePlan' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cpu' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'CPU' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'group' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'replicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'storage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueVersionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueSpec' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'patchLevelVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueIngressResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueIngress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'allowList' } }],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MqExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueue' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageQueuePlanResult' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spec' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MessageQueueVersionResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MessageQueueIngressResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MqExternalConnectionResult' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueueGetQuery, MessageQueueGetQueryVariables>;
export const MessageQueueCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'messageQueueCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'messageQueueInput' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueueCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'messageQueue' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'messageQueueInput' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageQueueResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueuePlanResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueuePlan' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cpu' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'CPU' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'group' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'replicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'storage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueVersionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueSpec' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'patchLevelVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueIngressResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueIngress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'allowList' } }],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MqExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueue' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageQueuePlanResult' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spec' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MessageQueueVersionResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MessageQueueIngressResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MqExternalConnectionResult' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueueCreateMutation, MessageQueueCreateMutationVariables>;
export const MessageQueueModifyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'messageQueueModify' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'messageQueueInput' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueModifyInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueueModify' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'messageQueue' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'messageQueueInput' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageQueueResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueuePlanResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueuePlan' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cpu' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'CPU' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'group' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'memory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'replicas' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'storage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'unit' },
                value: { kind: 'EnumValue', value: 'GB' },
              },
            ],
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueVersionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueSpec' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'patchLevelVersion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueIngressResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueIngress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'allowList' } }],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MqExternalConnectionResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ExternalConnection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ipv4' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ipv6' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ports' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'allowList' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'internalPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'protocol' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageQueueResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueue' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageQueuePlanResult' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'spec' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MessageQueueVersionResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingress' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MessageQueueIngressResult' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'externalConnection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MqExternalConnectionResult' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueueModifyMutation, MessageQueueModifyMutationVariables>;
export const MessageQueueDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'messageQueueDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'messageQueueInput' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueResourceInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueueDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'messageQueue' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'messageQueueInput' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueueDeleteMutation, MessageQueueDeleteMutationVariables>;
export const MessageQueuePlansGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'messageQueuePlansGet' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueuePlans' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cpu' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'unit' },
                      value: { kind: 'EnumValue', value: 'CPU' },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'group' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'memory' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'unit' },
                      value: { kind: 'EnumValue', value: 'GB' },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'replicas' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'storage' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'unit' },
                      value: { kind: 'EnumValue', value: 'GB' },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueuePlansGetQuery, MessageQueuePlansGetQueryVariables>;
export const MessageQueueVersionsGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'messageQueueVersionsGet' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueueVersions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'patchLevelVersion' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'version' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageQueueVersionsGetQuery, MessageQueueVersionsGetQueryVariables>;
export const MessageQueueUserCredentialsGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'messageQueueUserCredentialsGet' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'messageQueueInput' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageQueueResourceInput' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueueUserCredentials' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'messageQueue' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'messageQueueInput' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'username' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dsn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'password' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MessageQueueUserCredentialsGetQuery,
  MessageQueueUserCredentialsGetQueryVariables
>;
export const NamespaceListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'namespaceList' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespaces' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NamespaceResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'NamespaceResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Namespace' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobs' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volumes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusters' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueues' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NamespaceListQuery, NamespaceListQueryVariables>;
export const NamespaceGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'namespaceGet' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NamespaceResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'NamespaceResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Namespace' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobs' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volumes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusters' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueues' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NamespaceGetQuery, NamespaceGetQueryVariables>;
export const NamespaceCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'namespaceCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'NamespaceCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespaceCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'namespaceInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NamespaceResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'NamespaceResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Namespace' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobs' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volumes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cloudDatabaseClusters' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageQueues' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NamespaceCreateMutation, NamespaceCreateMutationVariables>;
export const NamespaceDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'namespaceDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespaceDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'namespace' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NamespaceDeleteMutation, NamespaceDeleteMutationVariables>;
export const RegistryListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'registryList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privateRegistries' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'RegistryResult' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegistryResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PrivateRegistry' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegistryListQuery, RegistryListQueryVariables>;
export const RegistryCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'registryCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RegistryCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registryConnectionCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'registryInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'RegistryResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RegistryResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PrivateRegistry' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegistryCreateMutation, RegistryCreateMutationVariables>;
export const RegistryDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'registryDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'registryName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registryConnectionDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'registryConnection' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'registryName' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'namespace' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegistryDeleteMutation, RegistryDeleteMutationVariables>;
export const VolumeListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'volumeList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'namespace' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'volumes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'VolumeResult' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VolumeResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Volume' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'size' } },
          { kind: 'Field', name: { kind: 'Name', value: 'usage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobs' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolumeListQuery, VolumeListQueryVariables>;
export const VolumeCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'volumeCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'VolumeCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volumeCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'volumeInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'VolumeResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VolumeResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Volume' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'size' } },
          { kind: 'Field', name: { kind: 'Name', value: 'usage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobs' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolumeCreateMutation, VolumeCreateMutationVariables>;
export const VolumeIncreaseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'volumeIncrease' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'VolumeModifyInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volumeIncrease' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'volumeInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'VolumeResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VolumeResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Volume' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'size' } },
          { kind: 'Field', name: { kind: 'Name', value: 'usage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'containerJobs' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolumeIncreaseMutation, VolumeIncreaseMutationVariables>;
export const VolumeDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'volumeDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'volumeName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volumeDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'volume' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'volumeName' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'namespace' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'namespaceName' } },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolumeDeleteMutation, VolumeDeleteMutationVariables>;
