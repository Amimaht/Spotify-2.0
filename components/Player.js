import { React, useState, useEffect, useCallback } from 'react'
import { isPlayingState, currentTrackIdState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState} from 'recoil'
import { useSession } from 'next-auth/react'
import useSongInfo from '../hooks/useSongInfo'
import {
  SwitchHorizontalIcon,
  RewindIcon,
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
  ReplyIcon,
} from '@heroicons/react/solid'
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { VolumeUpIcon } from '@heroicons/react/outline';
import { debounce } from 'lodash'

function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackID] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo(currentTrackId);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Now Playing: ', data.body?.item)
        setCurrentTrackID(data.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  }
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 400),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume]);

  return (
    <div
      className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs
    text-white md:px-8 md:text-base">
      <div>
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo?.album.images?.[0].url}
          alt=""
        />
        <div>
          <h3> {songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
        <RewindIcon
          onClick={() => spotifyApi.skipToPrevious()}
          className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
        />

        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayPause}
            className="h-10 w-10 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
          />
        ) : (
          <PlayIcon
            onClick={handlePlayPause}
            className="h-10 w-10 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
          />
        )}
        <FastForwardIcon
          onClick={() => spotifyApi.skipToNext()}
          className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
        />

        <ReplyIcon className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
      </div>

      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"/>
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
      </div>
    </div>
  )
}

export default Player
