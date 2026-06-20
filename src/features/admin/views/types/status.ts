import { type Application, ApplicationStatus, AdminApplicationStatus } from '../../viewmodels';

const EDITABLE_STATUSES = new Set<Application['status'] | null>([
  undefined,
  null,
  ApplicationStatus.PENDING_NO_SHOW,
  // ApplicationStatus.PASSED,
  // ApplicationStatus.FAILED,
  // ApplicationStatus.NO_SHOW,
]);

export const STATUS_OPTIONS = [
  { value: '', status: null },
  { value: AdminApplicationStatus.PASSED, status: AdminApplicationStatus.PASSED },
  { value: AdminApplicationStatus.FAILED, status: AdminApplicationStatus.FAILED },
  {
    value: AdminApplicationStatus.NO_SHOW,
    status: AdminApplicationStatus.NO_SHOW,
  },
] as const;

export function isEditableApplicationStatus(
  status: Application['status'] | null,
): status is
  | null
  | undefined
  | ApplicationStatus.PASSED
  | ApplicationStatus.FAILED
  | ApplicationStatus.PENDING_NO_SHOW {
  return EDITABLE_STATUSES.has(status);
}
