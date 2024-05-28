import React from 'react'
import TrackList from './TrackList'
import { Tracks } from '../page';

interface SearchResultsProps {
  searchResults: Tracks[];
  onAdd: (track: Tracks) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({searchResults, onAdd}) => {
  return (
    <div className='flex flex-col w-1/2 lg:flex-1 border-4 border-purple-500 mr-10 ml-10 mt-10 p-2 shadow-lg'>
      <div className='mx-2 my-5' >
        <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
      </div>
    </div>
  );
}

export default SearchResults