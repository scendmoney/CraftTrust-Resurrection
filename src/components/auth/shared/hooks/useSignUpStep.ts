import { useState } from 'react';
import { FacilityRoleEnum, IUserModel } from 'graphql/_server';

export interface IFacilityShortModelExtended {
  licenseNumberFacility: string;
  metrcApiKey?: string;
  licenseNumberEmployee: string;
  name?: string;
}

export type TSignUpFacility = IFacilityShortModelExtended | undefined;
export type TSignUpLogo = string | undefined;
export type TSignUpStep = number;
export type TSignUpUserModel = IUserModel | undefined;

export interface ISignUpGoToStep {
  step: TSignUpStep;
  facility?: TSignUpFacility;
  role?: FacilityRoleEnum;
  logo?: string;
  user?: TSignUpUserModel;
}

export interface ISignUpMemoizeData {
  facility?: TSignUpFacility;
  logo?: string;
  user?: TSignUpUserModel;
  role?: FacilityRoleEnum;
}

export type TSignUpGoToStepFun = (params: ISignUpGoToStep) => void;
export type TSignUpMemoizeDataFun = (params: ISignUpMemoizeData) => void;

const useSignUpStep = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [facility, setFacility] = useState<TSignUpFacility>(undefined);
  const [logo, setLogo] = useState<TSignUpLogo>(undefined);
  const [user, setUser] = useState<TSignUpUserModel>(undefined);
  const [role, setRole] = useState<FacilityRoleEnum | undefined>(undefined);

  function goToStep(params: ISignUpGoToStep) {
    setCurrentStep(params.step);

    params.facility && setFacility(params.facility);
    params.user && setUser(params.user);
    params.logo && setLogo(params.logo);
    params.role && setRole(params.role);
  }

  function memoizeData(params: ISignUpMemoizeData) {
    params.facility && setFacility(params.facility);
    params.user && setUser(params.user);
    params.logo && setLogo(params.logo);
    params.role && setRole(params.role);
  }
  return { currentStep, facility, logo, user, role, goToStep, memoizeData };
};

export default useSignUpStep;
