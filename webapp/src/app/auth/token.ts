export class Token {

  token_type: string;
  scope: string;
  expires_in: string;
  ext_expires_in: string;
  expires_on: string;
  not_before: string;
  resource: string;
  access_token: string;
  refresh_token: string;


  constructor(token_type: string, scope: string, expires_in: string, ext_expires_in: string, expires_on: string,
              not_before: string, resource: string, access_token: string, refresh_token: string) {
    this.token_type = token_type;
    this.scope = scope;
    this.expires_in = expires_in;
    this.ext_expires_in = ext_expires_in;
    this.expires_on = expires_on;
    this.not_before = not_before;
    this.resource = resource;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}
