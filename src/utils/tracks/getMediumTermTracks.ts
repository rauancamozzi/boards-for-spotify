import axios from "axios";

const getMediumTermTracks = async (token: string) => {
  const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: 50,
      type: "tracks",
      time_range: "medium_term"
    },
  });

  return data;
}

export default getMediumTermTracks;