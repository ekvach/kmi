import { test, expect } from '@playwright/test';
import { UriProviderApi } from '../../../../src/providers/UriProviderApi';
import { RegistrationResponse } from '../../../../src/responses/RegistrationResponse';

const apiCreds = require('../../../../properties/credentials/api/api-credentials.json');

test.use({
    baseURL: UriProviderApi.baseUri,
    extraHTTPHeaders: {
        Authorization: apiCreds.accessToken
    }
});

test('Verify Registrations can be gotten', async ({ request }) => {
    const response = await request.get(UriProviderApi.registrationsPath);

    expect(response.ok(),
        'GET registration response should have 200 status')
        .toBeTruthy();

    const resigtration = await response.json() as RegistrationResponse[];
});