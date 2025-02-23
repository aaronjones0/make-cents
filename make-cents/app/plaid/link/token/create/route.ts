import { createPlaidClient } from '@/plaid/server';
import { NextRequest, NextResponse } from 'next/server';
import { CountryCode, LinkTokenCreateRequest, Products } from 'plaid';

export async function POST(req: NextRequest) {
  if (!process.env.PLAID_CLIENT_ID) {
    throw new Error('The Plaid Client ID was not found in the environment.');
  }

  if (!process.env.PLAID_SECRET) {
    throw new Error('The Plaid Secret was not found in the environment.');
  }

  const { userId } = await req.json();

  const { plaidClient, sessionOptions } = createPlaidClient(
    process.env.PLAID_CLIENT_ID,
    process.env.PLAID_SECRET,
    'sandbox'
  );

  const request: LinkTokenCreateRequest = {
    user: {
      client_user_id: userId, // Any kind of unique identifier for the user. Go with email address or Supabase User ID.
      // phone_number: '+1 415 5550123',
    },
    client_name: 'Make Cents',
    products: [Products.Auth, Products.Transactions],
    // transactions: {
    //   days_requested: 730,
    // },
    country_codes: [CountryCode.Us],
    language: 'en',
    // webhook: 'https://sample-web-hook.com',
    // redirect_uri: 'http://localhost:8000',
    // account_filters: {
    //   depository: {
    //     account_subtypes: ['checking', 'savings'],
    //   },
    //   credit: {
    //     account_subtypes: ['credit card'],
    //   },
    // },
  };
  try {
    const response = await plaidClient.linkTokenCreate(request, sessionOptions);
    const linkToken = response.data.link_token;
    return NextResponse.json({ status: 200, link_token: linkToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: error });
  }
}
