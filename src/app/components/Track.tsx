'use client'

import React from 'react'
import { Tracks } from '../page';

interface TrackProps {
    track: {
        id: string;
        uri: string;
        name: string;
        artist: string;
        album: string;
    },
    isRemoval: boolean;
    onAdd?: (track: Tracks) => void;
    onRemove?: (track: Tracks) => void;
}

const Track: React.FC<TrackProps> = ({track, isRemoval, onAdd, onRemove}) => {

    const renderAction = () => {
        if (isRemoval) {
            return <button className='text-2xl mx-10 hover:text-4xl p-7 hover:bg-stone-700 rounded-full ' >-</button>
        } else {
            return <button className='text-2xl mx-10 hover:text-4xl p-7 hover:bg-stone-700 rounded-full ' >+</button>
        }
    }

    const passTrack = () => {
        if (onAdd){
            onAdd(track);
        };
    }

    const passTrackToRemove = () => {
        if (onRemove){
            onRemove(track);
        }
    }

    return (
        <div className='flex flex-row justify-between' >
            <div className='mx-2 my-4 hover:bg-stone-700 p-2 rounded-md flex-1'>
                <h3 className='text-xl font-bold' >{track.name}</h3>
                <p>{track.artist} | {track.album} </p>
            </div>
            {renderAction()}
        </div> 
        );
}

export default Track