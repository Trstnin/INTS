import React, { useContext, useEffect, useState, useRef } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useSocket } from "../../utils/socket";
import { useStartupsData } from "../../contexts/GroupContext";
import { UserDataContext } from "../../contexts/userContext";
import dayjs from "dayjs"; // To format timestamps

const ChattingInterface = ({ selectedStartup }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const groupLogo =
    "https://upload.wikimedia.org/wikipedia/commons/0/04/OpenAI_Logo.svg";

  const { startupsData } = useStartupsData();
  const { user, preferenceName } = useContext(UserDataContext);

  const socket = useSocket();

  const group = startupsData.find(
    (startup) => startup.name === selectedStartup
  );
  const groupName = group?.name;

  useEffect(() => {
    if (!socket || !group?._id) return;

    const token = localStorage.getItem("token");

    // Fetch previous messages
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/message/${group._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();

    // Join room
    socket.emit("join-room", group._id);

    // Listen for new messages
    const handleNewMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receive-message", handleNewMessage);

    return () => {
      socket.off("receive-message", handleNewMessage);
    };
  }, [socket, group?._id]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const token = localStorage.getItem("token");

    const payload = {
      group: group._id,
      sender: user._id,
      text: message,
    };

    setMessage(""); // Clear the input immediately

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error sending message");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Box
      component={"main"}
      sx={{
        flexGrow: 1,
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(16,20,30,0.95)",
        p: 2,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backgroundColor: "rgba(255,255,255,0.02)",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle2" sx={{ color: "gray", fontSize: 11 }}>
          Group
        </Typography>
        <Typography variant="h6" sx={{ color: "white", fontSize: 14 }}>
          {groupName}
        </Typography>

        <Avatar
          src={groupLogo}
          alt="Group Logo"
          sx={{ width: 48, height: 48, mx: "auto", mt: 1 }}
        />
      </Box>

      {/* Message Area */}
      <Box
        sx={{
          flexGrow: 1,
          px: 2,
          py: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {messages.map((msg) => {
          const isOwnMessage =
            msg.sender === user._id || msg.sender?._id === user._id;
          const senderName = isOwnMessage
            ? preferenceName
            : msg.sender?.name || "Anonymous";
          const senderAvatar = isOwnMessage
            ? user.avatarUrl || groupLogo
            : msg.sender?.avatarUrl || groupLogo;

          return (
            <Box
              key={`${msg._id}-${msg.createdAt}`}
              sx={{
                display: "flex",
                flexDirection: isOwnMessage ? "row-reverse" : "row",
                alignItems: "flex-start",
                gap: 1.5,
                px: 1,
              }}
            >
              {/* Avatar */}
              <Avatar
                src={senderAvatar}
                alt={senderName}
                sx={{ width: 32, height: 32 , mt:'25px'}}
              />

              <Box
                sx={{
                  maxWidth: "75%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isOwnMessage ? "flex-end" : "flex-start",
                }}
              >
                {/* Sender Name */}
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "gray",
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  {senderName}
                </Typography>

                {/* Message Bubble */}
                <Box
                  sx={{
                    backgroundColor: isOwnMessage ? "#3b82f6" : "#1f2937",
                    color: "white",
                    px: 2,
                    py: 1.2,
                    borderRadius: 3,
                    borderTopLeftRadius: isOwnMessage ? 12 : 0,
                    borderTopRightRadius: isOwnMessage ? 0 : 12,
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography sx={{ fontSize: 14, lineHeight: 1.5 }}>
                    {msg.text}
                  </Typography>
                </Box>

                {/* Timestamp */}
                <Typography
                  sx={{
                    fontSize: 10,
                    color: "#9ca3af",
                    mt: 0.5,
                    fontStyle: "italic",
                  }}
                >
                  {dayjs(msg.createdAt).format("HH:mm A")}
                </Typography>
              </Box>
            </Box>
          );
        })}

        <Box ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          backgroundColor: "rgba(255, 255, 255,0.02)",
          display: "flex",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message...."
          style={{
            flexGrow: 1,
            padding: "8px 12px",
            borderRadius: "10px",
            background: "#1e293b",
            color: "white",
            border: "none",
            outline: "none",
            fontSize: "14px",
          }}
        />

        <Button
          onClick={sendMessage}
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            fontSize: 12,
            minWidth: "50px",
            maxWidth: "80px",
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChattingInterface;
