import Track from "../components/track";
import Footer from "../components/footer";
import Artist from "../components/artist";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignOut } from "@phosphor-icons/react";
import axios from "axios";
import Logo from "../assets/Vector.svg";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Image {
  url: string;
}

interface Album {
  images: Image[];
}

interface Track {
  id: string;
  name: string;
  album: Album;
  images: Image[];
  artists: Artist[];
}

export default function Stats() {
  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("token");

    if (!storedToken && hash) {
      storedToken = hash
        .substring(1)
        .split("&")
        .find((e) => e.startsWith("access_token"))
        ?.split("=")[1] as string;

      window.location.hash = "";
      window.localStorage.setItem("token", storedToken);
    }

    setToken(storedToken || '');

    const getMostPlayedTracks = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 6,
          type: "tracks",
          time_range: "long_term"
        },
      });
  
      setTracks(data.items);
      console.log(data.items);
    };

    if (token) {
      getMostPlayedTracks();
    }
    
  }, [token]);

  const renderMostPlayedTracks = (index: number) => {
    return (
      <div key={tracks[index].id} className="flex flex-row">
        <img src={tracks[index].album.images[0].url} alt="" className="w-12" />
        <div className="flex flex-col">
          <p>{tracks[index].name}</p>
          <p>{tracks[index].artists[0].name}</p>
        </div>
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken('');

    navigate("/");
  };

  // const searchArtists = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();

  //   const { data } = await axios.get("https://api.spotify.com/v1/search", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       q: searchKey,
  //       type: "artist",
  //     },
  //   });

  //   setArtists(data.artists.items);
  // };

  // const renderArtists = () => {
  //   return artists.map((artist) => {
  //     return (
  //       <div key={artist.id}>
  //         {artist.images.length ? (
  //           <img className="w-12" src={artist.images[0].url} alt="" />
  //         ) : (
  //           <div>No image</div>
  //         )}
  //         {artist.name}
  //       </div>
  //     );
  //   });
  // }

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
          
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700">
          
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700">
        
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700">
       
          </div>
          <div className="col-span-1 row-span-1 bg-gray-700">
          </div>
        </div>
        <div className="col-span-2 row-span-1 bg-gray-800"></div>
        <div className="col-span-1 row-span-2 bg-gray-800"></div>
        <div className="col-span-1 row-span-1 bg-gray-800"></div>
        <div className="col-span-1 row-span-1 bg-gray-800"></div>
        <div className="col-span-1 row-span-1 bg-gray-800"></div>
        <div className="col-span-1 row-span-1 bg-gray-800"></div>
      </div>

      <Footer />

      {/* <div className="grid min-h-full w-full grid-cols-5 grid-rows-4 gap-5 p-20 xl:m-64 lg:m-32 md:m-16">
        <GridItem colSpan={1} rowSpan={2}>
          <p className="mb-4 text-sm text-green">Most played tracks</p>
          <div className="flex flex-col justify-between h-80">
            <Track trackName="Get Right Witcha" artistName="Migos" />
            <Track trackName="Get Right Witcha" artistName="Migos" />
            <Track trackName="Get Right Witcha" artistName="Migos" />
            <Track trackName="Get Right Witcha" artistName="Migos" />
            <Track trackName="Get Right Witcha" artistName="Migos" />
          </div>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          <div className="flex flex-col h-full items-center justify-center">
            <h1 className="text-yellow font-bold text-8xl">999</h1>
            <h2 className="text-green-secondary">Number of tracks played</h2>
          </div>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          <p className="mb-4 text-sm text-green">Most played artist</p>
          <div className="flex flex-col justify-start gap-2">
            <div className="bg-purple w-20 h-20"></div>
            <h1 className="text-yellow text-xl">Linkin Park</h1>
          </div>
        </GridItem>
        <div className="col-span-1 row-span-2 rounded-2xl bg-stone-800 border-purple border-[1px]"></div>
        <div className="col-span-1 row-span-1 rounded-2xl bg-stone-800 border-purple border-[1px]"></div>
        <div className="col-span-2 row-span-1 rounded-2xl bg-stone-800 border-purple border-[1px]"></div>
        <div className="col-span-1 row-span-3 rounded-2xl bg-stone-800 border-purple border-[1px]">
          
        </div>
        <GridItem colSpan={1} rowSpan={2}>
          <p className="mb-4 text-sm text-green">Most played artists</p>
          <div className="flex flex-col justify-between h-80">
            <Artist artistName="Linkin Park" />
            <Artist artistName="Linkin Park" />
            <Artist artistName="Linkin Park" />
            <Artist artistName="Linkin Park" />
            <Artist artistName="Linkin Park" />
          </div>
        </GridItem>
        <div className="col-span-2 row-span-1 rounded-2xl bg-stone-800 border-purple border-[1px]"></div>
        <div className="col-span-1 row-span-1 rounded-2xl bg-stone-800 border-purple border-[1px]"></div>
        <div className="col-span-1 row-span-1 rounded-2xl bg-stone-800 border-purple border-[1px]"></div>
        <div className="col-span-2 row-span-1 rounded-2xl bg-stone-800 border-purple border-[1px]"></div>
      </div>

      <form onSubmit={searchArtists}>
        <input type="text" onChange={e => setSearchKey(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <div className="flex flex-col text-slate-50 gap-2">
        {renderArtists()}
      </div> */}
    </div>
  );
}
