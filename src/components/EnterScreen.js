import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../stores/users";

const EnterScreen = ({ socket }) => {
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const handleEnter = (e) => {
    e.preventDefault();
    if (inputRef.current.value.length > 0) {
      setLoading(true);
      socket.emit("login", inputRef.current.value);
    } else {
      alert("Your name is required!");
    }
  };

  const [loading, setLoading] = useState(false);
  socket.on("connecteduser", (data) => {
    setLoading(false);
    data = JSON.parse(data);
    dispatch(
      setUser({
        id: data.id,
        name: data.name,
        connectionTime: data.connectionTime,
      })
    );
  });
  if (loading)
    return (
      <div className="h-full w-full flex justify-center items-center z-50 gap-3 text-2xl font-bold text-white">
        Loading...
      </div>
    );

  return (
    <div className="h-full w-full flex justify-center items-center z-50 px-5 gap-3">
      <input
        type="text"
        className="h-[60px] w-full text-black lg:w-[25%] px-4 text-xl bg-[#B3D8B9] outline-none placeholder:text-gray-800 font-bold placeholder:font-bold"
        placeholder="Enter your name to join!"
        ref={inputRef}
      />
      <button
        onClick={handleEnter}
        className="bg-[#B3D8B9] h-[60px] px-6 text-black font-bold hover:bg-[#7c9e82] cursor-pointer duration-500 "
      >
        Enter
      </button>
    </div>
  );
};

export default EnterScreen;
