import { RecentTrack } from "../../types/Track";

const renderRecentPlayedTracks = (recentTracks: RecentTrack[]) => {
  return (
    <div>
      {recentTracks.map((track, index) => {
        if (!track || !track.album || !track.name) return null;

        return (
          <div key={index} className="flex flex-row">
            <img
              src={track.album.images[0].url}
              alt=""
              className="w-12"
            />
            <div className="flex flex-col">
              <p>{track.name}</p>
              <p>{track.artists[0].name}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
};

export default renderRecentPlayedTracks;