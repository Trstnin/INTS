import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, IconButton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserDataContext } from "../../contexts/userContext";
import { useStartupsData } from "../../contexts/GroupContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShare, FaInfoCircle } from "react-icons/fa";

function shuffledArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const ScrollableCard = ({ joinedStartups, setJoinedStartups }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const { startupsData } = useStartupsData();
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    setStartups(shuffledArray(startupsData));
  }, [startupsData, joinedStartups]);

  const handleJoin = async (startup) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/group/join-group`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user._id,
            group: startup._id,
          }),
        }
      );

      if (res.ok) {
        toast.success(`🎉 You joined ${startup.name}'s group!`);
        setJoinedStartups((prev) => [
          ...prev,
          { name: startup.name, groupId: startup._id },
        ]);
      } else {
        toast.error("Already joined group!");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to join group");
    }
  };

return (
  <Box
    sx={{
      p: { xs: 2, sm: 6 },
      backgroundColor: "#27272a",
      minHeight: "100vh",
      overflowY: "auto",
      scrollBehavior: "smooth",
      WebkitOverflowScrolling: "touch",
    }}
  >
    {startups.map((startup, index) => {
      const isJoined = joinedStartups.some((s) => s.groupId === startup._id);

      return (
        <Box
          key={startup._id}
          sx={{
            width: "100%",
            maxWidth: 900, // 🔥 Wider post
            mx: "auto",
            mb: 8, // More spacing between posts
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            background: "#0f172a",
            animation: `fadeSlideUp 0.6s ease ${index * 0.07}s forwards`,
            opacity: 0,
            transform: "translateY(30px)",
            "@keyframes fadeSlideUp": {
              from: { opacity: 0, transform: "translateY(30px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Banner */}
          <Box
            component="img"
            src={
              startup.banner ||
              "https://source.unsplash.com/1200x400/?startup,technology"
            }
            alt={`${startup.name} banner`}
            sx={{
              width: "100%",
              height: { xs: 220, sm: 300 },
              objectFit: "cover",
            }}
          />

          {/* Header */}
          <Box sx={{ p: 4, display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar
              sx={{
                bgcolor: startup.bgColor || "#3b82f6",
                width: 80,
                height: 80,
                fontSize: "2rem",
              }}
            >
              {startup.name[0]}
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "#fff", fontWeight: 800, mb: 1 }}
              >
                {startup.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#94a3b8", fontSize: "1.25rem" }}
              >
                {startup.industry?.join(", ")}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Box sx={{ px: 4, pb: 3 }}>
            <Typography
              sx={{
                color: "#e2e8f0",
                mb: 3,
                fontSize: "1.2rem",
                lineHeight: 1.9,
              }}
            >
              {startup.description}
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                color={isJoined ? "error" : "primary"}
                onClick={() => handleJoin(startup)}
                startIcon={isJoined ? <FaHeart /> : <FaRegHeart />}
                sx={{
                  textTransform: "none",
                  borderRadius: 3,
                  px: 5,
                  py: 1.8,
                  fontSize: "1.05rem",
                }}
              >
                {isJoined ? "Joined" : "Join Community"}
              </Button>

              <IconButton
                onClick={() => navigate(`/Details/${startup._id}`)}
                sx={{ color: "#60a5fa", fontSize: "1.6rem" }}
              >
                <FaInfoCircle />
              </IconButton>

              <IconButton
                onClick={() => window.open(startup.website, "_blank")}
                sx={{ color: "#60a5fa", fontSize: "1.6rem" }}
              >
                <FaShare />
              </IconButton>
            </Box>
          </Box>

          {/* Stats */}
          <Box
            sx={{
              px: 4,
              py: 3,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              color: "#94a3b8",
              fontSize: "1.1rem",
            }}
          >
            <span>Founded: {startup.founded || "2024"}</span>
            <span>•</span>
            <span>Team size: {startup.teamSize || "10-50"}</span>
            <span>•</span>
            <span>Funding: {startup.funding?.stage || "Seed"}</span>
          </Box>
        </Box>
      );
    })}
    <ToastContainer position="bottom-center" />
  </Box>
);



};

export default ScrollableCard;
