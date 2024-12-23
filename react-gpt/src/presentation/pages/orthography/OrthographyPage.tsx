import { GptMessage } from "../../components"
import { MyMessage } from "../../components/chat-bubbles/MyMessage"

export const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GptMessage text="Hello, you can write your message in english and I will help you" />
          <MyMessage text="Hi"/>
        </div>
      </div>
    </div>
  )
}