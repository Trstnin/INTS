import { Box, Typography } from "@mui/material";
import React from "react";

const DefaultTextComp = () => {
  return (
    <Box
      component={"main"}
      sx={{
        flexGrow: 1,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 4,
        overflowY: "scroll",
              overflowX: "hidden",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          textAlign: "center",
          p: 4,
          background: "rgba(255,255,255,0.02)",
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
          Join the group and start your conversation
        </Typography>
        <Typography variant="body1" sx={{ color: "#94a3b8" }}>
          with people with same mindset
        </Typography>
      </Box>
    </Box>
  );
};

export default DefaultTextComp;
