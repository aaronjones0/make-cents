import { PlaidLink } from '@/components/Plaid';

export default async function Home() {
  return (
    <div className='flex flex-col gap-1 items-center justify-center h-screen mx-auto'>
      <PlaidLink />
    </div>
  );
}

