export class UriProviderApi {
    private static _baseUri = 'https://demo-auto.testing.kmionline.com';

    private static _registrationsPath = '/registrations';

    private static _apiPathPrefix = '/api';

    static get baseUri() {
        return this._baseUri;
    }

    static get registrationsPath() {
        return this._apiPathPrefix + this._registrationsPath;
    }

    static composeRegisrationUri() {
        return `${this.baseUri}${this.registrationsPath}`;
    }
}