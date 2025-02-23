import { createPlaidClient } from '@/plaid/server';
import { NextRequest, NextResponse } from 'next/server';
import { TransactionsSyncRequest } from 'plaid';

export async function POST(req: NextRequest) {
  if (!process.env.PLAID_CLIENT_ID) {
    throw new Error('The Plaid Client ID was not found in the environment.');
  }

  if (!process.env.PLAID_SECRET) {
    throw new Error('The Plaid Secret was not found in the environment.');
  }

  const { access_token } = await req.json();

  const { plaidClient } = createPlaidClient(
    process.env.PLAID_CLIENT_ID,
    process.env.PLAID_SECRET,
    'sandbox'
  );

  const request: TransactionsSyncRequest = {
    access_token: access_token,
    // cursor: cursor,
  };

  try {
    const response = await plaidClient.transactionsSync(request);
    console.log('Completed a Transactions Sync request.');
    const data = response.data;

    return NextResponse.json({
      status: 200,
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: error });
  }
}
