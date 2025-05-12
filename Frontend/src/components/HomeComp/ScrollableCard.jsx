import React, { useContext, useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserDataContext } from "../../contexts/userContext";
import { useStartupsData } from "../../contexts/GroupContext";
import { useNavigate } from "react-router-dom";



function shuffledArray(array){
 const shuffled = [...array];
 for(let i = shuffled.length - 1; i>0; i--){
  const j = Math.floor(Math.random() * (i +1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
 }
  return shuffled;
} 



const ScrollableCard = ({ joinedStartups, setJoinedStartups }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserDataContext);
  const [index, setIndex] = useState(0);
  const [startups, setStartups] = useState([]);
  const { startupsData } = useStartupsData();

  useEffect(() => {
    const joinedGroupIds = new Set(joinedStartups.map((s) => s.groupId));
    const unjoinedStartups = startupsData.filter(
      (startup) => !joinedGroupIds.has(startup._id)
    );
    setStartups(shuffledArray(unjoinedStartups));
  }, [startupsData, joinedStartups]);

  const handleSwipe = async (dir, startup) => {
  if (dir === "right") {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/group/join-group`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user._id,
            group: startup._id, // ✅ Send group ID, not name
          }),
        }
      );

      if (res.ok) {
        toast.success(`🎉 You joined ${startup.name}'s group!`);
        setJoinedStartups((prev) =>
          prev.filter((s) => s.groupId !== startup._id)
        );
        setTimeout(() => window.location.reload(), 100);
      } else {
        toast.error("Already joined group!");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
};


  if (index >= startups.length) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        <Typography>🎉 You're all caught up!</Typography>
        <ToastContainer />
      </Box>
    );
  }

  return (
<Box
  sx={{
    backgroundColor: "#27272A",
    minHeight: "100vh",
    overflow: "hidden", // Hide both horizontal and vertical scrollbars
    py: 6,
    px: 2,
  }}
>
  {startups.slice(index).map((startup) => (
 <TinderCard
  key={startup._id}
  onSwipe={(dir) => {
    if (dir === "right") {
      handleSwipe(dir, startup); // ✅ pass the full startup object
      setIndex((prev) => prev + 1);
    }
  }}
  preventSwipe={["left", "up", "down"]}
>

      <Box
        sx={{
          width: 360,
          mx: "auto",
          mb: 6,
          background:
            "linear-gradient(45deg, rgba(30,41,59,0.85), rgba(15,23,42,0.85))",
          borderRadius: "24px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
          overflow: "hidden", // Hide the scrollbars for individual cards as well
          px: 4,
          py: 5,
          "&::-webkit-scrollbar": { display: "none" }, // Ensures no scrollbar on webkit browsers
          "&": {
            msOverflowStyle: "none", // Hides scrollbar in IE and Edge
            scrollbarWidth: "none",  // Hides scrollbar in Firefox
          },
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: startup.bgColor || "#3b82f6",
            fontSize: "2.5rem",
            fontWeight: "bold",
            mb: 3,
            mx: "auto",
          }}
        >
          {startup.name[0]}
        </Avatar>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#fff",
            textAlign: "center",
            mb: 2,
          }}
        >
          {startup.name}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#cbd5e1",
            lineHeight: 1.8,
            fontSize: "1rem",
            textAlign: "center",
            mb: 3,
          }}
        >
          {startup.description}
          <br />
          This startup focuses on innovation and growth, building the
          future through technology and creativity.
        </Typography>

        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "12px",
              background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
              color: "#fff",
            }}
            onClick={() => window.open(startup.website, "_blank")}
          >
            Visit Website
          </Button>
        </Box>


          <Box textAlign="center" marginTop="10px">
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "12px",
              background: "green",
              color: "#fff",
            }}
            onClick={() => navigate(`/Details/${startup._id}`)}
          >
            View more Details
          </Button>
        </Box>
      </Box>
    </TinderCard>
  ))}

  <ToastContainer />
</Box>


  );
};

export default ScrollableCard;
