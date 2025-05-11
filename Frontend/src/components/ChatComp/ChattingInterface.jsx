import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";

const ChattingInterface = ({ selectedStartup }) => {
  const groupName = selectedStartup;
  const groupLogo =
    "https://upload.wikimedia.org/wikipedia/commons/0/04/OpenAI_Logo.svg";

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
          scrollbarWidth: "none", //firefox
          "&::-webkit-scrollbar": { display: "none" }, //chrome
        }}
      >
        {/* Example Message */}
        <Box
          sx={{
            alignSelf: "flex-start",
            backgroundColor: "#334155",
            color: "white",
            px: 1.5,
            py: 0.8,
            borderRadius: 2,
            maxWidth: "70%",
          }}
        >
          Hello, welcome to the group !
        </Box>
        <Box
          sx={{
            alignSelf: "flex-end",
            backgroundColor: "#3b82f6",
            color: "white",
            px: 1.5,
            py: 0.8,
            borderRadius: 2,
            maxWidth: "70%",
          }}
        >
          Thanks! Excited to be here.
        </Box>
      </Box>

      {/* Input Field  */}
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
          placeholder="Type your message...."
          style={{
            flexGrow: 1,
            padding: "8px 12px",
            borderRadius: "10px",
            background: "#1e293b",
            color: "white",
            border: "none",
            outline: "none",
          }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", borderRadius: "10px", fontSize: 12 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChattingInterface;