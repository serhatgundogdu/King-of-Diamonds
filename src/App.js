import EnterScreen from "./components/EnterScreen";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import Lobby from "./components/Lobby";
import { setStatus } from "./stores/game";
import Game from "./components/Game";

const socket = io("http://localhost:5500", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return state.users;
  });

  const { status } = useSelector((state) => {
    return state.game;
  });

  socket.on("status", (data) => {
    dispatch(setStatus(data));
  });

  if (status == null) {
    return (
      <Layout>
        <div className="z-50 flex items-center justify-center h-screen">
          <h3 className="text-3xl font-bold bg-[#50746c] px-5 py-2 animate-pulse">
            LOADING...
          </h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {user.id == null && user.name == null ? (
        <EnterScreen socket={socket} />
      ) : status === "waiting" || status === "starting" ? (
        <Lobby socket={socket} status={status} />
      ) : status === "started" ? (
        <Game socket={socket} />
      ) : (
        <div>ERROR</div>
      )}
    </Layout>
  );
}

export default App;
