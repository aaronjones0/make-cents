import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

export function createPlaidClient(
  clientId: string,
  secret: string,
  environment: string
): {
  plaidClient: PlaidApi;
  sessionOptions: {
    cookieName: string;
    password: string;
    cookieOptions: {
      secure: boolean;
    };
  };
} {
  const plaidClient = new PlaidApi(
    new Configuration({
      basePath: PlaidEnvironments[environment],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': clientId,
          'PLAID-SECRET': secret,
          // 'Plaid-Version': '2020-09-14',
        },
      },
    })
  );

  const sessionOptions = {
    cookieName: 'myapp_cookiename',
    password: 'complex_password_at_least_32_characters_long',
    // secure: true, // Should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  };

  return { plaidClient, sessionOptions };
}
