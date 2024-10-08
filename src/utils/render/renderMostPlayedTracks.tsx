import { Track } from "../../types/Track";

const renderMostPlayedTracks = (index: number, mostPlayedTracks: Track[]) => {
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

export default renderMostPlayedTracks;