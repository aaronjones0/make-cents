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

export interface PlaidLinkProps {
  onPublicTokenAcquired: (publicToken: string) => void;
}

export function PlaidLink() {
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
    <div>
      <div className='flex flex-col gap-4 items-center'>
        {acquiringAccessToken && (
          <p className='animate-pulse'>Acquiring Access Token.</p>
        )}
        {!accessToken && (
          <PennyButton onClick={() => open()} disabled={!ready}>
            Connect your bank account
          </PennyButton>
        )}
        {publicToken && <p>{publicToken}</p>}
        {linkMetadata && <p>{JSON.stringify(linkMetadata, null, 3)}</p>}
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
            onClick={() =>
              onAcquirePublicTokenSuccess(publicToken, linkMetadata)
            }
          >
            Get Access Token
          </PennyButton>
        )}
        {accessToken && itemId && (
          <PennyButton
            onClick={() => getTransactionsAsync(accessToken, itemId)}
          >
            Get Transactions
          </PennyButton>
        )}
        {transactions && (
          <div className='overflow-y-auto'>
            <h2>Transactions</h2>
            {transactions.added.map((transaction) => (
              <p key={transaction.transaction_id}>
                {transaction.name} - {transaction.amount}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
