'use client';
import { PennyButton, PennyInput } from '@/components/UserInput';
import { type User } from '@supabase/supabase-js';

export default function AccountForm({ user }: { user: User | null }) {
  return (
    <div className='flex flex-col gap-1 items-center justify-center h-screen mx-auto max-w-md'>
      <label htmlFor='email' className='w-full'>
        Email
      </label>
      <PennyInput id='email' type='text' value={user?.email} disabled />
      <form action='/auth/signout' method='post'>
        <PennyButton type='submit'>Sign out</PennyButton>
      </form>
    </div>
  );
}
