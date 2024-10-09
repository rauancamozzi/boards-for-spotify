import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SignOut } from "@phosphor-icons/react";
import Logo from "../assets/Vector.svg";

import { RecentTrack, Track } from "../types/Track";

import Footer from "../components/footer";
import getAllTracks from "../utils/tracks/getAllTracks";

export default function Stats() {
  const [token, setToken] = useState("");

  const [mostPlayedTracks, setMostReplayedTracks] = useState<Track[]>([])
  const [recentPlayedTracks, setRecentPlayedTracks] = useState<RecentTrack[]>([]);
  const [numberOfPlayedTracks, setNumberOfPlayedTracks] = useState(0);

  const [savedTracks, setSavedTracks] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = (window.localStorage.getItem("token") as string) || "";

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((e) => e.startsWith("access_token"))
        ?.split("=")[1] as string;

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token || "");

    const getMostPlayedTracks = async () => {
      const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: "tracks",
          limit: 6, 
          time_range: "long_term",
        },
      });

      setMostReplayedTracks(data.items);
    }

    const getRecentPlayedTracks = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: 5,
        }
      });
    
      setRecentPlayedTracks(data.items);
    }

    const fetchData = async () => {
      const numberOfTracks = await getAllTracks(token);
      setNumberOfPlayedTracks(numberOfTracks);
    }

    const fetchSavedTracks = async () => {
      let allTracks: unknown[] = [];
      let offset = 0;
      let hasMore = true;
  
      try {
        while (hasMore) {
          const { data } = await axios.get('https://api.spotify.com/v1/me/tracks', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                limit: 50,
                offset: offset,
            },
          });

          allTracks = allTracks.concat(data.items);
          offset += 50;
          hasMore = offset < data.total;
        }
        
        setSavedTracks(allTracks.length);
      } catch (error) {
        console.error('Erro ao buscar as músicas salvas:', error);
      }
    }

    if (token) {
      getMostPlayedTracks();
      getRecentPlayedTracks();
      fetchData();
      fetchSavedTracks();
    }
  }, [token]);

  const renderMostPlayedTracks = (index: number) => {
    if (!mostPlayedTracks[index] || !mostPlayedTracks[index].album || !mostPlayedTracks[index].album.images[0]) return null;

    return (
      <div key={mostPlayedTracks[index].id} className="flex flex-row gap-4">
        <p>{index}</p>
        <img
          src={mostPlayedTracks[index].album.images[0].url}
          alt=""
          className="w-12"
        />
        <div className="flex flex-col">
          <p className="font-bold">{mostPlayedTracks[index].name}</p>
          <p className="text-gray-400">{mostPlayedTracks[index].artists[0].name}</p>
        </div>
      </div>
    );
  }
  
  const renderRecentPlayedTracks = () => {
    return (
      <div className="flex flex-col gap-4">
        {recentPlayedTracks.map((item, index) => {
          if (!item || !item.track.album || !item.track.name) return null;
  
          return (
            <div key={index} className="flex flex-row gap-4">
              <img
                src={item.track.album.images[0].url}
                alt=""
                className="w-12"
              />
              <div className="flex flex-col">
                <p className="font-bold">{item.track.name}</p>
                <p className="text-gray-400">{item.track.artists[0].name}</p>
              </div>
            </div>
          );
        })}
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken("");

    navigate("/");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-stone-900">
      <div className="bg-stone-900 w-full h-24 top-0 flex flex-row items-center px-32 justify-between border-b-2 border-stone-800">
        <div className="flex flex-row gap-4 items-center text-2xl font-bold">
          <img src={Logo} alt="" />
          <p className="text-white">Boards for Spotify</p>
        </div>

        <button onClick={logout}>
          <SignOut color="#1ED760" weight="fill" size={32} />
        </button>
      </div>

      <div className="w-full px-32 p-2">
        <ul className="w-auto flex flex-row justify-start items-center gap-2 text-white">
          <li className="border-b-2 border-green">Tracks</li>
          <li>Artists</li>
          <li>Albums</li>
        </ul>
      </div>

      <div className="w-full h-full grid grid-cols-4 grid-rows-3 bg-gray-900 px-32 gap-2">
        <div className="grid grid-cols-3 grid-rows-3 col-span-2 row-span-2 bg-gray-800 gap-2 text-gray-50">
          <div className="col-span-2 row-span-2 bg-gray-700 flex flex-col gap-4 p-4">
            <p className="text-gray-950">Most played tracks</p>
            {renderMostPlayedTracks(0)}
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700 flex flex-col gap-4 p-4">
            {renderMostPlayedTracks(1)}
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700 flex flex-col gap-4 p-4">
            {renderMostPlayedTracks(2)}
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700 flex flex-col gap-4 p-4">
            {renderMostPlayedTracks(3)}
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700 flex flex-col gap-4 p-4">
            {renderMostPlayedTracks(4)}
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700 flex flex-col gap-4 p-4">
            {renderMostPlayedTracks(5)}
          </div>
        </div>
        <div className="col-span-2 row-span-1 bg-gray-800"></div>
        <div className="col-span-1 row-span-2 bg-gray-700 text-gray-50 flex flex-col gap-4 p-4">
          <p className="text-gray-950">Recent played tracks</p>
          {renderRecentPlayedTracks()}
        </div>
        <div className="col-span-1 row-span-1 bg-gray-700 text-gray-50 flex flex-col gap-4 p-4">
          <p className="text-gray-950">Saved tracks</p>
          <p className="text-9xl text-center font-bold">{savedTracks}</p>
        </div>
        <div className="col-span-1 row-span-1 bg-gray-700 text-gray-50 flex flex-col gap-4 p-4">
          <p className="text-gray-950">Number of played tracks</p>
          <p className="text-9xl text-center font-bold">{numberOfPlayedTracks}</p>
        </div>
        <div className="col-span-1 row-span-1 bg-gray-800"></div>
        <div className="col-span-1 row-span-1 bg-gray-800"></div>
      </div>

      <Footer />
    </div>
  );
}
