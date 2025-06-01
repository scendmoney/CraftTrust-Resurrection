import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
// import {
//   IFacilityModel,
//   IFacilityShortModel,
//   IMutationSignUpBuyerStep1Args,
//   IMutationSignUpBuyerStep2Args,
//   IMutationSignUpBuyerStep3Args,
//   IMutationSignUpCultivatorStep1Args,
//   IMutationSignUpEmployeeStep1Args,
//   IMutationSignUpEmployeeStep2Args,
//   ISignUpBuyerStep1Input,
//   ISignUpBuyerStep2Input,
//   ISignUpBuyerStep3Input,
//   ISignUpCultivatorStep1Dto,
//   ISignUpCultivatorStep2Dto,
//   ISignUpCultivatorStep3Dto,
//   ISignUpEmployeeStep1Input,
//   ISignUpEmployeeStep2Input,
//   IUserModel
// } from 'graphql/_server';
// import SIGN_UP_BUYER_STEP_1 from 'graphql/mutations/signUpBuyerStep1';
// import SIGN_UP_BUYER_STEP_2 from 'graphql/mutations/signUpBuyerStep2';
// import SIGN_UP_BUYER_STEP_3 from 'graphql/mutations/signUpBuyerStep3';
// import SIGN_UP_CULTIVATOR_STEP1 from 'graphql/mutations/signUpCultivatorStep1';
// import SIGN_UP_CULTIVATOR_STEP2 from 'graphql/mutations/signUpCultivatorStep2';
// import SIGN_UP_CULTIVATOR_STEP3 from 'graphql/mutations/signUpCultivatorStep3';
// import SIGN_UP_EMPLOYEE_STEP_1 from 'graphql/mutations/signUpEmployeeStep1';
// import SIGN_UP_EMPLOYEE_STEP_2 from 'graphql/mutations/signUpEmployeeStep2';
// import projectConstants from 'projectConstants';
// import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';

