import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from "../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (message: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: message, isGpt: false }]);

    // Todo: use case
    setIsLoading(false);
    // Todo: add msg gpt in true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hello, you can write your message in english and I will help you" />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text="This is from OpenAI" />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Type here"
        disabledCorrections
      />
    </div>
  );
};
