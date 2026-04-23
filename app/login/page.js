"use client";
import React,{useEffect} from 'react';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';

const Login = () => {
    const { data: session,status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session) {
            router.push("/profile");
        }
    }, [session, router]);
    return (
        <div className='px-4 flex flex-col gap-2 items-center justify-center w-full min-h-[83vh]'>
            <h1 className='font-bold text-xl text-center'>Login to get your chai!</h1><br />
            <button onClick={() => signIn("google")}>Login with Google</button>
            <button onClick={() => signIn("github")}>Login with GitHub</button>
            <button disabled onClick={() => signIn("facebook")}>Login with Facebook</button>
        </div>
    );
}
export default Login;