const getToken = () => {
  const hash = window.location.hash;
  let token = window.localStorage.getItem("token") as string || "";

  if (!token && hash) {
    token = hash
      .substring(1)
      .split("&")
      .find((e) => e.startsWith("access_token"))
      ?.split("=")[1] as string;

    window.location.hash = "";
    window.localStorage.setItem("token", token);
  }

  return token;
}

export default getToken;