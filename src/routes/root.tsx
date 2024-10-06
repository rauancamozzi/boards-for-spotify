import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { SpotifyLogo } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Logo from "../assets/Vector.svg";

export default function Root() {
  const CLIENT_ID = "6f9833ced27d43e2b205bf3fa73bf5e9";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = "user-top-read";

  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("token");

    if (storedToken) navigate("/stats");

    if (!storedToken && hash) {
      storedToken = hash
        .substring(1)
        .split("&")
        .find((e) => e.startsWith("access_token"))
        ?.split("=")[1] as string;

      window.location.hash = "";
      window.localStorage.setItem("token", storedToken);

      navigate("/stats");
    }

    setToken(storedToken || "");
  }, [navigate]);

  return (
    <div className="bg-stone-950 h-screen w-full flex flex-col items-center">
      <div className="bg-stone-900 w-full h-24 top-0 flex flex-row items-center px-32 justify-between border-b-2 border-stone-800">
        <div className="flex flex-row gap-4 items-center text-2xl font-bold">
          <img src={Logo} alt="" />
          <p className="text-white">Boards for Spotify</p>
        </div>

        <Link
          to={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}
        >
          <button className="bg-stone-950 flex items-center flex-row text-white rounded-[50px] py-2 px-6 border-purple border-[1px] text-center text-base gap-2">
            <SpotifyLogo color="#1ED760" weight="fill" size={32} />
            Login with Spotify
          </button>
        </Link>
      </div>

      <div className="w-3/4 h-full grid grid-cols-3 grid-rows-2 gap-4 px-36 py-10">
        <div className="bg-stone-900 col-span-2 row-span-1 rounded-3xl flex flex-col gap-8 p-10 justify-around">
          <h1 className="text-white text-5xl font-bold">Músicas</h1>
          <p className="text-white text-xl w-3/4">
            Descubra quais músicas estão dominando sua playlist, exibindo as
            faixas que você ouviu recentemente e aquelas que mais tocaram na sua
            conta.
          </p>
          <p className="text-white text-xl w-3/4">
            Conheça a sua música mais tocada e quantas vezes ela foi ouvida,
            para relembrar seu hit pessoal.
          </p>
        </div>
        <div className="bg-stone-900 col-span-1 row-span-2 rounded-3xl flex flex-col gap-8 p-10 justify-around">
          <h1 className="text-white text-5xl font-bold">Seu perfil musical</h1>
          <p className="text-white text-xl w-full">
            Tenha uma visão clara de quanto tempo você dedicou à música, 
            com um resumo da quantidade total de minutos ouvidos.
          </p>

          <p className="text-white text-xl w-full">
            Saiba quantas músicas você ouviu em um determinado período, 
            ajudando você a entender seu padrão de consumo musical.
          </p>

          <p className="text-white text-xl w-full">
            Veja quantas músicas você marcou como favoritas, 
            proporcionando uma visão do que realmente te encanta.
          </p>
        </div>
        <div className="bg-stone-900 col-span-1 row-span-1 rounded-3xl flex flex-col gap-8 p-10 justify-start">
          <h1 className="text-white text-5xl font-bold">Artistas</h1>
            <p className="text-white text-xl w-full">
              Descubra quais artistas são seus favoritos, 
              com uma lista dos que você mais ouviu ao longo do tempo.
            </p>
        </div>
        <div className="bg-stone-900 col-span-1 row-span-1 rounded-3xl flex flex-col gap-8 p-10 justify-start">
          <h1 className="text-white text-5xl font-bold">Álbuns</h1>
          <p className="text-white text-xl w-full">
            Reviva suas experiências musicais com uma lista dos álbuns que você mais ouviu, 
            facilitando a redescoberta de suas coleções preferidas.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
