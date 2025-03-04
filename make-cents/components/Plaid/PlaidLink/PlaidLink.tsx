'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink,
} from 'react-plaid-link';
import { PennyButton } from '../../UserInput';
import { TransactionsSyncResponse } from 'plaid';
import Image from 'next/image';

export interface PlaidLinkProps {
  onPublicTokenAcquired: (publicToken: string) => void;
}

export function PlaidLink() {
  const formatCurrency = (
    amount: number,
    locale: string = 'en-US',
    currency: string = 'USD'
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const [publicToken, setPublicToken] = useState<string | null>(null);
  const [acquiringAccessToken, setAcquiringAccessToken] = useState(false);
  const [linkMetadata, setLinkMetadata] =
    useState<PlaidLinkOnSuccessMetadata | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [itemId, setItemId] = useState<string | null>(null);
  const [transactions, setTransactions] =
    useState<TransactionsSyncResponse | null>(null);

  const onAcquirePublicTokenSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      console.log(metadata);

      try {
        // exchange public token (if using Item-based products):
        const response = await fetch('/plaid/item/public_token/exchange', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_token,
          }),
        });

        const { access_token, item_id } = await response.json();
        setAcquiringAccessToken(false);
        setAccessToken(access_token);
        setItemId(item_id);
      } catch (error) {
        console.error('Error exchanging public token:', error);
      }
    },
    []
  );

  useEffect(() => {
    async function fetchLinkToken() {
      try {
        // const response = await fetch('/plaid/sandbox/public_token/create');
        const response = await fetch('/plaid/link/token/create', {
          method: 'POST',
          body: JSON.stringify({ userId: 'user-good' }),
        });
        const { link_token } = await response.json();
        setPublicToken(link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    }

    fetchLinkToken();
  }, []);

  // The usePlaidLink hook manages Plaid Link creation
  // It does not return a destroy function;
  // instead, on unmount it automatically destroys the Link instance
  const config: PlaidLinkOptions = {
    onSuccess: (public_token, metadata) => {
      console.log('public_token:', public_token);
      setLinkMetadata(metadata);
      console.log('metadata:', metadata);
      setAcquiringAccessToken(true);
      onAcquirePublicTokenSuccess(public_token, metadata);
    },
    onExit: (err, metadata) => {
      console.log('err:', err);
      console.log('metadata:', metadata);
    },
    onEvent: (eventName, metadata) => {
      console.log('eventName:', eventName);
      console.log('metadata:', metadata);
    },
    token: publicToken,
  };

  const { open, ready } = usePlaidLink(config);

  const getTransactionsAsync = async (accessToken: string, itemId: string) => {
    try {
      const response = await fetch('/plaid/transactions/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: accessToken,
          item_id: itemId,
        }),
      });

      const { data } = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className='h-full p-4 flex flex-col gap-4 items-center'>
      {acquiringAccessToken && (
        <p className='animate-pulse'>Acquiring Access Token.</p>
      )}
      {!accessToken && (
        <PennyButton onClick={() => open()} disabled={!ready}>
          Connect your bank account
        </PennyButton>
      )}
      {/* {publicToken && <p>{publicToken}</p>} */}
      {linkMetadata && <p>{JSON.stringify(linkMetadata, null, 3)}</p>}
      <div className='flex flex-row gap-4'>
        {linkMetadata &&
          linkMetadata.accounts &&
          linkMetadata.accounts.map((account) => (
            <div
              key={account.id}
              className={[
                'w-80',
                'rounded-xl p-4',
                'flex flex-col gap-0.5',
                'bg-neutral-800',
                'shadow-sm',
              ].join(' ')}
            >
              <p className='text-lg font-light'>{account.name}</p>
              <code>{`**** **** **** ${account.mask}`}</code>
              <p className='text-sm'>
                {account.subtype.charAt(0).toUpperCase() +
                  account.subtype.slice(1)}
              </p>
              {/* <p>{account.type}</p> */}
              <p>{account.verification_status}</p>
            </div>
          ))}
      </div>
      {publicToken && !linkMetadata && (
        <PennyButton
          onClick={() => {
            setPublicToken(null);
            setLinkMetadata(null);
          }}
        >
          Clear Public Token
        </PennyButton>
      )}
      {publicToken && linkMetadata && (
        <PennyButton
          onClick={() => onAcquirePublicTokenSuccess(publicToken, linkMetadata)}
        >
          Get Access Token
        </PennyButton>
      )}
      {accessToken && itemId && (
        <PennyButton onClick={() => getTransactionsAsync(accessToken, itemId)}>
          Get Transactions
        </PennyButton>
      )}
      {transactions && (
        <>
          <h2 className='text-3xl font-light'>Transactions</h2>
          <div className='overflow-y-auto flex flex-col gap-1 p-1'>
            {transactions.added.map((transaction) => (
              <div
                key={transaction.transaction_id}
                className={[
                  'cursor-default',
                  'max-w-96',
                  'p-2 rounded-lg shadow-md',
                  'flex flex-col gap-1',
                  transaction.amount >= 0
                    ? 'bg-neutral-600 text-neutral-200'
                    : 'bg-emerald-700 text-emerald-100',
                ].join(' ')}
              >
                <div className='flex flex-row justify-between'>
                  <div className='flex flex-row gap-2'>
                    {transaction.logo_url && (
                      <Image
                        className='rounded-md shadow-sm'
                        src={transaction.logo_url}
                        width={100}
                        height={100}
                        alt='Merchant Logo'
                      />
                    )}
                    <div className='flex flex-col'>
                      <p
                        className={[
                          'text-lg pb-2',
                          transaction.amount >= 0
                            ? 'text-neutral-100'
                            : 'text-emerald-50',
                        ].join(' ')}
                      >
                        {transaction.merchant_name}
                      </p>
                      <code
                        className={[
                          'text-sm px-1 py-0.5 rounded-md shadow-inner',
                          transaction.amount >= 0
                            ? 'bg-neutral-700'
                            : 'bg-emerald-900',
                        ].join(' ')}
                      >
                        {transaction.name}
                      </code>
                    </div>
                  </div>
                  <p className='text-right text-xl font-medium'>
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
                <div
                  className={[
                    'rounded-md p-1 shadow-inner',
                    transaction.amount >= 0
                      ? 'bg-neutral-700'
                      : 'bg-emerald-900',
                  ].join(' ')}
                >
                  <code className='text-sm break-words'>
                    {transaction.personal_finance_category
                      ? JSON.stringify(
                          transaction.personal_finance_category,
                          null,
                          3
                        )
                      : null}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
