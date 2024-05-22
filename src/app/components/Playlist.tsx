import React, { ChangeEvent } from "react";
import TrackList from "./TrackList";
import { Tracks } from "../page";

interface PlaylistProps {
  playlistTracks: Tracks[];
  onRemove: (track: Tracks) => void;
  onNameChange: (name: string) => void;
}

const Playlist: React.FC<PlaylistProps> = ({
  playlistTracks,
  onRemove,
  onNameChange,
}) => {

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onNameChange(event.target.value);
  };

  return (
    <div className="flex flex-col m-5  flex-1 justify-items-center" >
      
      <input 
      defaultValue={"New Playlist"} 
      onChange={handleNameChange} 
      className=" bg-stone-800 text-center mx-2 my-4 text-xl"
      />

      <TrackList tracks={playlistTracks} onRemove={onRemove}  isRemoval={true} />

      <button 
      className="border rounded-md w-fit p-5 mx-auto hover:bg-green-900" 
      >
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
