'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'

const SearchBar = () => {
    const [term, setTerm] = useState("");

    return (
        <div className='flex w-full'>
            <input
            placeholder='Search for a Song or Artist here'
            className='h-10 w-full text-center text-black'
            />
            <button>
                <MagnifyingGlassIcon className = "text-black bg-white h-10 max-w-10" />
            </button>

        </div>
    )
}

export default SearchBar