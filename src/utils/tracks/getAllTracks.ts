import getLongTermTracks from "./getLongTermTracks";
import getMediumTermTracks from "./getMediumTermTracks";
import getShortTermTracks from "./getShortTermTracks";

interface Track {
  id: string;
}

const getAllTracks = async (token: string) => {
  const longTerm: { items: Track[] } = await getLongTermTracks(token);
  const mediumTerm: { items: Track[] } = await getMediumTermTracks(token);
  const shortTerm: { items: Track[] } = await getShortTermTracks(token);

   // Verifica se os resultados possuem a propriedade items e se são arrays
   if (!longTerm?.items || !mediumTerm?.items || !shortTerm?.items) {
    throw new Error("Erro ao buscar as tracks. Um dos arrays está indefinido.");
  }

  const uniqueTracks = [...mediumTerm.items, ...shortTerm.items].filter(
    (track2) => !longTerm.items.some((track1) => track1.id === track2.id)
  );

  longTerm.items.push(...uniqueTracks);

  return longTerm.items.length;
};

export default getAllTracks;
