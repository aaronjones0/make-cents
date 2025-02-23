import { createPlaidClient } from '@/plaid/server';
import { NextRequest, NextResponse } from 'next/server';
import { ItemPublicTokenExchangeRequest } from 'plaid';

export async function POST(req: NextRequest) {
  if (!process.env.PLAID_CLIENT_ID) {
    throw new Error('The Plaid Client ID was not found in the environment.');
  }

  if (!process.env.PLAID_SECRET) {
    throw new Error('The Plaid Secret was not found in the environment.');
  }

  const { public_token } = await req.json();

  const { plaidClient } = createPlaidClient(
    process.env.PLAID_CLIENT_ID,
    process.env.PLAID_SECRET,
    'sandbox'
  );

  const request: ItemPublicTokenExchangeRequest = {
    public_token: public_token,
  };

  try {
    const response = await plaidClient.itemPublicTokenExchange(request);
    const token = response.data.access_token;
    const itemId = response.data.item_id;
    console.log(
      `Completed a Public Token exchange for an Access Token and Item ID. Request ID: ${response.data.request_id}`
    );
    return NextResponse.json({
      status: 200,
      access_token: token,
      item_id: itemId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: error });
  }
}
