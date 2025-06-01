// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONObject: any;
  Upload: any;
};

/** Address data */
export interface IAddressData {
  __typename?: 'AddressData';
  /** Address */
  address?: Maybe<Scalars['String']>;
  /** City */
  city?: Maybe<Scalars['String']>;
  /** Country */
  country?: Maybe<Scalars['String']>;
  /** Full Address */
  fullAddress?: Maybe<Scalars['String']>;
  /** Google Place Id */
  googlePlaceId?: Maybe<Scalars['String']>;
  /** zip */
  zip?: Maybe<Scalars['String']>;
}

export interface IAddressDataInput {
  /** Address */
  address?: InputMaybe<Scalars['String']>;
  /** City */
  city?: InputMaybe<Scalars['String']>;
  /** Country */
  country?: InputMaybe<Scalars['String']>;
  /** Full Address */
  fullAddress?: InputMaybe<Scalars['String']>;
  /** Google Place Id */
  googlePlaceId?: InputMaybe<Scalars['String']>;
  /** zip */
  zip?: InputMaybe<Scalars['String']>;
}

/** Admin data */
export interface IAdminData {
  __typename?: 'AdminData';
  isNotificationContactUs: Scalars['Boolean'];
  isNotificationJoinFacility: Scalars['Boolean'];
}

export enum AppealingVisuallyEnum {
  Fyre = 'Fyre',
  Low = 'Low',
  Midz = 'Midz'
}

export enum AssetFileTypeEnum {
  Image = 'image',
  Logo = 'logo'
}

export interface IAssetModel {
  __typename?: 'AssetModel';
  /** Dates create/update */
  dates: IDates;
  download?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  hashname: Scalars['String'];
  /** height */
  height?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  /** ipfs */
  ipfs?: Maybe<Scalars['String']>;
  mimetype: Scalars['String'];
  product?: Maybe<IProductModel>;
  /** Size */
  size: Scalars['Int'];
  type: AssetFileTypeEnum;
  url?: Maybe<Scalars['String']>;
  /** width */
  width?: Maybe<Scalars['Int']>;
}

export interface IBalanceDto {
  __typename?: 'BalanceDTO';
  balance: Scalars['Float'];
  balanceUsd: Scalars['Float'];
}

/** Card Info */
export interface ICardInfo {
  __typename?: 'CardInfo';
  /** country */
  country?: Maybe<Scalars['String']>;
  /** Issuer */
  issuer?: Maybe<Scalars['String']>;
  /** card last4 */
  last4?: Maybe<Scalars['String']>;
  /** scheme (Visa ...) */
  scheme?: Maybe<Scalars['String']>;
}

export interface ICartItemModel {
  __typename?: 'CartItemModel';
  cart: ICartModel;
  /** Dates create/update */
  dates: IDates;
  id: Scalars['Int'];
  /** price */
  price: Scalars['Float'];
  product: IProductModel;
  /** Product quantity */
  quantity: Scalars['Float'];
  /** total price */
  total: Scalars['Float'];
}

export interface ICartModel {
  __typename?: 'CartModel';
  cartItems: Array<ICartItemModel>;
  /** cost products */
  costProducts: Scalars['Float'];
  /** Dates create/update */
  dates: IDates;
  facilityBuyer: IFacilityModel;
  facilityCultivator: IFacilityModel;
  /** fee */
  fee: Scalars['Float'];
  id: Scalars['Int'];
  netInfo?: Maybe<INetInfo>;
  /** total price */
  total: Scalars['Float'];
}

export enum ColorEnum {
  Green = 'Green',
  Purple = 'Purple',
  Yellow = 'Yellow'
}

/** Companies */
export interface ICompaniesModel {
  __typename?: 'CompaniesModel';
  items: Array<ICompanyModel>;
  meta: IPaginateModel;
}

export interface ICompanyInsightViewModel {
  __typename?: 'CompanyInsightViewModel';
  /** age range */
  ageRange: Scalars['Int'];
  appealingVisually: AppealingVisuallyEnum;
  aromaSmells: Array<Scalars['Float']>;
  color: ColorEnum;
  company?: Maybe<ICompanyModel>;
  companyId: Scalars['Float'];
  experience: ExperienceEnum;
  facilityCultivatorId: Scalars['String'];
  gender: SurveyGenderEnum;
  id: Scalars['Float'];
  intoxication: IntoxicationEnum;
  nose: NoseEnum;
  oftenConsumeCannabis: SurveyOftenConsumeCannabisEnum;
  primaryPurpose: PrimaryPurposeEnum;
  product?: Maybe<IProductModel>;
  smoked: SmokedEnum;
  surveys?: Maybe<Scalars['Float']>;
}

/** Company Insights */
export interface ICompanyInsightsModel {
  __typename?: 'CompanyInsightsModel';
  items: Array<ICompanyInsightViewModel>;
  meta: IPaginateModel;
}

/** Model's company */
export interface ICompanyModel {
  __typename?: 'CompanyModel';
  /** Company Name */
  companyName: Scalars['String'];
  /** Company's Date End company */
  dateEnd?: Maybe<Scalars['String']>;
  /** Company's Date Start company */
  dateStart: Scalars['String'];
  /** Dates create/update */
  dates: IDates;
  facilityCultivator: IFacilityModel;
  id: Scalars['Int'];
  productSurvey: IProductModel;
  /** Reward quantity (lb) */
  quantity: Scalars['Int'];
  /** Reward quantity sold (lb) */
  quantitySold: Scalars['Int'];
  /** Company's Status */
  status: CompanyStatusEnum;
  subcompanies: Array<ISubcompanyModel>;
  /** Total unit gram */
  totalGram: Scalars['Float'];
  /** Total unit lb */
  totalLb: Scalars['Float'];
  totalPeopleCompleted: Scalars['Int'];
  totalPeopleRedemption: Scalars['Int'];
  totalPeopleRegistered: Scalars['Int'];
  /** Unit Weight(gram) */
  unitWeight: Scalars['Int'];
}

