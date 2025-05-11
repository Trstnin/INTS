import React from "react";
import StartupsChatSidebar from '../components/ChatComp/CommunitiesSectionChat'
import NavbarChat from '../components/ChatComp/NavBarChat'

const ChatDefault = () => {
  return (
    <div className="p-2">
      <NavbarChat />
      <StartupsChatSidebar />
    </div>
  );
};

export default ChatDefault;
