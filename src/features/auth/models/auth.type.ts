export interface JwtToken {
  access_token: string;
}

export type PolicyType = 'TERMS_OF_SERVICE' | 'PRIVACY_POLICY';

export interface CreateNewPolicyDto {
  type: PolicyType;
  version: string;
}

export interface CreateNewPolicyResponseDto {
  id: string;
  type: PolicyType;
  version: string;
  isActive: boolean;
  createdAt: string;
}

export interface UserLoginDto {
  agreedToTerms?: boolean;
  agreedToPrivacy?: boolean;
  termsVersion?: string;
  privacyVersion?: string;
}

export interface ConsentVersionInfo {
  currentVersion: {
    version: string;
    agreedAt: string;
  } | null;
  requiredVersion: string;
}

export interface RequiredConsents {
  terms: ConsentVersionInfo;
  privacy: ConsentVersionInfo;
}

export type ConsentErrorCode = 'CONSENT_REQUIRED' | 'CONSENT_UPDATE_REQUIRED';

export interface ConsentRequiredErrorDto {
  message: string;
  errorCode: ConsentErrorCode;
  statusCode: number;
  requiredConsents?: RequiredConsents;
}

export interface CreateMoveOutScheduleDto {
  title: string;
  applicationStartDate: string;
  applicationEndDate: string;
  inspectionStartDate: string;
  inspectionEndDate: string;
}

export interface MoveOutScheduleResDto {
  id: number;
  title: string;
  applicationStartDate: string;
  applicationEndDate: string;
  inspectionStartDate: string;
  inspectionEndDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateMoveOutScheduleDto {
  title?: string;
  applicationStartDate?: string;
  applicationEndDate?: string;
  inspectionStartDate?: string;
  inspectionEndDate?: string;
}
