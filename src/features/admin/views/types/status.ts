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
  { value: ApplicationStatus.PASSED, status: AdminApplicationStatus.PASSED },
  { value: ApplicationStatus.FAILED, status: AdminApplicationStatus.FAILED },
  { value: ApplicationStatus.NO_SHOW, status: AdminApplicationStatus.NO_SHOW },
  { value: ApplicationStatus.NO_SHOW_CANCELED, status: null },
  { value: ApplicationStatus.PENDING_NO_SHOW, status: null },
  { value: ApplicationStatus.CANCELED, status: null },
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
