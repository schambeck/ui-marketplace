// @ts-ignore
import config from '../../auth_config.json';

const { domain, clientId, authorizationParams: { audience, redirect_uri }, apiUri} = config as {
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
  baseUrl: apiUri,
  mercadoPago: {
    locale: 'pt-BR'
  },
  keycloakUrl: 'http://localhost:9000',
  keycloakRealm: 'marketplace',
  keycloakClientId: 'ui-marketplace',
  auth: {
    domain,
    clientId,
    redirectUri: redirect_uri,
    audience,
  },
  httpInterceptor: {
    allowedList: [
      {
        uri: `${apiUri}/users*`
      },
      {
        uri: `${apiUri}/products*`
      },
      {
        uri: `${apiUri}/shopping-cart*`
      },
      {
        uri: `${apiUri}/carts*`
      },
      {
        uri: `${apiUri}/mercado-pago*`
      },
      {
        uri: `${apiUri}/images*`
      },
      {
        uri: `${apiUri}/object-storage*`
      }
    ]
  },
};
