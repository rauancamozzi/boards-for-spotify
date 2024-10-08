import axios from "axios";

const getShortTermTracks = async (token: string) => {
  const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: 50,
      type: "tracks",
      time_range: "short_term"
    },
  });

  return data;
}

export default getShortTermTracks;