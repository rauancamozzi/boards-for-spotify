import React from "react";

interface ArtistProps {
  artistName: string;
}

const Artist: React.FC<ArtistProps> = ({ artistName }) => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="bg-purple rounded w-10 h-10"></div>
      <h1 className="text-yellow font-bold">{ artistName }</h1>
    </div>
  );
};

export default Artist;
