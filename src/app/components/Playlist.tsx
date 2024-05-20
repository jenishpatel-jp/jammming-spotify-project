import React, { ChangeEvent } from "react";
import TrackList from "./TrackList";
import { Track } from "../page";

interface PlaylistProps {
  playlistTracks: Track[];
  onRemove: (id: string) => void;
  onNameChange: (name: string) => void;
  onAdd?: () => void;
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
    <div className="flex flex-col m-5 border flex-1 justify-items-center" >
      <input 
      defaultValue={"New Playlist"} 
      onChange={handleNameChange} 
      className=" bg-stone-800 text-center mx-2 my-4 text-xl"/>
      <button className="border rounded-md w-fit p-5 mx-auto hover:bg-green-900" >SAVE TO SPOTIFY</button>
    </div>
  );
};

export default Playlist;
