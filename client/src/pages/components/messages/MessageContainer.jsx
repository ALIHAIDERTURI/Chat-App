import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
  const noChatSelected = false;
  return (
    <div className="md:min-w-[450px]  flex flex-col">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header  */}
          <div className="bg-[#1D232A] px-4 py-2 mb-2 flex items-center">
            <div className="avatar ">
              <div className="w-8 rounded-full">
                <img
                  src="data:image/png;base64,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"
                  alt="User Profile"
                  className=""
                />
              </div>
            </div>
            <span className="text-[#9CA3AF] font-bold ms-2">Turi</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200  font-semibold flex flex-col items-center gap-2">
          <p>Welcome Ali 😊</p>
          <p>Select a chat to start messaging</p>
          <TiMessages className="text-3xl md:-text-6xl text-center" />
        </div>
      </div>
    </>
  );
};