const useAuthMutations = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [signUpEmployeeStep1] = useMutation<
  //   { signUpEmployeeStep1: IUserModel },
  //   IMutationSignUpEmployeeStep1Args
  // >(SIGN_UP_EMPLOYEE_STEP_1);

  // const [signUpEmployeeStep2] = useMutation<
  //   { signUpEmployeeStep2: IUserModel },
  //   IMutationSignUpEmployeeStep2Args
  // >(SIGN_UP_EMPLOYEE_STEP_2);

  // const [signUpBuyerStep1] = useMutation<
  //   { signUpBuyerStep1: IFacilityModel },
  //   IMutationSignUpBuyerStep1Args
  // >(SIGN_UP_BUYER_STEP_1);

  // const [signUpBuyerStep2] = useMutation<
  //   { signUpBuyerStep2: IUserModel },
  //   IMutationSignUpBuyerStep2Args
  // >(SIGN_UP_BUYER_STEP_2);

  // const [signUpBuyerStep3] = useMutation<
  //   { signUpBuyerStep3: IUserModel },
  //   IMutationSignUpBuyerStep3Args
  // >(SIGN_UP_BUYER_STEP_3);

  // const [signUpCultivatorStep1] = useMutation<
  //   { signUpCultivatorStep1: IFacilityShortModel },
  //   IMutationSignUpCultivatorStep1Args
  // >(SIGN_UP_CULTIVATOR_STEP1);

  // const [signUpCultivatorStep2] = useMutation<{ signUpCultivatorStep2: IUserModel }>(
  //   SIGN_UP_CULTIVATOR_STEP2
  // );

  // const [signUpCultivatorStep3] = useMutation<{ signUpCultivatorStep3: IUserModel }>(
  //   SIGN_UP_CULTIVATOR_STEP3
  // );

  // async function handleStepEmployee1(payload: ISignUpEmployeeStep1Input) {
  //   try {
  //     setIsLoading(true);

  //     const response = await signUpEmployeeStep1({
  //       variables: {
  //         payload
  //       }
  //     });

  //     if (!response) {
  //       throw new Error(projectConstants.messages.error);
  //     }

  //     return response.data?.signUpEmployeeStep1;
  //   } catch (err) {
  //     toast.error(getErrorMessage(err));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function handleStepEmployee2(payload: ISignUpEmployeeStep2Input) {
  //   try {
  //     setIsLoading(true);

  //     const response = await signUpEmployeeStep2({
  //       variables: {
  //         payload
  //       }
  //     });

  //     if (!response) {
  //       throw new Error(projectConstants.messages.error);
  //     }

  //     return response.data?.signUpEmployeeStep2;
  //   } catch (err) {
  //     toast.error(getErrorMessage(err));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function handleStepBuyer1(payload: ISignUpBuyerStep1Input) {
  //   try {
  //     setIsLoading(true);

  //     const response = await signUpBuyerStep1({
  //       variables: {
  //         payload
  //       }
  //     });

  //     if (!response) {
  //       throw new Error(projectConstants.messages.error);
  //     }

  //     return response.data?.signUpBuyerStep1;
  //   } catch (err) {
  //     toast.error(getErrorMessage(err));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function handleStepBuyer2(payload: ISignUpBuyerStep2Input) {
  //   try {
  //     setIsLoading(true);

  //     const response = await signUpBuyerStep2({
  //       variables: {
  //         payload
  //       }
  //     });

  //     if (!response) {
  //       throw new Error(projectConstants.messages.error);
  //     }

  //     return response.data?.signUpBuyerStep2;
  //   } catch (err) {
  //     toast.error(getErrorMessage(err));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function handleStepBuyer3(payload: ISignUpBuyerStep3Input) {
  //   try {
  //     setIsLoading(true);

  //     const response = await signUpBuyerStep3({
  //       variables: {
  //         payload
  //       }
  //     });

  //     if (!response) {
  //       throw new Error(projectConstants.messages.error);
  //     }

  //     return response.data?.signUpBuyerStep3;
  //   } catch (err) {
  //     toast.error(getErrorMessage(err));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function handleStep1(payload: ISignUpCultivatorStep1Dto) {
  //   try {
  //     setIsLoading(true);

  //     const response = await signUpCultivatorStep1({
  //       variables: {
  //         payload
  //       }
  //     });

  //     if (!response) {
  //       throw new Error(projectConstants.messages.error);
  //     }

  //     return response.data?.signUpCultivatorStep1;
  //   } catch (err) {
  //     toast.error(getErrorMessage(err));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function handleStep2(payload: ISignUpCultivatorStep2Dto) {
  //   try {
  //     setIsLoading(true);

  //     const response = await signUpCultivatorStep2({
  //       variables: {
  //         payload
  //       }
  //     });

  //     if (!response) {
  //       throw new Error(projectConstants.messages.error);
  //     }

  //     return response.data?.signUpCultivatorStep2;
  //   } catch (err) {
  //     toast.error(getErrorMessage(err));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function handleStep3(payload: ISignUpCultivatorStep3Dto) {
  //   try {
  //     setIsLoading(true);

  //     const response = await signUpCultivatorStep3({
  //       variables: {
  //         payload
  //       }
  //     });

  //     if (!response) {
  //       throw new Error(projectConstants.messages.error);
  //     }

  //     return response.data?.signUpCultivatorStep3;
  //   } catch (err) {
  //     toast.error(getErrorMessage(err));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return {
    isLoading
    // step1: handleStep1,
    // step2: handleStep2,
    // step3: handleStep3,
    // step1Buyer: handleStepBuyer1,
    // step2Buyer: handleStepBuyer2,
    // step3Buyer: handleStepBuyer3,
    // step1Employee: handleStepEmployee1,
    // step2Employee: handleStepEmployee2
  };
};

export default useAuthMutations;
