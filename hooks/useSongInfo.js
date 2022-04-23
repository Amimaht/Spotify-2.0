import {React,useEffect,useState} from 'react' 
import {isPlayingState,currentTrackIdState} from "../atoms/songAtom";
import useSpotify from '../hooks/useSpotify';
import {useRecoilState, useRecoilValue} from "recoil";

function useSongInfo() {

    const spotifyApi = useSpotify();
    const [currentIdTrack, setCurrentIDTrack]= useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
       const fetchSongInfo = async () => {
           if (currentIdTrack) {
               const trackinfo = await fetch (
                   `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                   {
                       headers: {
                           Authorization : `Bearer ${spotifyApi.getAccessToken()}`
                       },
                   }
               ).then(res=> res.json());

               setSongInfo(trackinfo);
           }
       }
       fetchSongInfo();
}, [currentIdTrack,spotifyApi]);

return songInfo;
}

export default useSongInfo