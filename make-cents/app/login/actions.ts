'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/utilities/supabase/server';

export async function signin(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) redirect('/error');
  redirect('/account');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) redirect('/error');
  redirect('/');
}
