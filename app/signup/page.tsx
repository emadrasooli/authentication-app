"use client"

import React from 'react'

import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default function Signup() {
  const onClick = () => {
    redirect('/signin')
  }
  return (
    <div className='space-y-6 flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-semibold'>sign up page</h1>
        <Button onClick={onClick} variant={'link'} className='text-gray-400'>Already have an account!</Button>
    </div>
  )
}