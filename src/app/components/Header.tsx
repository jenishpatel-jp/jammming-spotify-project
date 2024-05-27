'use client'

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {

    const {data: session} = useSession();


    return (
        <div className="self-end">
            {session? (
                <button 
                className="m-1 border-4 border-spacing-2 rounded-md p-2 hover:bg-pink-200 border-pink-200 font-medium shadow-md"
                onClick={() => signOut()}
                >
                    Sign Out
                </button>
            ): 
            (
                <button
                className="m-1 border-2 border-spacing-2 rounded p-2 hover:bg-pink-200 border-pink-200 font-medium"
                onClick={() => signIn()}
                >
                    Sign In
                </button>
            )}
        </div>
    )
    }

export default Header;