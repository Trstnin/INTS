import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const zincTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
    },
    text: {
      primary: "#fff",
      secondary: "#94a3b8",
    },
  },
});

const ValidateIdeaBtn = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={zincTheme}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#18181B",
          flexDirection: "column",
          p: 2,
          width: "250px",
          height: "320px",
          mr: "20px",
          mt: "60px",
          borderRadius: "10px",

        }}
      >
        <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
          Validate your Startup ID using AI
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Ensure that your startup is unique and matches relevant industry
          criteria. This feature will analyze your startup's information and
          provide feedback on its originality, market potential, and alignment
          with your chosen industry.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/validateIdea")}
          sx={{
            textTransform: "none",
            backgroundColor: zincTheme.palette.primary.main,
            "&:hover": {
              backgroundColor: zincTheme.palette.primary.dark,
            },
            fontSize: "0.875rem",
            padding: "10px 20px",
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s ease-in-out",
          }}
        >
          Validate Your Startup ID
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ValidateIdeaBtn;
