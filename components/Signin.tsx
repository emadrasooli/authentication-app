"use client";

import { redirect } from "next/navigation";
import { Button } from "./ui/button";

import { LogInIcon } from "lucide-react";

const   Signin = () => {
    const onClick = () => {
        redirect("/signin");
      };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">Authentication App</h1>
        <p className="text-gray-400 pt-1">An application for authenticate the user</p>
        <div className="flex flex-row mt-6">
        <Button onClick={onClick} variant={"secondary"} size={"lg"}><LogInIcon />Signin</Button>
        </div>
    </div>
  )
}

export default Signin