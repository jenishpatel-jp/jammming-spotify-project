import React from 'react'
import TrackList from './TrackList'

const SearchResults = () => {
  return (
    <div className='flex flex-col flex-1 border'>
      <div className='mx-2 my-5' >
        <h1 className='mx-2 my-2' >Search Results</h1>
        <p className='mx-2 my-2'>Song 1</p>
        <p className='mx-2 my-2'>Song 2</p>
        <p className='mx-2 my-2'>Song 3</p>
      </div>
    </div>
  );
}

export default SearchResults