// @ts-ignore
import config from '../../auth_config.tailscale.json';
import { environment as devEnvironment } from './environment.development';

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
  ...devEnvironment,
  baseUrl: apiUri,
  mercadoPago: {
    locale: 'pt-BR'
  },
  keycloakUrl: 'https://thing.taildf99e0.ts.net:9443',
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
