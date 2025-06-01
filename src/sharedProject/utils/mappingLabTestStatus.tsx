import { LabTestingEnum } from 'graphql/_server';

const labTestStatusMap: { [key in LabTestingEnum]?: string } = {
  [LabTestingEnum.AwaitingConfirmation]: 'Awaiting Confirmation',
  [LabTestingEnum.NotRequired]: 'Not Required',
  [LabTestingEnum.NotSubmitted]: 'Not Submitted',
  [LabTestingEnum.ProcessValidated]: 'Process Validated',
  [LabTestingEnum.Remediated]: 'Remediated',
  [LabTestingEnum.RetestFailed]: 'Retest Failed',
  [LabTestingEnum.RetestPassed]: 'Retest Passed',
  [LabTestingEnum.SelectedForRandomTesting]: 'Selected For Random Testing',
  [LabTestingEnum.SubmittedForTesting]: 'Submitted For Testing',
  [LabTestingEnum.TestFailed]: 'Test Failed',
  [LabTestingEnum.TestPassed]: 'Test Passed',
  [LabTestingEnum.TestingInProgress]: 'Testing In Progress'
};

export const mappingLabTestStatus = (oldMessage: LabTestingEnum): string =>
  labTestStatusMap[oldMessage] ?? '--';

export const labTestStatuses = Object.entries(labTestStatusMap).map(([value, label]) => ({
  value,
  label
}));
