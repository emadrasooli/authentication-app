'use client';

import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import { LogOutIcon } from 'lucide-react';


export default function Dashboard() {
  const { data: session} = useSession();

  return (
    <div className='space-y-6 flex flex-col items-center justify-center h-screen'>
      <h1 className=' text-2xl font-semibold'>Dashboard</h1>
      <div className='flex flex-row items-center bg-white text-black p-6 rounded-lg gap-3 w-[400px]'>
        {session?.user?.image && <img src={session.user.image} alt="Profile Picture" className='border border-white rounded-full h-16 w-16' />}
        <div className='flex flex-col'>
          <p className='font-medium'>{session?.user?.name}</p>
          <p className='text-sm text-gray-400'>{session?.user?.email}</p>
        </div>
      </div>
        <Button onClick={() => signOut({ callbackUrl: '/signin' })} variant={'destructive'} size={"lg"}><LogOutIcon />Sign out</Button>
    </div>
  );
}
