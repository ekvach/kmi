import { test, expect } from '@playwright/test';
import { UriProviderApi } from '../../../../src/providers/UriProviderApi';
import { RegistrationResponse } from '../../../../src/responses/RegistrationResponse';

const apiCreds = require('../../../../properties/credentials/api/api-credentials.json');
const testData = require('../../../../properties/userData/test-data.json');

test.use({
    baseURL: UriProviderApi.baseUri,
    extraHTTPHeaders: {
        Authorization: apiCreds.accessToken
    }
});

test('Verify User can be registered', async ({ request }) => {
    const response = await request.post(UriProviderApi.registrationsPath
        , {
            data: {
                body: JSON.stringify({ userId: testData.userId, courseId: testData.courseId })
            }
        }
    );

    expect(response.ok(),
        'POST registration response should have 200 status')
        .toBeTruthy();

    const resigtration = await response.json() as RegistrationResponse;
});
