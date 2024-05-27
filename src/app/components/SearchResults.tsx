import React from 'react'
import TrackList from './TrackList'
import { Tracks } from '../page';

interface SearchResultsProps {
  searchResults: Tracks[];
  onAdd: (track: Tracks) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({searchResults, onAdd}) => {
  return (
    <div className='flex flex-col flex-1 border border-red-500 mr-5 p-2'>
      <div className='mx-2 my-5' >
        <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
      </div>
    </div>
  );
}

export default SearchResults