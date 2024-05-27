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
        <div className='flex w-full'>
            <input
            placeholder='Search for a Song or Artist here'
            className='h-10 w-full text-center bg-pink-200 border-2 border-purple-500 rounded-md placeholder-purple-500 focus:border-purple-500'
            onChange={handleTermChange}
            onKeyDownCapture={ e => {if (e.key === 'Enter'){
                console.log(`I have pressed enter and I am searching for ${term}`)
                passTerm();
            }}}
            />              
            <button
            onClick={passTerm}
            >
                <MagnifyingGlassIcon className = "text-purple-500 bg-white h-10 max-w-10" />
            </button>

        </div>
    )
}

export default SearchBar