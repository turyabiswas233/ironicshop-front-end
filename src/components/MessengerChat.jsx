import React from "react";
import msg from "/src/assets/tools/msg.png";
const MessengerChat = () => {
  return (
    <a href="https://m.me/100959359657207" target="_blank">
      <div
        className="fb-customerchat"
        id="fb-customer-chat"
        attribution="biz_inbox"
        page_id="100959359657207"
        theme_color="#7750DD"
      >
        <img src={msg} width={40} height={40} alt="msg" />
      </div>
    </a>
  );
};

export default MessengerChat;
