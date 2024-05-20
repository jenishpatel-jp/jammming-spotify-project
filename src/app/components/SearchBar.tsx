'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState, ChangeEvent } from 'react'

const SearchBar = (  ) => {
    const [term, setTerm] = useState<string>('');

    const handleTermChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value);
    }

    const handleButtonClick = () => {
        console.log("Search button pressed");
    }

    return (
        <div className='flex w-full'>
            <input
            placeholder='Search for a Song or Artist here'
            className='h-10 w-full text-center text-black'
            onChange={handleTermChange}
            onKeyDownCapture={ e => {if (e.key === 'Enter'){
                console.log("Enter has been pressed");
            }}}
            />              
            <button
            onClick={handleButtonClick}
            >
                <MagnifyingGlassIcon className = "text-black bg-white h-10 max-w-10" />
            </button>

        </div>
    )
}

export default SearchBar