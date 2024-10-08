import getLongTermTracks from "./getLongTermTracks";
import getMediumTermTracks from "./getMediumTermTracks";
import getShortTermTracks from "./getShortTermTracks";

interface Track {
  id: string;
  duration_ms: number;
}

const getAllTracks = async (token: string) => {
  const longTerm: { items: Track[] } = await getLongTermTracks(token);
  const mediumTerm: { items: Track[] } = await getMediumTermTracks(token);
  const shortTerm: { items: Track[] } = await getShortTermTracks(token);

  const uniqueTracks = [...mediumTerm.items, ...shortTerm.items].filter(
    (track2) => !longTerm.items.some((track1) => track1.id === track2.id)
  );

  longTerm.items.push(...uniqueTracks);

  const totalDuration = longTerm.items.reduce((acc, track) => acc + track.duration_ms, 0);

  console.log(totalDuration / 60000);

  return console.log(longTerm);
};

export default getAllTracks;
