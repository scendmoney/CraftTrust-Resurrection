const mapErrorMessage = (oldMessage: string): string => {
  switch (oldMessage) {
    case 'Token error: jwt malformed':
    case 'Token error: TOKEN_WRONG':
    case 'Token error: invalid token':
      return 'Your login details are out of date. Please log in again';
    case 'FacilitiesNotExistInMetrc':
      return 'The Facility doesn`t exist in Metrc';
    case 'RECOVERY_CODE_TIMED_OUT':
      return 'Recovery code timed out';
    case 'WAITING_3_MINUTES':
      return 'Please wait before trying again';
    case 'USER_NO_EXIST':
      return 'User does not exist';
    case 'EntityLoginPasswordWrong':
      return 'User does not exist or password incorrect';
    case 'EmployeeNotExistInMetrc':
      return 'The Employee doesn`t exist in Metrc';
    case 'EmailOrKeyAlreadyExist':
      return 'Email already exists';
    case 'EmployeesNotExistInMetrc':
      return 'Employees don`t exist in Metrc';
    case 'FacilitiesNotExistInDB':
      return 'Facilities don`t exist in the database';
    case 'FacilityNotExist':
      return 'Facility does not exist';
    case 'FileIsWrong':
      return 'The file is incorrect';
    case 'InvalidIssuer':
      return 'Invalid issuer';
    case 'UserOrCodeWrong':
      return 'User or code is wrong';
    case 'InvalidToken':
      return 'Token is invalid';
    case 'MetrcApiKeyNotExist':
      return 'Metrc API Key does not exist';
    case 'MetrcLicenseNumberEmployeeNotExist':
      return 'Employee with the given Metrc License Number does not exist';
    case 'MetrcLicenseNumberFacilityNotExist':
      return 'Facility with the given Metrc License Number does not exist';
    case 'MetrcLicenseNumberNotExist':
      return 'Metrc License Number does not exist';
    case 'NoPublicAddress':
      return 'A wallet-related error occurred. Please contact support.';
    case 'ProductNotExist':
      return 'Product does not exist';
    case 'StorageNotFound':
      return 'Storage not found';
    case 'UserBlocked':
      return 'User is blocked';
    case 'UserNotExist':
      return 'User does not exist';
    case 'ChatUsersWrong':
      return 'Chat users are incorrect';
    case 'ContactNotExist':
      return 'Contact does not exist';
    case 'ContextNotExist':
      return 'Context does not exist';
    case 'EmailAlreadyExist':
      return 'Email already exists';
    case 'EmployeeAlreadyExist':
      return 'Employee already exists';
    case 'EmployeeNotExist':
      return 'Employee does not exist';
    case 'FacilitiesOrUserKeyNotExistInMetrc':
      return 'Facilities or User Key does not exist in Metrc';
    case 'FacilityNotRelation':
      return 'Facility not related';
    case 'FacilityOwnerWrong':
      return 'Facility owner is wrong';
    case 'InviteActivated':
      return 'Invite has been activated';
    case 'InviteAlreadyExist':
      return 'Invite already exists';
    case 'InviteCodeWrong':
      return 'Invitation code is wrong';
    case 'InviteNotExist':
      return 'Invite does not exist';
    case 'InviteTypeWrong':
      return 'Invite type is wrong';
    case 'NoAccess':
      return 'No access';
    case 'PayloadWrong':
      return 'Payload is wrong';
    case 'UserNotOwner':
      return 'User is not the owner';
    case 'ProductListedWrong':
      return 'Error in product listing. Please check the entered information';
    case 'ProductQuantityStockMin':
      return 'The quantity is below the minimum stock quantity';
    case 'IncorrectEmployeeLicenseNumber':
      return 'Incorrect Employee License Number';
    case 'OrderStatusWrong':
      return 'Unable to switch status. Please follow the instructions and correct the errors';
    case 'OrderCodeWrong':
      return 'The code is not correct, please check the code and enter again';
    case 'OrderPackageWrong':
      return 'Please select an ID for each package';
    case 'RecaptchaError':
      return 'Something went wrong. Please try again later or contact our technical support';
    case 'FacilityNotAccessGrowPlants':
      return 'This facility is not intended for growing plants';
    case 'InviteFacilityActivated':
      return 'The license number is not correct';
    case 'CartNotExist':
      return 'Cart does not exist';
    case 'OrderNotExist':
      return 'Order not found';
    case 'OrderPaid':
      return 'Order has already been paid';
    case 'OrderTotalWrong21':
      return 'Temporary error: Orders can only be paid with $21';
    case 'OrderPaymentError':
      return 'Payment issue: Please contact the administrator for assistance';
    case 'TransactionProcessing':
      return 'Transaction is processing';
    case 'InvalidDate':
      return 'Invalid Date';
    case 'FacilityNotAccessRetail':
      return 'Retail access is restricted for this facility.';
    case 'ProductQuantityIsNotEnough':
      return 'One of the products has less left in stock than you have in your cart. Update the quantity or remove the product from your cart';
    case 'ContactPersonWrong':
      return 'Wrong Contact Person';
    case 'SurveyAlreadyExist':
      return 'A user with this number is already registered in this subcompany and the survey status is not new';
    case 'SurveyNotExist':
      return 'Survey does not exist';
    case 'SurveyStatusWrong':
      return 'Survey status is wrong - the user has already progressed further (Survey status is not new)';
    case 'CodeWrong':
      return 'The code entered is incorrect';
    case 'CompanyStatusWrong':
      return 'Company is not active or the survey has already been completed';
    case 'ProductNotContainedInCompany':
      return 'Product is not contained in the company';
    case 'FacilityDue':
      return 'Facility has a due balance';
    case 'FacilityWrong':
      return 'Facility is wrong';
    case 'ActiveOrderExist':
      return 'Disconnect is unavailable, as the facility has active orders';
    case 'EntityNotExist':
      return 'Entity does not exist in the database';
    case 'SurveyDone':
      return 'The survey has already been completed, no further action is possible';
    case 'SurveyBuyerWrong':
      return 'Unauthorized survey request: the requester does not match the expected buyer';
    case 'CompanyProductOutOfStock':
      return 'Product out of stock: no more items available for distribution';
    case 'SubcompanyNotExist':
      return 'Dispensary does not exist';
    case 'CompanyDone':
      return 'Campaign is done';
    case 'NotEnoughTokens':
      return 'Not enough money';
    case 'TokenInfoWrong':
      return 'Network unresponsive. Please try again later.';
    case 'SwapError':
      return 'Exchange failed. Please try again later.';
    case 'ProductOutOfStock':
      return 'Product out of stock';
    case 'OrderNotPaid':
      return 'Order has not been paid';
    case 'NetBalanceWrong':
      return 'Net Balance is wrong';
    case 'EmailOrLicenseNumberWrong':
      return 'Email or License Number is wrong';
    default:
      return oldMessage;
  }
};

export default mapErrorMessage;
