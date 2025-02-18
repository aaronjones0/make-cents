import AccountForm from './AccountForm';
import { createClient } from '@/utilities/supabase/server';

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
