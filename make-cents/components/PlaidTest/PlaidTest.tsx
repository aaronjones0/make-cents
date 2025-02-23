'use client';
import { useEffect, useState } from 'react';
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { PennyButton } from '../UserInput';

export function PlaidTest() {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLinkToken() {
      try {
        // const response = await fetch('/plaid/sandbox/public_token/create');
        const response = await fetch('/plaid/link/token/create', {
          method: 'POST',
          body: JSON.stringify({ userId: 'user-good' }),
        });
        const { link_token } = await response.json();
        setLinkToken(link_token);
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
      console.log('metadata:', metadata);
    },
    onExit: (err, metadata) => {
      console.log('err:', err);
      console.log('metadata:', metadata);
    },
    onEvent: (eventName, metadata) => {
      console.log('eventName:', eventName);
      console.log('metadata:', metadata);
    },
    token: linkToken,
  };

  const { open, exit, ready } = usePlaidLink(config);

  return (
    <div>
      <div className='flex flex-row gap-4'>
        <PennyButton onClick={() => open()} disabled={!ready}>
          Connect your bank account
        </PennyButton>
        <PennyButton onClick={() => exit()} disabled={!ready}>
          Exit
        </PennyButton>
      </div>
    </div>
  );
}