export enum CompanyStatusEnum {
  Active = 'Active',
  Archived = 'Archived',
  Completed = 'Completed',
  Draft = 'Draft',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export enum ConfigurationTypesEnum {
  CommissionOrderBuyer = 'commissionOrderBuyer',
  CommissionOrderCultivator = 'commissionOrderCultivator'
}

/** Input data for update commission */
export interface IConfigurationUpdateInput {
  /** Type config */
  type: ConfigurationTypesEnum;
  /** Value */
  value: Scalars['String'];
}

export interface ICreateAdminInput {
  email: Scalars['String'];
  /** Role user: user|admin|owner */
  role: UserRoleEnum;
}

/** Create Chat Facility To Facility */
export interface ICreateChatFacilityToFacilityInput {
  facilityId: Scalars['String'];
}

/** Create Company */
export interface ICreateCompanyInput {
  /** Company Name */
  companyName: Scalars['String'];
  /** Company's Date End company */
  dateEnd?: InputMaybe<Scalars['String']>;
  /** Company's Date Start company */
  dateStart: Scalars['String'];
  facilityCultivatorId: Scalars['String'];
  productSurveyId: Scalars['Int'];
  /** Unit Weight(gram) */
  unitWeight: Scalars['Int'];
}

export interface ICreateInviteInput {
  /** Required in type employee */
  employeeId?: InputMaybe<Scalars['String']>;
  isSendSms?: InputMaybe<Scalars['Boolean']>;
  /** name */
  name: Scalars['String'];
  /** Phone number */
  phone: Scalars['String'];
  type: InviteTypeEnum;
}

/** Create Order */
export interface ICreateOrderInput {
  /** address */
  address?: InputMaybe<Scalars['String']>;
  cartId: Scalars['Int'];
  /** city */
  city?: InputMaybe<Scalars['String']>;
  /** comments */
  comments?: InputMaybe<Scalars['String']>;
  contactPersonId: Scalars['String'];
  paymentType: PaymentTypeEnum;
  /** Phone */
  phone?: InputMaybe<Scalars['String']>;
  shippingType: ShippingTypeEnum;
  /** Zip */
  zip?: InputMaybe<Scalars['Int']>;
}

/** Create Subcompany */
export interface ICreateSubcompanyInput {
  companyId: Scalars['Int'];
  facilityBuyerId: Scalars['String'];
  /** Reward quantity (lb) */
  quantity: Scalars['Float'];
}

export interface ICreateSurveyInput {
  /** subcompany */
  subcompanyId: Scalars['Int'];
}

/** Dates */
export interface IDates {
  __typename?: 'Dates';
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
}

/** User sign up */
export interface IDeprecatedSyncFacilityInput {
  /** User licenseNumber Facility */
  licenseNumberFacility: Scalars['String'];
}

export enum DiamondstandardStatusEnum {
  CaratTransferCompleted = 'CARAT_TRANSFER_COMPLETED',
  CaratTransferFailed = 'CARAT_TRANSFER_FAILED',
  CaratTransferInitiated = 'CARAT_TRANSFER_INITIATED',
  InvalidRequest = 'INVALID_REQUEST',
  Quote = 'QUOTE',
  RequestCancelled = 'REQUEST_CANCELLED',
  RequestInitiated = 'REQUEST_INITIATED',
  RequestProcessed = 'REQUEST_PROCESSED',
  RequestRejected = 'REQUEST_REJECTED'
}

export enum ErrorMsgEnum {
  ActiveOrderExist = 'ActiveOrderExist',
  CartEmpty = 'CartEmpty',
  CartNotExist = 'CartNotExist',
  ChatUsersWrong = 'ChatUsersWrong',
  CodeNoExpired = 'CodeNoExpired',
  CodeWrong = 'CodeWrong',
  CompanyDone = 'CompanyDone',
  CompanyNotExist = 'CompanyNotExist',
  CompanyProductOutOfStock = 'CompanyProductOutOfStock',
  CompanyStatusWrong = 'CompanyStatusWrong',
  ContactNotExist = 'ContactNotExist',
  ContactPersonWrong = 'ContactPersonWrong',
  ContextNotExist = 'ContextNotExist',
  EmailAlreadyExist = 'EmailAlreadyExist',
  EmailOrKeyAlreadyExist = 'EmailOrKeyAlreadyExist',
  EmailOrLicenseNumberWrong = 'EmailOrLicenseNumberWrong',
  EmployeeAlreadyExist = 'EmployeeAlreadyExist',
  EmployeeNotExist = 'EmployeeNotExist',
  EmployeeNotExistInMetrc = 'EmployeeNotExistInMetrc',
  EmployeesNotExistInMetrc = 'EmployeesNotExistInMetrc',
  EntityLoginPasswordWrong = 'EntityLoginPasswordWrong',
  EntityNotExist = 'EntityNotExist',
  FacilitiesNotExistInDb = 'FacilitiesNotExistInDB',
  FacilitiesNotExistInMetrc = 'FacilitiesNotExistInMetrc',
  FacilitiesOrUserKeyNotExistInMetrc = 'FacilitiesOrUserKeyNotExistInMetrc',
  FacilityDue = 'FacilityDue',
  FacilityNotAccessGrowPlants = 'FacilityNotAccessGrowPlants',
  FacilityNotAccessRetail = 'FacilityNotAccessRetail',
  FacilityNotExist = 'FacilityNotExist',
  FacilityNotRelation = 'FacilityNotRelation',
  FacilityOwnerWrong = 'FacilityOwnerWrong',
  FacilityWrong = 'FacilityWrong',
  FileIsWrong = 'FileIsWrong',
  FileWrong = 'FileWrong',
  IncorrectEmployeeLicenseNumber = 'IncorrectEmployeeLicenseNumber',
  InsufficientBalance = 'InsufficientBalance',
  InvalidDate = 'InvalidDate',
  InvalidToken = 'InvalidToken',
  InviteActivated = 'InviteActivated',
  InviteAlreadyExist = 'InviteAlreadyExist',
  InviteCodeWrong = 'InviteCodeWrong',
  InviteFacilityActivated = 'InviteFacilityActivated',
  InviteNotExist = 'InviteNotExist',
  InviteTypeWrong = 'InviteTypeWrong',
  MetrcApiKeyNotExist = 'MetrcApiKeyNotExist',
  MetrcLicenseNumberEmployeeNotExist = 'MetrcLicenseNumberEmployeeNotExist',
  MetrcLicenseNumberFacilityNotExist = 'MetrcLicenseNumberFacilityNotExist',
  MetrcLicenseNumberNotExist = 'MetrcLicenseNumberNotExist',
  NetBalanceWrong = 'NetBalanceWrong',
  NoAccess = 'NoAccess',
  NoPublicAddress = 'NoPublicAddress',
  NotEnoughTokens = 'NotEnoughTokens',
  OrderCodeWrong = 'OrderCodeWrong',
  OrderExist = 'OrderExist',
  OrderNotExist = 'OrderNotExist',
  OrderNotPaid = 'OrderNotPaid',
  OrderPackageWrong = 'OrderPackageWrong',
  OrderPaid = 'OrderPaid',
  OrderPaymentError = 'OrderPaymentError',
  OrderShippingTypeWrong = 'OrderShippingTypeWrong',
  OrderStatusWrong = 'OrderStatusWrong',
  OrderTotalWrong21 = 'OrderTotalWrong21',
  PackageWrong = 'PackageWrong',
  PayloadWrong = 'PayloadWrong',
  PickupPersonWrong = 'PickupPersonWrong',
  ProductListedWrong = 'ProductListedWrong',
  ProductNotContainedInCompany = 'ProductNotContainedInCompany',
  ProductNotExist = 'ProductNotExist',
  ProductOutOfStock = 'ProductOutOfStock',
  ProductQuantityIsNotEnough = 'ProductQuantityIsNotEnough',
  ProductQuantityStockMin = 'ProductQuantityStockMin',
  ProductQuantityWrong = 'ProductQuantityWrong',
  ProductSurveyNotExist = 'ProductSurveyNotExist',
  RecaptchaError = 'RecaptchaError',
  RequestHasNotExpired = 'RequestHasNotExpired',
  RequestNotExist = 'RequestNotExist',
  RequestStatusWrong = 'RequestStatusWrong',
  SmsSendError = 'SMSSendError',
  StorageNotFound = 'StorageNotFound',
  SubcompanyNotExist = 'SubcompanyNotExist',
  SurveyAlreadyActivated = 'SurveyAlreadyActivated',
  SurveyAlreadyBuyerConfirmed = 'SurveyAlreadyBuyerConfirmed',
  SurveyAlreadyExist = 'SurveyAlreadyExist',
  SurveyBuyerNotConfirmed = 'SurveyBuyerNotConfirmed',
  SurveyBuyerWrong = 'SurveyBuyerWrong',
  SurveyDone = 'SurveyDone',
  SurveyNotActivated = 'SurveyNotActivated',
  SurveyNotExist = 'SurveyNotExist',
  SurveyStatusWrong = 'SurveyStatusWrong',
  SurveyUserAlreadyExist = 'SurveyUserAlreadyExist',
  SwapError = 'SwapError',
  TokenInfoWrong = 'TokenInfoWrong',
  TransactionProcessing = 'TransactionProcessing',
  UserAlreadyExist = 'UserAlreadyExist',
  UserBlocked = 'UserBlocked',
  UserIssueAlreadyExist = 'UserIssueAlreadyExist',
  UserNoPassword = 'UserNoPassword',
  UserNotAdmin = 'UserNotAdmin',
  UserNotExist = 'UserNotExist',
  UserNotOwner = 'UserNotOwner',
  UserOrCodeWrong = 'UserOrCodeWrong',
  WalletNotContainsToken = 'WalletNotContainsToken',
  WithdrawError = 'WithdrawError',
  WithdrawMin25 = 'WithdrawMIN25'
}

export enum ExperienceEnum {
  EuphoricCreative = 'EuphoricCreative',
  FugginStupid = 'FugginStupid',
  HeadyMental = 'HeadyMental',
  RelaxingPainrelieving = 'RelaxingPainrelieving'
}

/** Facilities */
export interface IFacilitiesDto {
  __typename?: 'FacilitiesDTO';
  items: Array<IFacilityModel>;
  meta: IPaginateModel;
}

/** Facility Balance */
export interface IFacilityBalanceDto {
  __typename?: 'FacilityBalanceDTO';
  balanceBlocked: IBalanceDto;
  balanceBuy: IBalanceDto;
  balanceWallet: IBalanceDto;
  rate?: Maybe<Scalars['Float']>;
  token: Scalars['String'];
}

/** Model's facility */
export interface IFacilityModel {
  __typename?: 'FacilityModel';
  /** Address  */
  address: IAddressData;
  /** Alias's facility */
  alias?: Maybe<Scalars['String']>;
  asset?: Maybe<IAssetModel>;
  /** balance */
  balance: Scalars['Float'];
  /** balance Processing withdraw */
  balanceProcessingWithdraw: Scalars['Float'];
  /** Campaign Email */
  campaignEmail?: Maybe<Scalars['String']>;
  /** CredentialedDate's facility */
  credentialedDate: Scalars['String'];
  /** Dates create/update */
  dates: IDates;
  /** Description */
  description?: Maybe<Scalars['String']>;
  /** DisplayName's facility */
  displayName: Scalars['String'];
  /** Email facility */
  email?: Maybe<Scalars['String']>;
  facilityBuyerRelations?: Maybe<Array<IFacilityToFacilityModel>>;
  facilityCultivatorRelations?: Maybe<Array<IFacilityToFacilityModel>>;
  /** facilityType data */
  facilityType?: Maybe<IFacilityType>;
  /** HireDate flag facilityType */
  hireDate?: Maybe<Scalars['String']>;
  /** LicenseNumber */
  id: Scalars['String'];
  index: Scalars['Int'];
  isChatMessage: Scalars['Boolean'];
  /** IsManager flag facilityType */
  isManager: Scalars['Boolean'];
  isOnline: Scalars['Boolean'];
  /** IsOwner flag facilityType */
  isOwner: Scalars['Boolean'];
  /** License data */
  license: ILicense;
  /** User Key Metrc */
  metrcApiKey: Scalars['String'];
  /** Name's facility */
  name: Scalars['String'];
  /** Owner */
  owner?: Maybe<IUserModel>;
  /** Hedera phone number */
  phoneNumber?: Maybe<Scalars['String']>;
  /** Hedera public address */
  publicAddress?: Maybe<Scalars['String']>;
  /** Quantity Active Employee */
  quantityActiveEmployee: Scalars['Float'];
  /** all quantity employee */
  quantityEmployee: Scalars['Float'];
  /** Role user: buyer|cultivator */
  role: FacilityRoleEnum;
  /** Socials */
  socials: ISocial;
  transactionsFrom?: Maybe<Array<ITransactionModel>>;
  transactionsTo?: Maybe<Array<ITransactionModel>>;
  userContact?: Maybe<IUserModel>;
  users: Array<IUserModel>;
}

export enum FacilityRoleEnum {
  Buyer = 'buyer',
  BuyerAndCultivator = 'buyerAndCultivator',
  Cultivator = 'cultivator'
}

export interface IFacilityToFacilityModel {
  __typename?: 'FacilityToFacilityModel';
  /** avg purchase */
  avgPurchase: Scalars['Float'];
  /** Chat sid (twilio) */
  chatSid?: Maybe<Scalars['String']>;
  /** Date Message Buyer */
  dateMessageBuyer?: Maybe<Scalars['DateTime']>;
  /** Date Message Cultivator */
  dateMessageCultivator?: Maybe<Scalars['DateTime']>;
  /** Dates create/update */
  dates: IDates;
  /** due balance */
  dueBalance: Scalars['Float'];
  /** Buyer */
  facilityBuyer: IFacilityModel;
  /** Cultivator */
  facilityCultivator: IFacilityModel;
  id: Scalars['Int'];
  isMessageBuyer: Scalars['Boolean'];
  isMessageCultivator: Scalars['Boolean'];
  /** Net activated? */
  isNetActivated: Scalars['Boolean'];
  /** Last order date */
  lastOrderDate?: Maybe<Scalars['DateTime']>;
  /** net balance */
  netBalance: Scalars['Float'];
  /** net days */
  netDays: Scalars['Float'];
  /** order total spend */
  orderTotalSpend: Scalars['Float'];
  /** total orders */
  totalOrders: Scalars['Float'];
}

/** FacilityType */
export interface IFacilityType {
  __typename?: 'FacilityType';
  /** AdvancedSales flag facilityType */
  advancedSales: Scalars['Boolean'];
  /** CanAdjustSourcePackagesWithPartials flag facilityType */
  canAdjustSourcePackagesWithPartials: Scalars['Boolean'];
  /** CanAssignLocationsToPackages flag facilityType */
  canAssignLocationsToPackages: Scalars['Boolean'];
  /** CanClonePlantBatches flag facilityType */
  canClonePlantBatches: Scalars['Boolean'];
  /** CanCreateDerivedPackages flag facilityType */
  canCreateDerivedPackages: Scalars['Boolean'];
  /** CanCreateImmaturePlantPackagesFromPlants flag facilityType */
  canCreateImmaturePlantPackagesFromPlants: Scalars['Boolean'];
  /** CanCreateOpeningBalancePackages flag facilityType */
  canCreateOpeningBalancePackages: Scalars['Boolean'];
  /** CanCreateOpeningBalancePlantBatches flag facilityType */
  canCreateOpeningBalancePlantBatches: Scalars['Boolean'];
  /** CanCreatePartialPackages flag facilityType */
  canCreatePartialPackages: Scalars['Boolean'];
  /** CanCreateProcessValidationPackages flag facilityType */
  canCreateProcessValidationPackages: Scalars['Boolean'];
  /** CanCreateTradeSamplePackages flag facilityType */
  canCreateTradeSamplePackages: Scalars['Boolean'];
  /** CanDeliverSalesToConsumers flag facilityType */
  canDeliverSalesToConsumers: Scalars['Boolean'];
  /** CanDeliverSalesToPatients flag facilityType */
  canDeliverSalesToPatients: Scalars['Boolean'];
  /** CanDestroyProduct flag facilityType */
  canDestroyProduct: Scalars['Boolean'];
  /** CanDonatePackages flag facilityType */
  canDonatePackages: Scalars['Boolean'];
  /** CanGrowPlants flag facilityType */
  canGrowPlants: Scalars['Boolean'];
  /** CanHaveMemberPatients flag facilityType */
  canHaveMemberPatients: Scalars['Boolean'];
  /** CanInfuseProducts flag facilityType */
  canInfuseProducts: Scalars['Boolean'];
  /** CanPackageVegetativePlants flag facilityType */
  canPackageVegetativePlants: Scalars['Boolean'];
  /** CanPackageWaste flag facilityType */
  canPackageWaste: Scalars['Boolean'];
  /** CanRecordProcessingJobs flag facilityType */
  canRecordProcessingJobs: Scalars['Boolean'];
  /** CanRecordProductForDestruction flag facilityType */
  canRecordProductForDestruction: Scalars['Boolean'];
  /** CanRemediatePackagesWithFailedLabResults flag facilityType */
  canRemediatePackagesWithFailedLabResults: Scalars['Boolean'];
  /** CanReportAdulteration flag facilityType */
  canReportAdulteration: Scalars['Boolean'];
  /** CanReportHarvestSchedules flag facilityType */
  canReportHarvestSchedules: Scalars['Boolean'];
  /** CanReportOperationalExceptions flag facilityType */
  canReportOperationalExceptions: Scalars['Boolean'];
  /** CanReportPatientCheckIns flag facilityType */
  canReportPatientCheckIns: Scalars['Boolean'];
  /** CanReportPatientsAdverseResponses flag facilityType */
  canReportPatientsAdverseResponses: Scalars['Boolean'];
  /** CanReportStrainProperties flag facilityType */
  canReportStrainProperties: Scalars['Boolean'];
  /** CanRequestProductRemediation flag facilityType */
  canRequestProductRemediation: Scalars['Boolean'];
  /** CanRequireHarvestSampleLabTestBatches flag facilityType */
  canRequireHarvestSampleLabTestBatches: Scalars['Boolean'];
  /** CanRequirePackageSampleLabTestBatches flag facilityType */
  canRequirePackageSampleLabTestBatches: Scalars['Boolean'];
  /** CanSellFromPackagesOnTrip flag facilityType */
  canSellFromPackagesOnTrip: Scalars['Boolean'];
  /** CanSellToCaregivers flag facilityType */
  canSellToCaregivers: Scalars['Boolean'];
  /** CanSellToConsumers flag facilityType */
  canSellToConsumers: Scalars['Boolean'];
  /** CanSellToExternalPatients flag facilityType */
  canSellToExternalPatients: Scalars['Boolean'];
  /** CanSellToPatients flag facilityType */
  canSellToPatients: Scalars['Boolean'];
  /** CanSpecifyPatientSalesLimitExemption flag facilityType */
  canSpecifyPatientSalesLimitExemption: Scalars['Boolean'];
  /** CanSubmitHarvestsForTesting flag facilityType */
  canSubmitHarvestsForTesting: Scalars['Boolean'];
  /** CanSubmitPackagesForTesting flag facilityType */
  canSubmitPackagesForTesting: Scalars['Boolean'];
  /** CanTagPlantBatches flag facilityType */
  canTagPlantBatches: Scalars['Boolean'];
  /** CanTakeHarvestsOnTrip flag facilityType */
  canTakeHarvestsOnTrip: Scalars['Boolean'];
  /** CanTakePackagesOnTrip flag facilityType */
  canTakePackagesOnTrip: Scalars['Boolean'];
  /** CanTakePlantBatchesOnTrip flag facilityType */
  canTakePlantBatchesOnTrip: Scalars['Boolean'];
  /** CanTakePlantsOnTrip flag facilityType */
  canTakePlantsOnTrip: Scalars['Boolean'];
  /** CanTestPackages flag facilityType */
  canTestPackages: Scalars['Boolean'];
  /** CanTrackVegetativePlants flag facilityType */
  canTrackVegetativePlants: Scalars['Boolean'];
  /** CanTransferFromExternalFacilities flag facilityType */
  canTransferFromExternalFacilities: Scalars['Boolean'];
  /** CanUpdateLocationsOnPackages flag facilityType */
  canUpdateLocationsOnPackages: Scalars['Boolean'];
  /** CanUpdatePlantStrains flag facilityType */
  canUpdatePlantStrains: Scalars['Boolean'];
  /** IsHemp flag facilityType */
  isHemp: Scalars['Boolean'];
  /** IsMedical flag facilityType */
  isMedical: Scalars['Boolean'];
  /** IsRetail flag facilityType */
  isRetail: Scalars['Boolean'];
  /** IsSalesDeliveryHub flag facilityType */
  isSalesDeliveryHub: Scalars['Boolean'];
  /** PackagesRequirePatientAffiliation flag facilityType */
  packagesRequirePatientAffiliation: Scalars['Boolean'];
  /** PlantBatchesCanContainMotherPlants flag facilityType */
  plantBatchesCanContainMotherPlants: Scalars['Boolean'];
  /** PlantsRequirePatientAffiliation flag facilityType */
  plantsRequirePatientAffiliation: Scalars['Boolean'];
  /** RestrictHarvestPlantRestoreTimeHours flag facilityType */
  restrictHarvestPlantRestoreTimeHours?: Maybe<Scalars['Float']>;
  /** RestrictPlantBatchAdjustmentTimeHours flag facilityType */
  restrictPlantBatchAdjustmentTimeHours?: Maybe<Scalars['Float']>;
  /** RestrictWholesalePriceEditDays flag facilityType */
  restrictWholesalePriceEditDays?: Maybe<Scalars['Float']>;
  /** RetailerDelivery flag facilityType */
  retailerDelivery: Scalars['Boolean'];
  /** RetailerDeliveryAllowDonations flag facilityType */
  retailerDeliveryAllowDonations: Scalars['Boolean'];
  /** RetailerDeliveryAllowPartialPackages flag facilityType */
  retailerDeliveryAllowPartialPackages: Scalars['Boolean'];
  /** RetailerDeliveryAllowTradeSamples flag facilityType */
  retailerDeliveryAllowTradeSamples: Scalars['Boolean'];
  /** RetailerDeliveryRequirePrice flag facilityType */
  retailerDeliveryRequirePrice: Scalars['Boolean'];
  /** SalesDeliveryAllowAddress flag facilityType */
  salesDeliveryAllowAddress: Scalars['Boolean'];
  /** SalesDeliveryAllowCity flag facilityType */
  salesDeliveryAllowCity: Scalars['Boolean'];
  /** SalesDeliveryAllowCounty flag facilityType */
  salesDeliveryAllowCounty: Scalars['Boolean'];
  /** SalesDeliveryAllowPlannedRoute flag facilityType */
  salesDeliveryAllowPlannedRoute: Scalars['Boolean'];
  /** SalesDeliveryAllowState flag facilityType */
  salesDeliveryAllowState: Scalars['Boolean'];
  /** SalesDeliveryAllowZip flag facilityType */
  salesDeliveryAllowZip: Scalars['Boolean'];
  /** SalesDeliveryRequireConsumerId flag facilityType */
  salesDeliveryRequireConsumerId: Scalars['Boolean'];
  /** SalesDeliveryRequirePatientNumber flag facilityType */
  salesDeliveryRequirePatientNumber: Scalars['Boolean'];
  /** SalesDeliveryRequireRecipientName flag facilityType */
  salesDeliveryRequireRecipientName: Scalars['Boolean'];
  /** SalesRequireCaregiverNumber flag facilityType */
  salesRequireCaregiverNumber: Scalars['Boolean'];
  /** SalesRequireCaregiverPatientNumber flag facilityType */
  salesRequireCaregiverPatientNumber: Scalars['Boolean'];
  /** SalesRequireExternalPatientIdentificationMethod flag facilityType */
  salesRequireExternalPatientIdentificationMethod: Scalars['Boolean'];
  /** SalesRequireExternalPatientNumber flag facilityType */
  salesRequireExternalPatientNumber: Scalars['Boolean'];
  /** SalesRequirePatientNumber flag facilityType */
  salesRequirePatientNumber: Scalars['Boolean'];
  /** TestsRequireLabSample flag facilityType */
  testsRequireLabSample: Scalars['Boolean'];
  /** TotalMemberPatientsAllowed flag facilityType */
  totalMemberPatientsAllowed?: Maybe<Scalars['Float']>;
}

/** Fee data */
export interface IFeeData {
  __typename?: 'FeeData';
  /** fee buyer */
  feeBuyer: Scalars['Float'];
  /** fee cultivator */
  feeCultivator: Scalars['Float'];
}

export interface IFilterDto {
  columnName: Scalars['String'];
  operation: FilterOperationEnum;
  type: FilterFieldTypeEnum;
  value: Array<Scalars['String']>;
}

export enum FilterFieldTypeEnum {
  Null = 'NULL',
  Boolean = 'boolean',
  Date = 'date',
  DateRange = 'dateRange',
  Number = 'number',
  NumberRange = 'numberRange',
  Text = 'text'
}

export interface IFilterGetDto {
  /** parameters for filtering */
  filters?: InputMaybe<Array<IFilterDto>>;
  /** parameters for pagination */
  paginate?: InputMaybe<IPaginateDto>;
  /** parameters for sort */
  sorts?: InputMaybe<Array<ISortDto>>;
}

export enum FilterOperationEnum {
  Contains = 'contains',
  ContainsInArray = 'containsInArray',
  Equal = 'equal',
  LessThan = 'lessThan',
  LessThanOrEqual = 'lessThanOrEqual',
  MoreThan = 'moreThan',
  MoreThanOrEqual = 'moreThanOrEqual',
  NotEqual = 'notEqual'
}

export interface IFilterOrdersInput {
  /** parameters for filtering */
  filters?: InputMaybe<Array<IFilterDto>>;
  isCultivator: Scalars['Boolean'];
  /** parameters for pagination */
  paginate?: InputMaybe<IPaginateDto>;
  /** parameters for sort */
  sorts?: InputMaybe<Array<ISortDto>>;
}

export interface IGenerateCodeSmsInput {
  phone: Scalars['String'];
}

export interface IGetIdDto {
  /** ID */
  id?: InputMaybe<Scalars['Int']>;
}

export interface IGetIdStringDto {
  /** ID */
  id: Scalars['String'];
}

export enum IntoxicationEnum {
  Meh = 'Meh',
  Stoned = 'Stoned',
  Wrecked = 'Wrecked'
}

/** Invitations */
export interface IInvitationsDto {
  __typename?: 'InvitationsDTO';
  items: Array<IInviteModel>;
  meta: IPaginateModel;
}

export interface IInviteByCodeInput {
  code: Scalars['String'];
}

export interface IInviteModel {
  __typename?: 'InviteModel';
  code?: Maybe<Scalars['String']>;
  /** Dates create/update */
  dates: IDates;
  employee?: Maybe<IUserModel>;
  facility?: Maybe<IFacilityModel>;
  id: Scalars['Int'];
  /** name */
  name: Scalars['String'];
  owner: IUserModel;
  /** Phone number */
  phone: Scalars['String'];
  relationFacility?: Maybe<IFacilityModel>;
  /** Invite Status */
  status: InviteStatusEnum;
  type: InviteTypeEnum;
}

export enum InviteStatusEnum {
  Approved = 'approved',
  Processing = 'processing',
  Rejected = 'rejected'
}

export enum InviteTypeEnum {
  Buyer = 'buyer',
  Employee = 'employee'
}

/** Model's item */
export interface IItemModel {
  __typename?: 'ItemModel';
  /** Administration method */
  administrationMethod?: Maybe<Scalars['String']>;
  /** Approval status */
  approvalStatus?: Maybe<Scalars['String']>;
  /** Approval status date time */
  approvalStatusDateTime?: Maybe<Scalars['String']>;
  /**  brand name */
  brandName?: Maybe<Scalars['String']>;
  /** Default lab testing state */
  defaultLabTestingState?: Maybe<Scalars['String']>;
  /** Description */
  description?: Maybe<Scalars['String']>;
  /** Id product */
  id: Scalars['Int'];
  /** Is expiration date required */
  isExpirationDateRequired: Scalars['Boolean'];
  /** Is sell by date required */
  isSellByDateRequired: Scalars['Boolean'];
  /** is use by date required */
  isUseByDateRequired: Scalars['Boolean'];
  /** Is used */
  isUsed?: Maybe<Scalars['Boolean']>;
  /** Label images */
  labelImages?: Maybe<Scalars['String']>;
  /** Product name */
  name: Scalars['String'];
  /** Number of doses */
  numberOfDoses?: Maybe<Scalars['Float']>;
  /** Packaging images */
  packagingImages?: Maybe<Scalars['String']>;
  /** Product category name */
  productCategoryName: Scalars['String'];
  /** Product category type */
  productCategoryType: Scalars['String'];
  /** Product images */
  productImages?: Maybe<Scalars['String']>;
  /** Public ingredients */
  publicIngredients?: Maybe<Scalars['String']>;
  /** Default lab testing state */
  quantityType?: Maybe<UnitsOfMeasureQuantityTypeEnum>;
  /** Serving size */
  servingSize?: Maybe<Scalars['String']>;
  /** Strain ID */
  strainId?: Maybe<Scalars['Float']>;
  /** Strain name */
  strainName?: Maybe<Scalars['String']>;
  /** Supply duration days */
  supplyDurationDays?: Maybe<Scalars['Float']>;
  /** Unit CBD content */
  unitCbdContent?: Maybe<Scalars['Float']>;
  /** Unit CBD content dose */
  unitCbdContentDose?: Maybe<Scalars['Float']>;
  /** Unit CBD content dose unit of measure name */
  unitCbdContentDoseUnitOfMeasureName?: Maybe<UnitsOfMeasureNameEnum>;
  /** Unit CBD content unit of measure name */
  unitCbdContentUnitOfMeasureName?: Maybe<UnitsOfMeasureNameEnum>;
  /** Unit CBD percent */
  unitCbdPercent?: Maybe<Scalars['Float']>;
  /** Unit of measure name */
  unitOfMeasureName?: Maybe<UnitsOfMeasureNameEnum>;
  /** Unit quantity */
  unitQuantity?: Maybe<Scalars['Float']>;
  /** Unit quantity unit of measure name */
  unitQuantityUnitOfMeasureName?: Maybe<UnitsOfMeasureNameEnum>;
  /** Unit THC content */
  unitThcContent?: Maybe<Scalars['Float']>;
  /** Unit THC content dose */
  unitThcContentDose?: Maybe<Scalars['Float']>;
  /** Unit THC content dose unit of measure name */
  unitThcContentDoseUnitOfMeasureName?: Maybe<UnitsOfMeasureNameEnum>;
  /** Unit THC content unit of measure name */
  unitThcContentUnitOfMeasureName?: Maybe<UnitsOfMeasureNameEnum>;
  /** Unit THC percent */
  unitThcPercent?: Maybe<Scalars['Float']>;
  /** Unit volume */
  unitVolume?: Maybe<Scalars['Float']>;
  /** Unit volume unit of measure name */
  unitVolumeUnitOfMeasureName?: Maybe<UnitsOfMeasureNameEnum>;
  /** Unit weight */
  unitWeight?: Maybe<Scalars['Float']>;
  /** Unit weight unit of measure name */
  unitWeightUnitOfMeasureName?: Maybe<UnitsOfMeasureNameEnum>;
}

export enum LabTestingEnum {
  AwaitingConfirmation = 'AwaitingConfirmation',
  NotRequired = 'NotRequired',
  NotSubmitted = 'NotSubmitted',
  ProcessValidated = 'ProcessValidated',
  Remediated = 'Remediated',
  RetestFailed = 'RetestFailed',
  RetestPassed = 'RetestPassed',
  SelectedForRandomTesting = 'SelectedForRandomTesting',
  SubmittedForTesting = 'SubmittedForTesting',
  TestFailed = 'TestFailed',
  TestPassed = 'TestPassed',
  TestingInProgress = 'TestingInProgress'
}

/** License */
export interface ILicense {
  __typename?: 'License';
  isLicenseActive: Scalars['Boolean'];
  /** LicenseEndDate's facility */
  licenseEndDate?: Maybe<Scalars['String']>;
  /** LicenseNumber's facility */
  licenseNumber: Scalars['String'];
  /** LicenseStartDate's facility */
  licenseStartDate?: Maybe<Scalars['String']>;
  /** LicenseType's facility */
  licenseType: Scalars['String'];
}

export interface ILoginSmsInput {
  code: Scalars['Int'];
  phoneNumber: Scalars['String'];
}

export interface IMutation {
  __typename?: 'Mutation';
  allowFacilityContract: Scalars['Boolean'];
  /** @protected - approve request */
  approveRequest: IRequestModel;
  /** @protected - cancel order buyer */
  cancelOrderBuyer: IOrderModel;
  /** @protected - Cart Viewed Track */
  cartViewedTrack: Scalars['Boolean'];
  /** @protected - Checkout Started Track */
  checkoutStartedTrack: Scalars['Boolean'];
  /** @private - confirm survey buyer */
  confirmSurveyBuyer: ISurveyModel;
  createAdmin: Scalars['Boolean'];
  /** @protected - create Chat Facility To Facility */
  createChatFacilityToFacility: Scalars['String'];
  /** Company creation */
  createCompanyAdmin: ICompanyModel;
  /** @protected - create invite */
  createInvite: IInviteModel;
  /** @protected - Create nft */
  createNFTAdmin: Scalars['String'];
  /** @protected - Create order */
  createOrder: IOrderModel;
  /** @protected - Create Order Ipfs admin */
  createOrderIpfsAdmin: Scalars['String'];
  /** Subcompany creation */
  createSubcompanyAdmin: ISubcompanyModel;
  /** Subcompany creation */
  createSubcompanyCultivator: ISubcompanyModel;
  /** @public - create survey */
  createSurvey: ISurveyModel;
  /** @public - delete admin */
  deleteAdmin: Scalars['Boolean'];
  /** @protected - Delete cart */
  deleteCart: Array<ICartModel>;
  /** @protected - delete notification */
  deleteNotification: Scalars['Boolean'];
  /** Subcompany deletion */
  deleteSubcompanyAdmin: Scalars['Boolean'];
  /** Subcompany deletion */
  deleteSubcompanyCultivator: Scalars['Boolean'];
  /**
   * @protected - Add Products
   * @deprecated Temporary method
   */
  deprecatedAddProducts: Scalars['Boolean'];
  deprecatedCreateHederaWallets: Scalars['Boolean'];
  /**
   * @public - Remove User's profile
   * @deprecated Temporary method
   */
  deprecatedRemoveUser: Scalars['Boolean'];
  /**
   * @public - Remove User's profile and facility
   * @deprecated Temporary method
   */
  deprecatedRemoveUserAndFacility: Scalars['Boolean'];
  /** @public - deprecatedSyncFacility */
  deprecatedSyncFacility: Scalars['Boolean'];
  /**
   * @protected - withdrawCaratToFiat
   * @deprecated test query
   */
  deprecatedWithdrawCaratToFiat: Scalars['Boolean'];
  /**
   * @protected - Mint nft
   * @deprecated Temporary method
   */
  deprecationMintNFTAdmin: Scalars['Float'];
  /**
   * @protected - Transfer nft
   * @deprecated Temporary method
   */
  deprecationTransferNFTAdmin: Scalars['Boolean'];
  /** @public - forgot password */
  forgotPassword: Scalars['Boolean'];
  generateCodeSMS: Scalars['Boolean'];
  /** Facility token generation */
  generateToken: Scalars['String'];
  /** @protected - Payment order */
  getPaymentOrderLink: Scalars['String'];
  /** @public - login */
  login: IUserTokenDto;
  /** @public - login client, buyer, cultivator, admin */
  loginSMS: IUserTokenDto;
  /** @protected - Logout client */
  logoutClient: Scalars['Boolean'];
  /** @protected - migrate facility to customerIo */
  migrateFacilityToCustomerIo: Scalars['Boolean'];
  /** @protected - Mint nft client money */
  mintNFTClientMoney: Scalars['Boolean'];
  /** @protected - Product Clicked Track */
  productClickedTrack: Scalars['Boolean'];
  /** @protected - Product Viewed Track */
  productViewedTrack: Scalars['Boolean'];
  /** @protected - open notification */
  readNotification: INotificationModel;
  /** @public - changing your password using code recovery */
  recoveryPassword: Scalars['Boolean'];
  /** @public - reject invite */
  rejectInvite: IInviteModel;
  /** @protected - reject request */
  rejectRequest: IRequestModel;
  /** @private - reject survey buyer */
  rejectSurveyBuyer: ISurveyModel;
  /** @protected - remove relation cultivator to buyer */
  removeRelationCultivatorToBuyer: Scalars['Boolean'];
  /** @public - request join */
  requestNewFacility: Scalars['Boolean'];
  /** @public - resend invite */
  resendInvite: Scalars['Boolean'];
  /** @public - send Contact Us */
  sendContactUs: Scalars['Boolean'];
  /** @public - Sign up buyer */
  signUpBuyer: IUserTokenDto;
  /** @public - Sign up client */
  signUpClient: IUserTokenDto;
  /** @public - Sign up cultivator */
  signUpCultivator: IUserTokenDto;
  signUpEmployee: IUserTokenDto;
  /** @public - submit survey */
  submitSurvey: ISurveyModel;
  /** @private - survey package confirmed */
  surveyPackageConfirmed: ISurveyModel;
  /** @protected - sync products */
  syncProducts: Scalars['Boolean'];
  /** @protected - Update Admin Profile */
  updateAdminProfile: IUserModel;
  /** @protected - Updating the buyer by cultivator */
  updateBuyerByCultivator: IFacilityModel;
  /** @protected - Update cart item */
  updateCartItem: Array<ICartModel>;
  /** @protected - Input data for update client profile */
  updateClient: IUserModel;
  /** Company update */
  updateCompanyAdmin: ICompanyModel;
  /** Company update (by user cultivator) */
  updateCompanyCultivator: ICompanyModel;
  /** @protected - update configuration */
  updateConfiguration: Scalars['JSONObject'];
  /** @protected - Update profile facility */
  updateFacility: IFacilityModel;
  /** @protected - Update order package */
  updateOrderPackage: IOrderProductModel;
  /** @protected - Update order */
  updateOrderStatus: IOrderModel;
  /** @protected - Update product */
  updateProduct: IProductModel;
  /** @protected - update request */
  updateRequest: IRequestModel;
  /** Subcompany update */
  updateSubcompanyAdmin: ISubcompanyModel;
  /** Subcompany update */
  updateSubcompanyCultivator: ISubcompanyModel;
  /** Facility status chat update */
  updateTimeChat: IFacilityToFacilityModel;
  /** @protected - Input data for update user profile */
  updateUser: IUserModel;
  /** @protected - update user context */
  updateUserContext: IUserModel;
}


export type IMutationApproveRequestArgs = {
  payload: IGetIdDto;
};


export type IMutationCancelOrderBuyerArgs = {
  payload: IGetIdDto;
};


export type IMutationCheckoutStartedTrackArgs = {
  cartId: Scalars['Float'];
};


export type IMutationConfirmSurveyBuyerArgs = {
  payload: IGetIdDto;
};


export type IMutationCreateAdminArgs = {
  payload: ICreateAdminInput;
};


export type IMutationCreateChatFacilityToFacilityArgs = {
  payload: ICreateChatFacilityToFacilityInput;
};


export type IMutationCreateCompanyAdminArgs = {
  payload: ICreateCompanyInput;
};


export type IMutationCreateInviteArgs = {
  payload: ICreateInviteInput;
};


export type IMutationCreateNftAdminArgs = {
  name: Scalars['String'];
  symbol: Scalars['String'];
};


export type IMutationCreateOrderArgs = {
  payload: ICreateOrderInput;
};


export type IMutationCreateOrderIpfsAdminArgs = {
  orderId: Scalars['Float'];
};


export type IMutationCreateSubcompanyAdminArgs = {
  payload: ICreateSubcompanyInput;
};


export type IMutationCreateSubcompanyCultivatorArgs = {
  payload: ICreateSubcompanyInput;
};


export type IMutationCreateSurveyArgs = {
  payload: ICreateSurveyInput;
};


export type IMutationDeleteAdminArgs = {
  payload: IGetIdStringDto;
};


export type IMutationDeleteCartArgs = {
  payload: IGetIdDto;
};


export type IMutationDeleteNotificationArgs = {
  payload: IGetIdDto;
};


export type IMutationDeleteSubcompanyAdminArgs = {
  payload: IGetIdDto;
};


export type IMutationDeleteSubcompanyCultivatorArgs = {
  payload: IGetIdDto;
};


export type IMutationDeprecatedAddProductsArgs = {
  payload: IGetIdDto;
};


export type IMutationDeprecatedRemoveUserArgs = {
  id: Scalars['String'];
};


export type IMutationDeprecatedRemoveUserAndFacilityArgs = {
  id: Scalars['String'];
};


export type IMutationDeprecatedSyncFacilityArgs = {
  payload: IDeprecatedSyncFacilityInput;
};


export type IMutationDeprecationMintNftAdminArgs = {
  ipfs: Scalars['String'];
};


export type IMutationDeprecationTransferNftAdminArgs = {
  serial: Scalars['Float'];
  walletId: Scalars['String'];
};


export type IMutationForgotPasswordArgs = {
  payload: IUserEmailInput;
};


export type IMutationGenerateCodeSmsArgs = {
  payload: IGenerateCodeSmsInput;
};


export type IMutationGetPaymentOrderLinkArgs = {
  payload: IGetIdDto;
};


export type IMutationLoginArgs = {
  payload: IUserLoginInput;
};


export type IMutationLoginSmsArgs = {
  payload: ILoginSmsInput;
};


export type IMutationProductClickedTrackArgs = {
  productId: Scalars['Float'];
};


export type IMutationProductViewedTrackArgs = {
  productId: Scalars['Float'];
};


export type IMutationReadNotificationArgs = {
  payload: IGetIdDto;
};


export type IMutationRecoveryPasswordArgs = {
  payload: IUserRecoveryInput;
};


export type IMutationRejectInviteArgs = {
  payload: IGetIdDto;
};


export type IMutationRejectRequestArgs = {
  payload: IRejectRequestInput;
};


export type IMutationRejectSurveyBuyerArgs = {
  payload: IGetIdDto;
};


export type IMutationRemoveRelationCultivatorToBuyerArgs = {
  payload: IRemoveRelationCultivatorToBuyerInput;
};


export type IMutationRequestNewFacilityArgs = {
  payload: IRequestNewFacilityInput;
  token: Scalars['String'];
};


export type IMutationResendInviteArgs = {
  payload: IGetIdDto;
};


export type IMutationSendContactUsArgs = {
  payload: ISendContactUsInput;
  token: Scalars['String'];
};


export type IMutationSignUpBuyerArgs = {
  payload: ISignUpBuyerInput;
};


export type IMutationSignUpClientArgs = {
  payload: ISignUpClientInput;
};


export type IMutationSignUpCultivatorArgs = {
  payload: ISignUpCultivatorDto;
};


export type IMutationSignUpEmployeeArgs = {
  payload: ISignUpEmployeeInput;
};


export type IMutationSubmitSurveyArgs = {
  payload: ISubmitSurveyInput;
};


export type IMutationSurveyPackageConfirmedArgs = {
  uuid: Scalars['String'];
};


export type IMutationUpdateAdminProfileArgs = {
  logo?: InputMaybe<Scalars['Upload']>;
  payload: IUpdateAdminProfileInput;
};


export type IMutationUpdateBuyerByCultivatorArgs = {
  payload: IUpdateBuyerByCultivatorInput;
};


export type IMutationUpdateCartItemArgs = {
  payload: IUpdateCartInput;
};


export type IMutationUpdateClientArgs = {
  logo?: InputMaybe<Scalars['Upload']>;
  payload: IUpdateClientInput;
};


export type IMutationUpdateCompanyAdminArgs = {
  payload: IUpdateCompanyInput;
};


export type IMutationUpdateCompanyCultivatorArgs = {
  payload: IUpdateCompanyCultivatorInput;
};


export type IMutationUpdateConfigurationArgs = {
  payload: IConfigurationUpdateInput;
};


export type IMutationUpdateFacilityArgs = {
  logo?: InputMaybe<Scalars['Upload']>;
  payload: IUpdateFacilityDto;
};


export type IMutationUpdateOrderPackageArgs = {
  payload: IUpdateOrderPackageInput;
};


export type IMutationUpdateOrderStatusArgs = {
  payload: IUpdateOrderStatusInput;
};


export type IMutationUpdateProductArgs = {
  images?: InputMaybe<Array<Scalars['Upload']>>;
  payload: IUpdateProductDto;
  thumbnail?: InputMaybe<Scalars['Upload']>;
};


export type IMutationUpdateRequestArgs = {
  payload: IUpdateRequestInput;
};


export type IMutationUpdateSubcompanyAdminArgs = {
  payload: IUpdateSubcompanyInput;
};


export type IMutationUpdateSubcompanyCultivatorArgs = {
  payload: IUpdateSubcompanyInput;
};


export type IMutationUpdateTimeChatArgs = {
  payload: IGetIdStringDto;
};


export type IMutationUpdateUserArgs = {
  logo?: InputMaybe<Scalars['Upload']>;
  payload: IUpdateUserDto;
};


export type IMutationUpdateUserContextArgs = {
  facilityId: Scalars['String'];
};

export interface INftModel {
  __typename?: 'NFTModel';
  blockchainTransaction?: Maybe<ITransactionBlockchainModel>;
  /** Dates create/update */
  dates: IDates;
  /** Description */
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** ipfs */
  ipfs?: Maybe<Scalars['String']>;
  /** logo URL */
  logoURL?: Maybe<Scalars['String']>;
  /** Name */
  name?: Maybe<Scalars['String']>;
  properties: Scalars['JSONObject'];
  /** serial */
  serial?: Maybe<Scalars['Int']>;
  status: NftStatusEnum;
  /** survey */
  survey?: Maybe<ISurveyModel>;
  /** token id */
  tokenId?: Maybe<Scalars['String']>;
  type: NftTypeEnum;
  /** client */
  user?: Maybe<IUserModel>;
}

export enum NftStatusEnum {
  Blocked = 'blocked',
  Done = 'done',
  Error = 'error',
  Processing = 'processing'
}

export enum NftTypeEnum {
  Other = 'other',
  Survey = 'survey'
}

export interface INfTsModelDto {
  __typename?: 'NFTsModelDTO';
  items: Array<INftModel>;
  meta: IPaginateModel;
}

/** Net Info */
export interface INetInfo {
  __typename?: 'NetInfo';
  dueBalance?: Maybe<Scalars['Float']>;
  isNetActivated?: Maybe<Scalars['Boolean']>;
  netBalance?: Maybe<Scalars['Float']>;
  netDays?: Maybe<Scalars['Int']>;
}

export enum NoseEnum {
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small'
}

export interface INotificationModel {
  __typename?: 'NotificationModel';
  /** Dates create/update */
  dates: IDates;
  /** Description */
  description: Scalars['String'];
  id: Scalars['Int'];
  /** Owner */
  owner: IUserModel;
  status: NotificationStatusEnum;
  /** Theme */
  theme: Scalars['String'];
  type: NotificationTypeEnum;
}

export enum NotificationStatusEnum {
  New = 'new',
  Read = 'read'
}

export enum NotificationTypeEnum {
  Message = 'message'
}

/** Notifications */
export interface INotifications {
  __typename?: 'Notifications';
  items: Array<INotificationModel>;
  meta: IPaginateModel;
}

export interface IOrderModel {
  __typename?: 'OrderModel';
  /** address */
  address?: Maybe<Scalars['String']>;
  /** city */
  city?: Maybe<Scalars['String']>;
  /** comments */
  comments?: Maybe<Scalars['String']>;
  contactPerson?: Maybe<IUserModel>;
  /** Dates create/update */
  dates: IDates;
  facilityBuyer: IFacilityModel;
  facilityCultivator: IFacilityModel;
  /** Fee */
  fee: IFeeData;
  id: Scalars['Int'];
  /** ipfs */
  ipfs?: Maybe<Scalars['String']>;
  /** nft */
  nft?: Maybe<Scalars['JSONObject']>;
  /** Date due payment */
  paymentDate?: Maybe<Scalars['DateTime']>;
  /** Payment Status */
  paymentStatus: PaymentStatusEnum;
  /** Payment Type */
  paymentType: PaymentTypeEnum;
  /** Phone */
  phone?: Maybe<Scalars['String']>;
  products?: Maybe<Array<IOrderProductModel>>;
  /** Shipping Type */
  shippingType: ShippingTypeEnum;
  /** Order status */
  status: OrderStatusEnum;
  /** total price */
  total: Scalars['Float'];
  /** total price buyer */
  totalBuyer: Scalars['Float'];
  /** total price cultivator */
  totalCultivator: Scalars['Float'];
  transactions: Array<ITransactionModel>;
  verificationCode?: Maybe<Scalars['Int']>;
  /** Zip */
  zip?: Maybe<Scalars['Int']>;
}

export interface IOrderProductModel {
  __typename?: 'OrderProductModel';
  /** Dates create/update */
  dates: IDates;
  id: Scalars['Int'];
  /** Order */
  order: IOrderModel;
  /** Parent product */
  parentProduct?: Maybe<IProductModel>;
  /** price */
  price: Scalars['Float'];
  /** Product */
  product?: Maybe<IProductModel>;
  /** Product quantity */
  quantity: Scalars['Float'];
  /** total */
  total: Scalars['Float'];
}

export enum OrderStatusEnum {
  Cancel = 'Cancel',
  Completed = 'Completed',
  Confirmed = 'Confirmed',
  New = 'New',
  Shipped = 'Shipped',
  WaitingForCarrier = 'WaitingForCarrier',
  WaitingForPickUp = 'WaitingForPickUp'
}

/** Orders */
export interface IOrdersDto {
  __typename?: 'OrdersDTO';
  items: Array<IOrderModel>;
  meta: IPaginateModel;
}

export interface IPaginateDto {
  skip: Scalars['Int'];
  take: Scalars['Int'];
}

export interface IPaginateModel {
  __typename?: 'PaginateModel';
  skip: Scalars['Int'];
  take: Scalars['Int'];
  total: Scalars['Int'];
}

/** Password */
export interface IPasswordEmbedded {
  __typename?: 'PasswordEmbedded';
  /** Date of successful recovery */
  dateRecoveryDone?: Maybe<Scalars['DateTime']>;
  /** Reinstatement request date */
  dateRecoveryRequest?: Maybe<Scalars['Boolean']>;
  /** Has your password been recovered? */
  isRecoveryPassword: Scalars['Boolean'];
}

export enum PaymentStatusEnum {
  Due = 'Due',
  NotPaid = 'NotPaid',
  Overdue = 'Overdue',
  Paid = 'Paid'
}

export enum PaymentTypeEnum {
  Net = 'Net',
  PayNow = 'PayNow',
  PayOnDelivery = 'PayOnDelivery'
}

export enum PrimaryPurposeEnum {
  MentalHealth = 'MentalHealth',
  PainRelief = 'PainRelief',
  Recreation = 'Recreation'
}

/** Model's product */
export interface IProductModel {
  __typename?: 'ProductModel';
  assets?: Maybe<Array<IAssetModel>>;
  children?: Maybe<Array<IProductModel>>;
  companies: Array<ICompanyModel>;
  /** Dates create/update */
  dates: IDates;
  /** Description */
  description?: Maybe<Scalars['String']>;
  facility: IFacilityModel;
  /** Genetic cross */
  geneticCross?: Maybe<Scalars['String']>;
  /** Id product */
  id: Scalars['Int'];
  /** Initial Lab Testing State */
  initialLabTestingState?: Maybe<LabTestingEnum>;
  /** Is On Hold */
  isOnHold: Scalars['Boolean'];
  /** Is On Retailer Delivery */
  isOnRetailerDelivery: Scalars['Boolean'];
  /** Is On Trip */
  isOnTrip: Scalars['Boolean'];
  item: IItemModel;
  labTestDocuments?: Maybe<Array<Scalars['String']>>;
  /** Lab Testing State */
  labTestingState?: Maybe<LabTestingEnum>;
  /** Lab Testing State Date */
  labTestingStateDate: Scalars['String'];
  /** Product label */
  label: Scalars['String'];
  /** Last Modified Date */
  lastModified: Scalars['DateTime'];
  /** Location Id */
  locationId?: Maybe<Scalars['Int']>;
  /** Location name */
  locationName?: Maybe<Scalars['String']>;
  /** Location type name */
  locationTypeName?: Maybe<Scalars['String']>;
  orderResolve?: Maybe<IOrderModel>;
  /** Package type */
  packageType?: Maybe<Scalars['String']>;
  /** Packaged Date */
  packagedDate: Scalars['String'];
  parent?: Maybe<IProductModel>;
  /** price */
  price: Scalars['Float'];
  /** Product ALL(lb) */
  quantity: Scalars['Float'];
  /** Product quantity stock (lb) */
  quantityStock: Scalars['Float'];
  /** Product quantity stock min (lb) */
  quantityStockMin: Scalars['Float'];
  /** Product quantity when creation (lb) */
  quantityWhenCreation: Scalars['Float'];
  /** Source harvest count */
  sourceHarvestCount: Scalars['Int'];
  /** Source Package count */
  sourcePackageCount: Scalars['Int'];
  /** Product label parent */
  sourcePackageLabels?: Maybe<Scalars['String']>;
  /** Source Processing Job count */
  sourceProcessingJobCount: Scalars['Int'];
  /** Product status: draft|unpublished|published */
  status: ProductStatusEnum;
  terpenes?: Maybe<Array<Scalars['String']>>;
  thumbnail?: Maybe<IAssetModel>;
  /** Total CBD */
  totalCBD: Scalars['Float'];
  /** Total THC */
  totalTHC: Scalars['Float'];
  /** Unit of Measure abbreviation */
  unitOfMeasureAbbreviation?: Maybe<UnitsOfMeasureAbbreviationEnum>;
  /** Unit of measure name */
  unitOfMeasureName?: Maybe<UnitsOfMeasureNameEnum>;
}

export enum ProductStatusEnum {
  Archived = 'archived',
  Listed = 'listed',
  New = 'new',
  Unlisted = 'unlisted'
}

/** Products */
export interface IProductsModel {
  __typename?: 'ProductsModel';
  items: Array<IProductModel>;
  meta: IPaginateModel;
}

export interface IQuery {
  __typename?: 'Query';
  /** @protected - List buyers */
  buyers: IFacilitiesDto;
  /** @protected - cart by id */
  cartById: ICartModel;
  /** @protected - cart */
  carts: Array<ICartModel>;
  /** @public - nfts client */
  clientNfts: INfTsModelDto;
  /** @protected - List of company (by user admin) */
  companiesAdmin: ICompaniesModel;
  /** @protected - List of company (by user buyer) */
  companiesBuyer: ICompaniesModel;
  /** @protected - List of company (by user cultivator) */
  companiesCultivator: ICompaniesModel;
  /** @protected - Get company by ID (by user admin) */
  companyByIdAdmin: ICompanyModel;
  /** @protected - Get company by ID (by user buyer) */
  companyByIdBuyer: ICompanyModel;
  /** @protected - Get company by ID (by user cultivator) */
  companyByIdCultivator: ICompanyModel;
  /** @protected - Get Company Insights (by user admin) */
  companyInsightsAdmin: ICompanyInsightsModel;
  /** @protected - Get Company Insights (by user buyer) */
  companyInsightsBuyer: ICompanyInsightsModel;
  /** @protected - Get Company Insights (by user cultivator) */
  companyInsightsCultivator: ICompanyInsightsModel;
  /** @protected - get configurations */
  configurations: Scalars['JSONObject'];
  /** @protected - List cultivators */
  cultivators: IFacilitiesDto;
  /** @protected - get employee By Id */
  employeeById: IUserModel;
  /** @protected - employees */
  employees: IUsersModelDto;
  /** @protected - List Facilities (admin) */
  facilities: IFacilitiesDto;
  /** @protected - Get carat balance facility */
  facilityBalanceCarat: IFacilityBalanceDto;
  /** @protected - Get facility by id */
  facilityById: IFacilityModel;
  /** @protected - Get facility by id (admin) */
  facilityByIdAdmin: IFacilityModel;
  /** @protected - Get client PrivateKey */
  getClientPrivateKey: Scalars['String'];
  /** @protected - Get hbar rate */
  getHBarRate: Scalars['Float'];
  /** @protected - invitations */
  invitations: IInvitationsDto;
  /** @protected - Get invite by id */
  inviteByCode: IInviteModel;
  /** @protected - Get own User's profile */
  me: IUserModel;
  /** @protected - Get own User's profile */
  meAdmin: IUserModel;
  /** @protected - Get client profile */
  meClient: IUserModel;
  /** @protected - Get nft by ID (by user client) */
  nftByIdClient: INftModel;
  /** @protected - get user notification by id */
  notificationById: INotificationModel;
  /** @protected - get user notification */
  notifications: INotifications;
  /** @protected - order by id */
  orderById: IOrderModel;
  /** @protected - order by id (admin) */
  orderByIdAdmin: IOrderModel;
  /** @protected - orders */
  orders: IOrdersDto;
  /** @protected - orders (admin) */
  ordersAdmin: IOrdersDto;
  /** @protected - Get product by ID (by user admin) */
  productByIdAdmin: IProductModel;
  /** @protected - Get product by ID (by user buyer) */
  productByIdBuyer: IProductModel;
  /** @protected - Get product by ID (by user cultivator) */
  productByIdCultivator: IProductModel;
  /** @protected - List of products (by user admin) */
  productsAdmin: IProductsModel;
  /** @protected - List of products buyer */
  productsBuyer: IProductsModel;
  /** @protected - List of products cultivator */
  productsCultivator: IProductsModel;
  /** @protected - Report Sales Performance (by user admin) */
  reportSalesPerformanceAdmin: IReportSalesPerformances;
  /** @protected - Report Total Revenue (by user buyer) */
  reportSalesPerformanceByBuyer: IReportSalesPerformances;
  /** @protected - Report Total Revenue (by user admin) */
  reportSalesPerformanceByBuyerAdmin: IReportSalesPerformances;
  /** @protected - Report Total Revenue (by user cultivator) */
  reportSalesPerformanceByCultivator: IReportSalesPerformances;
  /** @protected - Report Total Revenue (by user admin) */
  reportSalesPerformanceByCultivatorAdmin: IReportSalesPerformances;
  /** @protected - Request by id */
  requestById: IRequestModel;
  /** @protected - get requests */
  requests: IRequestsDto;
  /** @protected - List of subcompany (by user admin) */
  subcompaniesAdmin: ISubcompaniesModel;
  /** @protected - List of subcompany (by user buyer) */
  subcompaniesBuyer: ISubcompaniesModel;
  /** @protected - List of subcompany (by user cultivator) */
  subcompaniesCultivator: ISubcompaniesModel;
  /** @protected - Get subcompany by ID (by user admin) */
  subcompanyByIdAdmin: ISubcompanyModel;
  /** @protected - Get subcompany by ID (by user buyer) */
  subcompanyByIdBuyer: ISubcompanyModel;
  /** @protected - Get subcompany by ID (by user cultivator) */
  subcompanyByIdCultivator: ISubcompanyModel;
  /** @protected - Get Survey by ID (by user admin) */
  surveyByIdAdmin: ISurveyModel;
  /** @protected - Get survey by ID (by user buyer) */
  surveyByIdBuyer: ISurveyModel;
  /** @protected - Get survey by ID (by user cultivator) */
  surveyByIdClient: ISurveyModel;
  /** @protected - Get survey by ID (by user cultivator) */
  surveyByIdCultivator: ISurveyModel;
  /** @protected - List of Surveys (by user admin) */
  surveysAdmin: ISurveysModel;
  /** @public - surveys */
  surveysBuyer: ISurveysModel;
  /** @public - surveys client */
  surveysClient: ISurveysModel;
  /** @public - surveys cultivator */
  surveysCultivator: ISurveysModel;
  /** @protected - Get transaction by ID  */
  transactionById: ITransactionModel;
  /** @protected - Get transaction by ID (by user admin) */
  transactionByIdAdmin: ITransactionModel;
  /** @protected - List of transactions */
  transactions: ITransactionsModel;
  /** @protected - List of transactions (by user admin) */
  transactionsAdmin: ITransactionsModel;
  /** @protected - get user By Id (admin) */
  userById: IUserModel;
  /** @protected - users (admin) */
  users: IUsersModelDto;
}


export type IQueryBuyersArgs = {
  payload: IFilterGetDto;
};


export type IQueryCartByIdArgs = {
  payload: IGetIdDto;
};


export type IQueryClientNftsArgs = {
  payload: IFilterGetDto;
};


export type IQueryCompaniesAdminArgs = {
  payload: IFilterGetDto;
};


export type IQueryCompaniesBuyerArgs = {
  payload: IFilterGetDto;
};


export type IQueryCompaniesCultivatorArgs = {
  payload: IFilterGetDto;
};


export type IQueryCompanyByIdAdminArgs = {
  payload: IGetIdDto;
};


export type IQueryCompanyByIdBuyerArgs = {
  payload: IGetIdDto;
};


export type IQueryCompanyByIdCultivatorArgs = {
  payload: IGetIdDto;
};


export type IQueryCompanyInsightsAdminArgs = {
  payload: IFilterGetDto;
};


export type IQueryCompanyInsightsBuyerArgs = {
  payload: IFilterGetDto;
};


export type IQueryCompanyInsightsCultivatorArgs = {
  payload: IFilterGetDto;
};


export type IQueryCultivatorsArgs = {
  payload: IFilterGetDto;
};


export type IQueryEmployeeByIdArgs = {
  payload: IGetIdStringDto;
};


export type IQueryEmployeesArgs = {
  payload: IFilterGetDto;
};


export type IQueryFacilitiesArgs = {
  payload: IFilterGetDto;
};


export type IQueryFacilityByIdArgs = {
  payload: IGetIdStringDto;
};


export type IQueryFacilityByIdAdminArgs = {
  payload: IGetIdStringDto;
};


export type IQueryInvitationsArgs = {
  payload: IFilterGetDto;
};


export type IQueryInviteByCodeArgs = {
  payload: IInviteByCodeInput;
};


export type IQueryNftByIdClientArgs = {
  payload: IGetIdDto;
};


export type IQueryNotificationByIdArgs = {
  payload: IGetIdDto;
};


export type IQueryNotificationsArgs = {
  payload: IFilterGetDto;
};


export type IQueryOrderByIdArgs = {
  payload: IGetIdDto;
};


export type IQueryOrderByIdAdminArgs = {
  payload: IGetIdDto;
};


export type IQueryOrdersArgs = {
  payload: IFilterOrdersInput;
};


export type IQueryOrdersAdminArgs = {
  payload: IFilterGetDto;
};


export type IQueryProductByIdAdminArgs = {
  payload: IGetIdDto;
};


export type IQueryProductByIdBuyerArgs = {
  payload: IGetIdDto;
};


export type IQueryProductByIdCultivatorArgs = {
  payload: IGetIdDto;
};


export type IQueryProductsAdminArgs = {
  payload: IFilterGetDto;
};


export type IQueryProductsBuyerArgs = {
  payload: IFilterGetDto;
};


export type IQueryProductsCultivatorArgs = {
  payload: IFilterGetDto;
};


export type IQueryReportSalesPerformanceAdminArgs = {
  payload: IReportSalesPerformanceInput;
};


export type IQueryReportSalesPerformanceByBuyerArgs = {
  payload: IReportSalesPerformanceInput;
};


export type IQueryReportSalesPerformanceByBuyerAdminArgs = {
  facilityId: Scalars['String'];
  payload: IReportSalesPerformanceInput;
};


export type IQueryReportSalesPerformanceByCultivatorArgs = {
  payload: IReportSalesPerformanceInput;
};


export type IQueryReportSalesPerformanceByCultivatorAdminArgs = {
  facilityId: Scalars['String'];
  payload: IReportSalesPerformanceInput;
};


export type IQueryRequestByIdArgs = {
  payload: IGetIdDto;
};


export type IQueryRequestsArgs = {
  payload: IFilterGetDto;
};


export type IQuerySubcompaniesAdminArgs = {
  payload: IFilterGetDto;
};


export type IQuerySubcompaniesBuyerArgs = {
  payload: IFilterGetDto;
};


export type IQuerySubcompaniesCultivatorArgs = {
  payload: IFilterGetDto;
};


export type IQuerySubcompanyByIdAdminArgs = {
  payload: IGetIdDto;
};


export type IQuerySubcompanyByIdBuyerArgs = {
  payload: IGetIdDto;
};


export type IQuerySubcompanyByIdCultivatorArgs = {
  payload: IGetIdDto;
};


export type IQuerySurveyByIdAdminArgs = {
  payload: IGetIdDto;
};


export type IQuerySurveyByIdBuyerArgs = {
  payload: IGetIdDto;
};


export type IQuerySurveyByIdClientArgs = {
  payload: IGetIdDto;
};


export type IQuerySurveyByIdCultivatorArgs = {
  payload: IGetIdDto;
};


export type IQuerySurveysAdminArgs = {
  payload: IFilterGetDto;
};


export type IQuerySurveysBuyerArgs = {
  payload: IFilterGetDto;
};


export type IQuerySurveysClientArgs = {
  payload: IFilterGetDto;
};


export type IQuerySurveysCultivatorArgs = {
  payload: IFilterGetDto;
};


export type IQueryTransactionByIdArgs = {
  payload: IGetIdDto;
};


export type IQueryTransactionByIdAdminArgs = {
  payload: IGetIdDto;
};


export type IQueryTransactionsArgs = {
  payload: IFilterGetDto;
};


export type IQueryTransactionsAdminArgs = {
  payload: IFilterGetDto;
};


export type IQueryUserByIdArgs = {
  payload: IGetIdStringDto;
};


export type IQueryUsersArgs = {
  payload: IFilterGetDto;
};

export interface IRejectRequestInput {
  /** ID */
  id?: InputMaybe<Scalars['Int']>;
  /** Message Reject */
  messageReject?: InputMaybe<Scalars['String']>;
}

/** Input Remove Relation Cultivator To Buyer */
export interface IRemoveRelationCultivatorToBuyerInput {
  facilityId: Scalars['String'];
}

export interface IReportSalesPerformanceDto {
  __typename?: 'ReportSalesPerformanceDTO';
  avgPoundsOrderBuyer: Scalars['Float'];
  avgPoundsOrderCultivator: Scalars['Float'];
  avgPriceBuyer: Scalars['Float'];
  avgPriceCultivator: Scalars['Float'];
  avgPricePoundBuyer: Scalars['Float'];
  avgPricePoundCultivator: Scalars['Float'];
  facility: IFacilityModel;
  percentListed?: Maybe<Scalars['Float']>;
  purchases: Scalars['Float'];
  quantityProductPurchased: Scalars['Float'];
  quantityProductRevenue: Scalars['Float'];
  totalListed?: Maybe<Scalars['Float']>;
  totalMetrc?: Maybe<Scalars['Float']>;
  totalPurchased: Scalars['Float'];
  totalRevenue: Scalars['Float'];
}

export interface IReportSalesPerformanceInput {
  endDate?: InputMaybe<Scalars['DateTime']>;
  /** parameters for filtering */
  filters?: InputMaybe<Array<IFilterDto>>;
  /** parameters for pagination */
  paginate?: InputMaybe<IPaginateDto>;
  /** parameters for sort */
  sorts?: InputMaybe<Array<ISortDto>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
}

export interface IReportSalesPerformances {
  __typename?: 'ReportSalesPerformances';
  items: Array<IReportSalesPerformanceDto>;
  meta: IPaginateModel;
}

export enum RequestFacilityRoleEnum {
  Buyer = 'buyer',
  Cultivator = 'cultivator'
}

export interface IRequestModel {
  __typename?: 'RequestModel';
  /** admin */
  admin?: Maybe<IUserModel>;
  /** Company Name */
  companyName: Scalars['String'];
  /** Dates create/update */
  dates: IDates;
  /** Email */
  email?: Maybe<Scalars['String']>;
  /** Facility role */
  facilityRole?: Maybe<RequestFacilityRoleEnum>;
  id: Scalars['Int'];
  /** Request activated? */
  isActivated: Scalars['Boolean'];
  /** LicenseNumber's facility */
  licenseNumber?: Maybe<Scalars['String']>;
  /** message */
  message?: Maybe<Scalars['String']>;
  /** message reject */
  messageReject?: Maybe<Scalars['String']>;
  /** name */
  name: Scalars['String'];
  /** Phone number */
  phone?: Maybe<Scalars['String']>;
  /** Request Status */
  status: RequestStatusEnum;
  type: RequestTypeEnum;
}

export interface IRequestNewFacilityInput {
  /** Company Name */
  companyName?: InputMaybe<Scalars['String']>;
  /** email */
  email: Scalars['String'];
  /** facility role */
  facilityRole: RequestFacilityRoleEnum;
  /** license Number */
  licenseNumber?: InputMaybe<Scalars['String']>;
  /** name */
  name: Scalars['String'];
  /** phone */
  phone: Scalars['String'];
}

export enum RequestStatusEnum {
  Approved = 'approved',
  Closed = 'closed',
  New = 'new',
  Processing = 'processing',
  Rejected = 'rejected'
}

export enum RequestTypeEnum {
  ContactUs = 'contactUs',
  Request = 'request'
}

/** Requests */
export interface IRequestsDto {
  __typename?: 'RequestsDTO';
  items: Array<IRequestModel>;
  meta: IPaginateModel;
}

export interface ISendContactUsInput {
  /** Company Name */
  companyName?: InputMaybe<Scalars['String']>;
  /** email */
  email: Scalars['String'];
  /** message */
  message: Scalars['String'];
  /** name */
  name: Scalars['String'];
  /** phone */
  phone?: InputMaybe<Scalars['String']>;
}

export enum ShippingTypeEnum {
  Delivery = 'Delivery',
  PickUp = 'PickUp'
}

/** Sign up buyer */
export interface ISignUpBuyerInput {
  /** Relation code */
  code: Scalars['String'];
  /** Facility display name */
  displayName?: InputMaybe<Scalars['String']>;
  /** Email user */
  email: Scalars['String'];
  /** Owner full name */
  fullName?: InputMaybe<Scalars['String']>;
  /** User licenseNumber Employee */
  licenseNumberEmployee: Scalars['String'];
  /** User licenseNumber Facility */
  licenseNumberFacility: Scalars['String'];
  /** User Key Metrc */
  metrcApiKey?: InputMaybe<Scalars['String']>;
  /** @MinLength(8), @MaxLength(64), @NotContains(" "), @IsAscii(), @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) */
  password: Scalars['String'];
}

export interface ISignUpClientInput {
  code: Scalars['Int'];
  fullName?: InputMaybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
}

/** Check facility account */
export interface ISignUpCultivatorDto {
  /** Join Code */
  code: Scalars['String'];
  /** Email user */
  email: Scalars['String'];
  /** User licenseNumber Employee */
  licenseNumberEmployee: Scalars['String'];
  /** User licenseNumber Facility */
  licenseNumberFacility: Scalars['String'];
  /** User Key Metrc */
  metrcApiKey: Scalars['String'];
  /** @MinLength(8), @MaxLength(64), @NotContains(" "), @IsAscii(), @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) */
  password: Scalars['String'];
}

/** Check Employee account */
export interface ISignUpEmployeeInput {
  /** Code */
  code: Scalars['String'];
  /** Email */
  email: Scalars['String'];
  /** Full name */
  fullName?: InputMaybe<Scalars['String']>;
  /** User licenseNumber Employee */
  licenseNumberEmployee: Scalars['String'];
  /** @MinLength(8), @MaxLength(64), @NotContains(" "), @IsAscii(), @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) */
  password: Scalars['String'];
}

export enum SmokedEnum {
  Medium = 'Medium',
  Mild = 'Mild',
  Strong = 'Strong'
}

/** Social */
export interface ISocial {
  __typename?: 'Social';
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  twitterX?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
}

export interface ISortDto {
  columnName: Scalars['String'];
  direction: SortDirectionEnum;
}

export enum SortDirectionEnum {
  Asc = 'asc',
  Desc = 'desc'
}

/** Subcompany */
export interface ISubcompaniesModel {
  __typename?: 'SubcompaniesModel';
  items: Array<ISubcompanyModel>;
  meta: IPaginateModel;
}

/** Model's subcompany */
export interface ISubcompanyModel {
  __typename?: 'SubcompanyModel';
  /** URL For QR Invite */
  URLForQRInvite?: Maybe<Scalars['String']>;
  /** Company */
  company: ICompanyModel;
  /** Dates create/update */
  dates: IDates;
  facilityBuyer?: Maybe<IFacilityModel>;
  id: Scalars['Int'];
  /** Is Survey Pending */
  isSurveyPending: Scalars['Boolean'];
  /** Reward quantity (lb) */
  quantity: Scalars['Float'];
  /** Reward quantity sold (lb) */
  quantitySold: Scalars['Float'];
  surveys: Array<ISurveyModel>;
}

export interface ISubmitSurveyInput {
  /** age range */
  ageRange: Scalars['Int'];
  appealingVisually: AppealingVisuallyEnum;
  aromaSmells: Array<Scalars['Float']>;
  color: ColorEnum;
  experience: ExperienceEnum;
  gender: SurveyGenderEnum;
  id: Scalars['Int'];
  intoxication: IntoxicationEnum;
  nose: NoseEnum;
  oftenConsumeCannabis: SurveyOftenConsumeCannabisEnum;
  primaryPurpose: PrimaryPurposeEnum;
  smoked: SmokedEnum;
}

export interface ISubscription {
  __typename?: 'Subscription';
  addNotification: INotificationModel;
  chatMessage: IFacilityToFacilityModel;
  companyCultivatorWaitingConfirmation: ICompanyModel;
  newOrder: IOrderModel;
  newRequest: IRequestModel;
  orderPaid: IOrderModel;
  surveyActivated: ISurveyModel;
}

export enum SurveyGenderEnum {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other'
}

/** Model's survey */
export interface ISurveyModel {
  __typename?: 'SurveyModel';
  /** Your age range */
  ageRange?: Maybe<Scalars['Int']>;
  /** How appealing is the flower/bud visually? */
  appealingVisually?: Maybe<AppealingVisuallyEnum>;
  /** Aroma/Smells?[1-6] */
  aromaSmells: Array<Scalars['Int']>;
  /** Buyer confirmed Date */
  buyerConfirmedDate?: Maybe<Scalars['DateTime']>;
  /** Buyer rejected Date */
  buyerRejectedDate?: Maybe<Scalars['DateTime']>;
  /** Bud/Hairs Color */
  color?: Maybe<ColorEnum>;
  /** Survey's completed date */
  completedDate?: Maybe<Scalars['DateTime']>;
  /** Dates create/update */
  dates: IDates;
  /** What kind of “high” did you experience? */
  experience?: Maybe<ExperienceEnum>;
  /** Full Name user */
  fullName: Scalars['String'];
  /** Your gender? */
  gender?: Maybe<SurveyGenderEnum>;
  id: Scalars['Int'];
  /** How strong is the intoxication? */
  intoxication?: Maybe<IntoxicationEnum>;
  /** nft */
  nft?: Maybe<INftModel>;
  /** How loud is the nose? */
  nose?: Maybe<NoseEnum>;
  /** How often do you consume cannabis? */
  oftenConsumeCannabis?: Maybe<SurveyOftenConsumeCannabisEnum>;
  /** Phone number */
  phone: Scalars['String'];
  /** What is the primary purpose for your consumption? */
  primaryPurpose?: Maybe<PrimaryPurposeEnum>;
  /** How is the flavor when smoked? */
  smoked?: Maybe<SmokedEnum>;
  /** status */
  status: SurveyStatusEnum;
  subcompany: ISubcompanyModel;
  /** Survey sent date */
  surveySentDate?: Maybe<Scalars['DateTime']>;
  /** client */
  user?: Maybe<IUserModel>;
  uuid: Scalars['String'];
}

export enum SurveyOftenConsumeCannabisEnum {
  Daily = 'Daily',
  Occassionally = 'Occassionally',
  Rarely = 'Rarely'
}

export enum SurveyStatusEnum {
  BuyerConfirmed = 'BuyerConfirmed',
  Done = 'Done',
  New = 'New',
  Rejected = 'Rejected',
  SurveySent = 'SurveySent'
}

/** Surveys */
export interface ISurveysModel {
  __typename?: 'SurveysModel';
  items: Array<ISurveyModel>;
  meta: IPaginateModel;
}

export interface ITransactionBlockchainModel {
  __typename?: 'TransactionBlockchainModel';
  /** Dates create/update */
  dates: IDates;
  /** fee */
  fee: Scalars['Float'];
  /** fee hbar */
  feeHbar: Scalars['Float'];
  /** gasLimit */
  gasLimit: Scalars['Float'];
  /** gasUsed */
  gasUsed: Scalars['Float'];
  id: Scalars['Int'];
  /** order */
  order?: Maybe<IOrderModel>;
  /** status */
  status: TransactionBlockchainStatusEnum;
  transaction?: Maybe<ITransactionModel>;
  /** Transaction id */
  transactionBlockchainId?: Maybe<Scalars['String']>;
  url: Scalars['String'];
}

export enum TransactionBlockchainStatusEnum {
  Done = 'done',
  Error = 'error'
}

export interface ITransactionModel {
  __typename?: 'TransactionModel';
  /** Amount */
  amount: Scalars['Float'];
  /** Amount token out */
  amountOut: Scalars['Float'];
  /** price in USD */
  amountUsd: Scalars['Float'];
  blockchainTransactions: Array<ITransactionBlockchainModel>;
  /** Card Info */
  cardInfo?: Maybe<ICardInfo>;
  /** Dates create/update */
  dates: IDates;
  diamondstandardRequestId: Scalars['Int'];
  diamondstandardSellReference: Scalars['String'];
  diamondstandardStatus?: Maybe<DiamondstandardStatusEnum>;
  /** error */
  error?: Maybe<Scalars['String']>;
  facilityFrom?: Maybe<IFacilityModel>;
  facilityTo?: Maybe<IFacilityModel>;
  /** Fee */
  fee: IFeeData;
  id: Scalars['Int'];
  /** order */
  order?: Maybe<IOrderModel>;
  /** status */
  status: TransactionStatusEnum;
  /** token swap in */
  token: Scalars['Float'];
  /** token swap out */
  tokenOut: Scalars['Float'];
  /** Token exchange rate in USD */
  tokenRate: Scalars['Float'];
  /** type */
  type: TransactionTypeEnum;
  uuid: Scalars['String'];
}

export enum TransactionStatusEnum {
  Cancel = 'cancel',
  Done = 'done',
  Error = 'error',
  New = 'new',
  Processing = 'processing'
}

export enum TransactionTypeEnum {
  Buy = 'buy',
  Deposit = 'deposit',
  Swap = 'swap',
  Withdrawal = 'withdrawal'
}

/** transactions */
export interface ITransactionsModel {
  __typename?: 'TransactionsModel';
  items: Array<ITransactionModel>;
  meta: IPaginateModel;
}

export enum UnitsOfMeasureAbbreviationEnum {
  Ea = 'ea',
  G = 'g',
  Kg = 'kg',
  Lb = 'lb',
  Mg = 'mg',
  Oz = 'oz',
  T = 't'
}

export enum UnitsOfMeasureNameEnum {
  Each = 'Each',
  Grams = 'Grams',
  Kilograms = 'Kilograms',
  Milligrams = 'Milligrams',
  Ounces = 'Ounces',
  Pounds = 'Pounds',
  Tonns = 'Tonns'
}

export enum UnitsOfMeasureQuantityTypeEnum {
  CountBased = 'CountBased',
  WeightBased = 'WeightBased'
}

export interface IUpdateAdminProfileDataInput {
  isNotificationContactUs: Scalars['Boolean'];
  isNotificationJoinFacility: Scalars['Boolean'];
}

export interface IUpdateAdminProfileInput {
  adminData: IUpdateAdminProfileDataInput;
  adminId: Scalars['String'];
  /** Email user */
  email?: InputMaybe<Scalars['String']>;
  /** nickname user */
  fullName?: InputMaybe<Scalars['String']>;
  /** is blocked user */
  isBlocked?: InputMaybe<Scalars['Boolean']>;
  /** Phone number */
  phoneNumber?: InputMaybe<Scalars['String']>;
}

/** Input data for updating the buyer by cultivator */
export interface IUpdateBuyerByCultivatorInput {
  /** LicenseNumber */
  id: Scalars['String'];
  isNetActivated?: InputMaybe<Scalars['Boolean']>;
  netBalance?: InputMaybe<Scalars['Float']>;
  netDays?: InputMaybe<Scalars['Float']>;
}

/** Update Cart */
export interface IUpdateCartInput {
  cultivatorId: Scalars['String'];
  productId: Scalars['Int'];
  quantity: Scalars['Float'];
}

export interface IUpdateClientInput {
  /** nickname user */
  fullName?: InputMaybe<Scalars['String']>;
}

/** Update Company */
export interface IUpdateCompanyCultivatorInput {
  /** Company Name */
  companyName?: InputMaybe<Scalars['String']>;
  /** Company's Date End company */
  dateEnd?: InputMaybe<Scalars['String']>;
  /** Company's Date Start company */
  dateStart?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  productSurveyId?: InputMaybe<Scalars['Int']>;
  /** Company's Status */
  status?: InputMaybe<CompanyStatusEnum>;
  /** Unit Weight(gram) */
  unitWeight?: InputMaybe<Scalars['Int']>;
}

/** Update Company */
export interface IUpdateCompanyInput {
  /** Company Name */
  companyName?: InputMaybe<Scalars['String']>;
  /** Company's Date End company */
  dateEnd?: InputMaybe<Scalars['String']>;
  /** Company's Date Start company */
  dateStart?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  productSurveyId?: InputMaybe<Scalars['Int']>;
  /** Company's Status */
  status?: InputMaybe<CompanyStatusEnum>;
  /** Unit Weight(gram) */
  unitWeight?: InputMaybe<Scalars['Int']>;
}

/** Input data for update profile facility */
export interface IUpdateFacilityDto {
  address?: InputMaybe<IAddressDataInput>;
  /** Campaign Email */
  campaignEmail?: InputMaybe<Scalars['String']>;
  /** Description */
  description?: InputMaybe<Scalars['String']>;
  /** DisplayName's facility */
  displayName?: InputMaybe<Scalars['String']>;
  /** Email facility */
  email?: InputMaybe<Scalars['String']>;
  /** Hedera phone number */
  phoneNumber?: InputMaybe<Scalars['String']>;
  socials?: InputMaybe<IUpdateSocialInput>;
  userContactId?: InputMaybe<Scalars['String']>;
}

/** Update Order Package */
export interface IUpdateOrderPackageInput {
  orderProductId: Scalars['Int'];
  packageId: Scalars['Int'];
}

/** Update Order Status */
export interface IUpdateOrderStatusInput {
  orderId: Scalars['Int'];
  status: OrderStatusEnum;
  verificationCode?: InputMaybe<Scalars['Int']>;
}

/** Input data for update product */
export interface IUpdateProductDto {
  /** Description */
  description?: InputMaybe<Scalars['String']>;
  /** Genetic cross */
  geneticCross?: InputMaybe<Scalars['String']>;
  /** Id product */
  id: Scalars['Int'];
  /** price */
  price?: InputMaybe<Scalars['Float']>;
  /** Product quantity stock (lb) */
  quantityStock?: InputMaybe<Scalars['Float']>;
  /** Product quantity stock min (lb) */
  quantityStockMin?: InputMaybe<Scalars['Float']>;
  /** Product status: draft|unpublished|published */
  status?: InputMaybe<ProductStatusEnum>;
  terpenes?: InputMaybe<Array<Scalars['String']>>;
}

export interface IUpdateRequestInput {
  /** ID */
  id?: InputMaybe<Scalars['Int']>;
  /** status */
  status: RequestStatusEnum;
}

export interface IUpdateSocialInput {
  facebook?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  site?: InputMaybe<Scalars['String']>;
  twitterX?: InputMaybe<Scalars['String']>;
  youtube?: InputMaybe<Scalars['String']>;
}

/** Create Subcompany */
export interface IUpdateSubcompanyInput {
  companyId: Scalars['Int'];
  facilityBuyerId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** Reward quantity (lb) */
  quantity?: InputMaybe<Scalars['Float']>;
}

/** Input data for update profile facility */
export interface IUpdateUserDto {
  /** nickname user */
  fullName?: InputMaybe<Scalars['String']>;
  /** Phone number */
  phoneNumber?: InputMaybe<Scalars['String']>;
}

export interface IUserEmailInput {
  /** Email user */
  email: Scalars['String'];
}

export interface IUserLoginInput {
  /** Email user */
  email: Scalars['String'];
  /** @MinLength(8), @MaxLength(64), @NotContains(" "), @IsAscii(), @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) */
  password: Scalars['String'];
}

/** Model User */
export interface IUserModel {
  __typename?: 'UserModel';
  adminData: IAdminData;
  asset?: Maybe<IAssetModel>;
  /** Context */
  context?: Maybe<IFacilityModel>;
  /** Date create/update */
  dates: IDates;
  /** Email user */
  email?: Maybe<Scalars['String']>;
  /** ErrorMsgEnum errors */
  errors?: Maybe<ErrorMsgEnum>;
  /** nickname user */
  fullName: Scalars['String'];
  /** LicenseNumber */
  id: Scalars['String'];
  index: Scalars['Int'];
  /** is blocked user */
  isBlocked: Scalars['Boolean'];
  /** KYC status */
  isKyc: Scalars['Boolean'];
  /** Hedera issuer (did token) */
  issuer?: Maybe<Scalars['String']>;
  /** Join Date */
  joinDate?: Maybe<Scalars['DateTime']>;
  /** License data */
  license?: Maybe<ILicense>;
  passwordData?: Maybe<IPasswordEmbedded>;
  /** Phone number */
  phoneNumber?: Maybe<Scalars['String']>;
  /** Hedera public address */
  publicAddress?: Maybe<Scalars['String']>;
  /** Role user: user|admin|owner */
  role: UserRoleEnum;
  userToFacilities: Array<IFacilityModel>;
}

export interface IUserRecoveryInput {
  /** Recovery code: @NotContains(" ") */
  codeRecoveryPassword: Scalars['String'];
  /** @MinLength(8), @MaxLength(64), @NotContains(" "), @IsAscii(), @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) */
  password: Scalars['String'];
}

export enum UserRoleEnum {
  AdminPlatform = 'admin_platform',
  Client = 'client',
  OwnerPlatform = 'owner_platform',
  User = 'user'
}

export interface IUserTokenDto {
  __typename?: 'UserTokenDTO';
  token: Scalars['String'];
  user: IUserModel;
}

export interface IUsersModelDto {
  __typename?: 'UsersModelDTO';
  items: Array<IUserModel>;
  meta: IPaginateModel;
}
