import { useState } from "react";
import { GptMessage, GptOrthographyMessage, TextMessageBox, TypingLoader } from "../../components";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { orthographyUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const {ok, errors, message, userScore} = await orthographyUseCase(text);
    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la correción", isGpt: true },
      ]);
    } else {
    setMessages((prev) => [...prev, { text: '', isGpt: true, info: {
      errors,
      message,
      userScore
    } }]);

    }
    setIsLoading(false);
    // Todo: add msg gpt in true
  };
console.log(messages, 'messages');

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hello, you can write your message in spanish and I will help you" />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage key={index} {...message.info!} />
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
