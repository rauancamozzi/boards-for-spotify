import Track from "../components/track";
import Footer from "../components/footer";
import Artist from "../components/artist";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignOut } from "@phosphor-icons/react";
import Logo from "../assets/Vector.svg";
import getAllTracks from "../utils/tracks/getAllTracks";
import axios from "axios";
import getLongTermTracks from "../utils/tracks/getLongTermTracks";
import getMostPlayedTracks from "../utils/tracks/getMostPlayedTracks";
import getToken from "../utils/auth/getToken";

interface Album {
  images: {
    url: string;
  }[];
}

interface Artist {
  name: string;
}

interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
}

interface RecentTrackItem {
  track: Track;
}

export default function Stats() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [recentTracks, setRecentTracks] = useState<RecentTrackItem[]>([]);

  const [mostPlayedTracks, setMostPlayedTracks] = useState<Track[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setToken(getToken());

    const fetchData = async () => {
      const mostPlayedTracks = await getMostPlayedTracks(token);
      setMostPlayedTracks(mostPlayedTracks);
      console.log(mostPlayedTracks);
    };
  
    fetchData();
  }, [token]);

  const renderMostPlayedTracks = (index: number) => {
    if (!mostPlayedTracks[index] || !mostPlayedTracks[index].album || !mostPlayedTracks[index].album.images[0]) return null;

    return (
      <div key={mostPlayedTracks[index].id} className="flex flex-row">
        <img src={mostPlayedTracks[index].album.images[0].url} alt="" className="w-12" />
        <div className="flex flex-col">
          <p>{mostPlayedTracks[index].name}</p>
          <p>{mostPlayedTracks[index].artists[0].name}</p>
        </div>
      </div>
    );
  };

  // const renderRecentPlayedTracks = () => {
  //   console.log("recent-tracks", recentTracks);

  //   return (
  //     <div>
  //       {recentTracks.map((item, index) => {
  //         if (!item.track || !item.track.album || !item.track.name) {
  //           return null;
  //         }

  //         return (
  //           <div key={index}>
  //             <p>{item.track.name}</p>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

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
        <div className="grid grid-cols-3 grid-rows-3 col-span-2 row-span-2 bg-gray-800 gap-2">
          <div className="col-span-2 row-span-2 bg-gray-700">
            <p>Most played tracks</p>
            {renderMostPlayedTracks(0)}
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700">
            {renderMostPlayedTracks(1)}
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700">
            {renderMostPlayedTracks(2)}
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700">
            {renderMostPlayedTracks(3)}
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700">
            {renderMostPlayedTracks(4)}
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700">
            {renderMostPlayedTracks(5)}
          </div>
        </div>
        <div className="col-span-2 row-span-1 bg-gray-800"></div>
        <div className="col-span-1 row-span-2 bg-gray-800">
          {/* {renderRecentPlayedTracks()} */}
        </div>
        <div className="col-span-1 row-span-1 bg-gray-800"></div>
        <div className="col-span-1 row-span-1 bg-gray-800"></div>
        <div className="col-span-1 row-span-1 bg-gray-800"></div>
        <div className="col-span-1 row-span-1 bg-gray-800"></div>
      </div>

      <Footer />
    </div>
  );
}
