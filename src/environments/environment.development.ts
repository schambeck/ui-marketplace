// @ts-ignore
import config from '../../auth_config.json';

const { domain, clientId, authorizationParams: { audience, redirect_uri }} = config as {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience?: string;
    redirect_uri?: string;
  },
  apiUri: string;
  errorPath: string;
};

export const environment = {
  baseUrl: 'http://localhost:8080',
  auth: {
    domain,
    clientId,
    redirectUri: redirect_uri,
    audience,
  },
  httpInterceptor: {
    allowedList: [
      {
        uri: "http://localhost:8080/users*"
      },
      {
        uri: "http://localhost:8080/products*"
      },
      {
        uri: "http://localhost:8080/shopping-cart*"
      },
      {
        uri: "http://localhost:8080/carts*"
      }
    ]
  },
};
