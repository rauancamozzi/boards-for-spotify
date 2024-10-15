import axios from "axios";

const getAllTracks = async (token: string) => {
    let allTracksArray: unknown[] = [];
    let offsetAllTracks = 0;
    let hasMoreTracks = true;

    try {
      while (hasMoreTracks) {
        const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 50,
            type: "tracks",
            time_range: "long_term",
            offset: offsetAllTracks,
          },
        });

        allTracksArray = allTracksArray.concat(data.items);
        offsetAllTracks += 50;
        hasMoreTracks = offsetAllTracks < data.total;
      }

    } catch (error) {
      console.error('Erro ao buscar as todas músicas:', error);
    }


  return allTracksArray as [];
};

export default getAllTracks;
