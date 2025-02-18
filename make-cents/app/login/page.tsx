import { PennyButton, PennyInput } from '@/components/UserInput';
import { signin } from './actions';

export default async function LoginPage() {
  return (
    <form>
      <div
        className={[
          'flex flex-col gap-1 items-center justify-center h-screen mx-auto',
          'max-w-md w-full',
        ].join(' ')}
      >
        <label className='w-full' htmlFor='email'>
          Email
        </label>
        <PennyInput
          className='w-full h-10 bg-transparent outline-none'
          id='email'
          type='email'
          name='email'
          required
        />
        <label className='w-full' htmlFor='password'>
          Password
        </label>
        <PennyInput
          className='w-full h-10 bg-transparent outline-none'
          id='password'
          type='password'
          name='password'
          required
        />
        <PennyButton formAction={signin}>Sign in</PennyButton>
      </div>
    </form>
  );
}
