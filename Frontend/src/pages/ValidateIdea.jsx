import React, { useEffect, useRef, useState } from "react";
import NavBarIdea from "../components/IdeaComp/NavBarIdea";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

const ValidateIdea = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/aiValidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: userInput }),
      });

      const data = await res.json();

      const cleanedReply = data.reply
        .replace(/\*+/g, "") // remove asterisks
        .replace(/^\s*#+/gm, "") // remove markdown headers
        .trim();

      const paragraphs = cleanedReply
        .split(/\n(?=\w.*:)/)
        .map((block) => block.trim())
        .filter(Boolean);

      const aiMessage = paragraphs.map((para) => ({
        sender: "ai",
        text: para,
      }));

      setMessages((prev) => [...prev, ...aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Failed to fetch response from Ai" },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: "#0f0f0f",
      }}
    >
      <NavBarIdea />

      <Box
        sx={{
          p: 3,
          maxWidth: 800,
          mx: "auto",
          mt: "20px",
        }}
      >
        {/* Disclaimer  */}
        <Paper
          sx={{
            p: 2,
            mb: 3,
            backgroundColor: "#27272a",
            color: "#facc15",
            borderRadius: "12px",
            fontSize: "0.9rem",
            boxShadow: 3,
            borderLeft: "6px solid #eab308",
          }}
          elevation={3}
        >
          ⚠️ This chat is not stored and will be removed after each refresh
        </Paper>

        {/* Chat Box  */}
        <Paper
          sx={{
            p: 2,
            maxHeight: "calc(100vh - 300px)",
            overflowY: "auto",
            bgcolor: "#18181b",
            borderRadius: "12px",
            boxShadow: 2,
            mb: 2,
            scrollbarColor: "#888 #18181b",
            scrollbarWidth: "thin",
          }}
        >
          {messages.length === 0 ? (
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>
              Start chatting with AI about your startup idea....
            </Typography>
          ) : (
            messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "80%",
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor:
                      msg.sender === "user" ? "#3f3f346" : "#27272a",
                    color: "#f4f4f5",
                    fontSize: "1rem",
                    boxShadow: 1,
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    fontFamily: "Inter, sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  {msg.sender === "ai" ? (
                    (() => {
                      const match = msg.text.match(/^(.+?):\s*(.*)/s);
                      if (match) {
                        return (
                          <>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: "bold",
                                color: "#facc15",
                                mb: 0.5,
                              }}
                            >
                              {match[1]}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#e4e4e7" }}
                            >
                              {match[2].trim()}
                            </Typography>
                          </>
                        );
                      }
                      return (
                        <Typography variant="body2" sx={{ color: "#e4e4e7" }}>
                          {msg.text}
                        </Typography>
                      );
                    })()
                  ) : (
                    <Typography variant="body2">{msg.text}</Typography>
                  )}
                </Box>
              </Box>
            ))
          )}
          <div ref={chatEndRef} />
        </Paper>

        {/* Input  Box  */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              label="Validate your startup idea...."
              variant="outlined"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              InputLabelProps={{ style: { color: "#a1a1aa" } }}
              InputProps={{
                style: {
                  backgroundColor: "#27272a",
                  color: "#fff",
                  borderRadius: "8px",
                },
              }}
              multiline
              // Maximum height of the input box
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleSend}
            sx={{
              backgroundColor: "#facc15",
              color: "#000",
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              "&:hover": {
                backgroundColor: "#eb308",
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ValidateIdea;
