"use client";

import React from 'react'

import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { BsGithub } from 'react-icons/bs';
import { signIn } from 'next-auth/react';

export default function Signin() {
  const onClick = () => {
    redirect('/signup')
  }
  return (
    <div className='space-y-6 flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-semibold'>sign in page</h1>
        <Button onClick={() => signIn('github', { callbackUrl: "/dashboard"})} variant={'secondary'} size={'lg'} ><BsGithub /></Button>
        <Button onClick={onClick} variant={'link'} className='text-gray-400'>Don't have any account?</Button>
    </div>
  )
}
