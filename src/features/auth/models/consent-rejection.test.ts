import { describe, expect, it } from 'vitest';

import { ConsentRejectionSchema } from '.';

const details = {
  message: 'Consent required for first login',
  errorCode: 'CONSENT_REQUIRED',
  statusCode: 403,
  requiredConsents: {
    terms: { requiredVersion: '260301' },
    privacy: { currentVersion: '250101', requiredVersion: '260302' },
  },
};

describe('ConsentRejectionSchema', () => {
  it('reads the consent versions the backend asks for', () => {
    expect(ConsentRejectionSchema.parse(details).requiredConsents).toEqual(
      details.requiredConsents,
    );
  });

  it('rejects details from other rejections', () => {
    expect(ConsentRejectionSchema.safeParse({ reason: 'other' }).success).toBe(false);
  });
});
