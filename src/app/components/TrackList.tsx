import React from 'react'
import Track from './Track'
import data from '../sample.data.json'
import { Tracks } from '../page'

interface TrackListProps {
    isRemoval: boolean;
    tracks: (Tracks[]);
    onAdd?: (track: Tracks) => void;
    onRemove?: (track: Tracks) => void;

}

const TrackList: React.FC<TrackListProps> = ( {isRemoval, tracks, onAdd, onRemove}  ) => {
    return (
        <div>
            {
                tracks.map(track => 
                <Track
                    track={track}
                    key={track.id}
                    isRemoval={isRemoval}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
            )
            }
        </div>
    )
}

export default TrackList