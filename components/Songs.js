import React from 'react'
import {useRecoilState, useRecoilValue} from "recoil";
import {playlistState} from "../atoms/playlistAtom";
import useSpotify from '../hooks/useSpotify';
import Song from "./Song";

function Songs() {
    const playlist = useRecoilValue(playlistState);
  
  return (
    <div className="px-8 flex flex-col space-y-1 text-white">
        {playlist?.tracks.items.map((track,i) => (
            <Song key= {track.track.id} track={track} order={i}/> 
        ))}
    </div>
  );
  
}

export default Songs;