import React from "react";

interface TrackProps {
  trackName: string;
  artistName: string;
}

const Track: React.FC<TrackProps> = ({ trackName, artistName }) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="bg-purple rounded w-10 h-10"></div>
      <div>
        <h1 className="text-yellow font-bold">{ trackName }</h1>
        <h2 className="text-green-secondary">{ artistName }</h2>
      </div>
    </div>
  );
};

export default Track;
