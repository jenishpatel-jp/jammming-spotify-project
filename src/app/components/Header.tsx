'use client'

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {

    const {data: session} = useSession();


    return (
        <div className="self-end">
            {session? (
                <button 
                className="m-1 border border-spacing-2 rounded p-2"
                onClick={() => signOut()}
                >
                    Sign Out
                </button>
            ): 
            (
                <button
                className="m-1 border border-spacing-2 rounded p-2"
                onClick={() => signIn()}
                >
                    Sign In
                </button>
            )}
        </div>
    )
    }

export default Header;