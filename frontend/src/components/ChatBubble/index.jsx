import React, { useState } from "react";
import Jazzicon from "../UserIcon";
import { userFromStorage } from "@/utils/request";
import { AI_BACKGROUND_COLOR, USER_BACKGROUND_COLOR } from "@/utils/constants";

export default function ChatBubble({ message, type, popMsg }) {
  const isUser = type === "user";
  const backgroundColor = isUser ? USER_BACKGROUND_COLOR : AI_BACKGROUND_COLOR;

  const processMessage = (message) => {
    const pythonCodeRegex = /```python([\s\S]*?)```/g;
    return message.split(pythonCodeRegex).map((part, index) => {
      if (index % 2 === 1) {
        return (
          <details key={index} className="bg-gray-800 p-2 rounded-md">
            <summary className="cursor-pointer text-blue-400">Show Python Code</summary>
            <pre className="whitespace-pre-wrap text-white text-sm md:text-sm mt-2">
              <code>{part}</code>
            </pre>
          </details>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex justify-center items-end w-full ${backgroundColor}`}>
      <div
        className={`py-8 px-4 w-full flex gap-x-5 md:max-w-[800px] flex-col`}
      >
        <div className="flex gap-x-5">
          <Jazzicon
            size={36}
            user={{ uid: isUser ? userFromStorage()?.username : "system" }}
            role={type}
          />

          <span
            className={`whitespace-pre-line text-white font-normal text-sm md:text-sm flex flex-col gap-y-1 mt-2`}
          >
            {processMessage(message)}
          </span>
        </div>
      </div>
    </div>
  );
}
