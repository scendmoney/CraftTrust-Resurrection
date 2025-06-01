export enum SortDirectionEnum {
  asc = 'asc',
  desc = 'desc',
}

export enum FilterOperationEnum {
  contains = 'contains',
  equal = 'equal',
  notEqual = 'notEqual',
  containsInArray = 'containsInArray',
  moreThan = 'moreThan',
  moreThanOrEqual = 'moreThanOrEqual',
  lessThan = 'lessThan',
  lessThanOrEqual = 'lessThanOrEqual',
}

export enum FilterFieldTypeEnum {
  boolean = 'boolean',
  date = 'date',
  dateRange = 'dateRange',
  NULL = 'NULL',
  number = 'number',
  numberRange = 'numberRange',
  text = 'text',
}

export enum FileTypeEnum {
  json = 'json',
  logo = 'logo',
}

export enum RedisCacheKeysEnum {
  users = 'users',
  facilityOnline = 'facilityOnline',
  contractExpires = 'contractExpires',
}

export enum JobEnum {
  createHederaWalletJob = 'createHederaWalletJob',
  customerIoJob = 'syncProductsJob',
  mintNFTJob = 'mintNFTJob',
  newRequestJob = 'newRequestJob',
  syncEmployeesJob = 'syncEmployeesJob',
  syncFacilityJob = 'syncFacilityJob',
  syncProductsJob = 'syncProductsJob',
}

export enum QueueEnum {
  queueFacility = 'queueFacility',
  queueOrder = 'queueOrder',
  queueProduct = 'queueProduct',
  queueUser = 'queueUser',
  queueCustomerIo = 'queueCustomerIo',
  queueHedera = 'queueHedera',
  request = 'request',
}

export enum RoleEnum {
  user = 'user',
  admin = 'admin',
}

export enum SubscriptionsEnum {
  addNotification = 'addNotification',
  chatMessage = 'chatMessage',
  newOrder = 'newOrder',
  newRequest = 'newRequest',
  orderPaid = 'orderPaid',
  surveyActivated = 'surveyActivated',
  companyCultivatorWaitingConfirmation = 'companyCultivatorWaitingConfirmation',
}

export enum EmailTemplatesEnum {
  adminContractExpiresError = 'adminContractExpiresError',
  contactusAdmin = 'contactusAdmin',
  contactUsClient = 'contactUsClient',
  deleteRelationBuyer = 'deleteRelationBuyer',
  deleteRelationCultivator = 'deleteRelationCultivator',
  netOrderDueBuyer = 'netOrderDueBuyer',
  netOrderOverdueBuyer = 'netOrderOverdueBuyer',
  netOrderOverdueCultivator = 'netOrderOverdueCultivator',
  requestFacilityAdmin = 'requestFacilityAdmin',
  requestFacilityApprove = 'requestFacilityApprove',
  requestFacilityClient = 'requestFacilityClient',
  requestFacilityReject = 'requestFacilityReject',
  verificationEmailCode = 'Verify email</a>',
  surveyNewCustomer = 'surveyNewCustomer',
  surveyStartCompany = 'surveyStartCompany',
  surveyStartCompanyCultivator = 'surveyStartCompanyCultivator',
  surveyCompanyIsWaitingApproval = 'surveyCompanyIsWaitingApproval',
  surveyCompanyBuyerBagsOut = 'surveyCompanyBuyerBagsOut',
  forgotPassword = 'forgotPassword',
}

export enum IndexUniqueEnum {
  IDX_USER_PHONE_NUMBER_UNIQUE = 'IDX_USER_PHONE_NUMBER_UNIQUE',
  IDX_USER_EMAIL_UNIQUE = 'IDX_USER_EMAIL_UNIQUE',
}
