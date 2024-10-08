import axios from "axios";

const getRecentPlayedTracks = async (token: string) => {
  const { data } = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      limit: 6,
    }
  });

  return data.items;
}

export default getRecentPlayedTracks;