import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayers, setStep, setUsersKilled } from "../stores/game";
import { setUsers } from "../stores/users";

const Game = ({ socket }) => {
  const [counter, setCounter] = useState(50000);
  const [selectedNumber, setSelectedNumber] = useState(-1);

  const dispatch = useDispatch();
  const { usersPlaying, step } = useSelector((state) => state.game);
  const { user, users } = useSelector((state) => state.users);

  const isPlaying = usersPlaying.find((element) => element.id === user.id);
  console.log(isPlaying);
  socket.on("playingusers", (players) => {
    dispatch(setPlayers(JSON.parse(players)));
  });

  socket.on("userKilled", (userKilled) => {
    dispatch(setUsersKilled(JSON.parse(userKilled)));
  });

  socket.on("gamestep", (step) => {
    dispatch(setStep(step));
  });
  socket.on("counter", (data) => {
    setCounter(data);
  });

  socket.on("users", (data) => {
    dispatch(setUsers(JSON.parse(data)));
    // snd.play();
  });

  let buttons = [];
  for (let i = 0; i <= 100; i++) {
    buttons.push(i);
  }

  return (
    <div className="z-50 items-center justify-center w-full h-full">
      {step === "beginning" ? (
        <div className="flex items-center justify-center w-full h-full gap-6">
          {usersPlaying.map((element) => {
            let userData = users.find((user) => user.id === element.id);
            return (
              <div
                key={element.id}
                className="w-28 h-32 bg-[#B3D8B9] text-black font-semibold flex flex-col justify-center items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                  <path d="M24 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM8 40v-4.7q0-1.9.95-3.25T11.4 30q3.35-1.5 6.425-2.25Q20.9 27 24 27q3.1 0 6.15.775 3.05.775 6.4 2.225 1.55.7 2.5 2.05.95 1.35.95 3.25V40Z" />
                </svg>
                <h3 className="text-xl">
                  {userData.name.substr(0, 8)}
                  {userData.name.length > 8 && ".."}
                </h3>
              </div>
            );
          })}
        </div>
      ) : step === "answers" && isPlaying?.id === user.id ? (
        <div className="flex items-center justify-center w-full h-full max-w-xl mx-auto">
          <div className="grid grid-cols-10 gap-1 font-bold text-black">
            <div className="col-span-9"></div>
            {buttons.map((element) => {
              return (
                <button
                  key={element}
                  className={`w-12 h-12  bg-[#B3D8B9] duration-500 ${
                    element === selectedNumber && "bg-black text-white"
                  } `}
                  onClick={() => {
                    setSelectedNumber(element);
                    socket.emit(
                      "answer",
                      JSON.stringify({ id: user.id, number: element })
                    );
                  }}
                >
                  {element}
                </button>
              );
            })}
          </div>
        </div>
      ) : step === "answers" && isPlaying === undefined ? (
        <div className="flex items-center justify-center w-full h-full gap-6">
          {usersPlaying.map((element) => {
            let userData = users.find((user) => user.id === element.id);
            console.log(users);
            return (
              <div
                key={element.id}
                className="w-28 h-32 bg-[#B3D8B9] text-black font-semibold flex flex-col justify-center items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                  <path d="M24 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM8 40v-4.7q0-1.9.95-3.25T11.4 30q3.35-1.5 6.425-2.25Q20.9 27 24 27q3.1 0 6.15.775 3.05.775 6.4 2.225 1.55.7 2.5 2.05.95 1.35.95 3.25V40Z" />
                </svg>
                <h3 className="text-xl">
                  {userData.name.substr(0, 8)}
                  {userData.name.length > 8 && ".."}
                </h3>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
      <div className="absolute text-2xl font-bold text-center -translate-x-1/2 left-1/2 bottom-20">
        {step === "beginning"
          ? `You will do your suggestion in ${counter} seconds! Who reachs -10 first
          will be dead!`
          : (step === "answers") & (isPlaying?.id === user.id)
          ? `You have ${counter} seconds to make your choice!`
          : (step === "answers") & (isPlaying === undefined)
          ? `Waiting for players choices...`
          : ""}
      </div>
    </div>
  );
};

export default Game;
