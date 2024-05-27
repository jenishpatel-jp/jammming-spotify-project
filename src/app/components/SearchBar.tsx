'use client'

import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import React, { useState, ChangeEvent } from 'react'

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ( {onSearch} ) => {
    const [term, setTerm] = useState<string>('');

    const passTerm = () => {
        onSearch(term);
        console.log("I'm searching for " + term)
    }

    const handleTermChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value);
    }

    return (
        <div className='flex w-full border-4 border-purple-500 rounded-md m-2 bg-pink-200 shadow-lg'>
            <input
            placeholder='Search for a Song or Artist here'
            className='w-full text-center border-purple-500 placeholder-purple-500 font-bold text-lg bg-pink-200 p-4 focus:outline-none active:border-pink-500'
            onChange={handleTermChange}
            onKeyDownCapture={ e => {if (e.key === 'Enter'){
                console.log(`I have pressed enter and I am searching for ${term}`)
                passTerm();
            }}}
            />              
            <button
            onClick={passTerm}
            >
                <MagnifyingGlassIcon className = "text-purple-500 bg-pink-200 h-10 max-w-10" />
            </button>

        </div>
    )
}

export default SearchBar