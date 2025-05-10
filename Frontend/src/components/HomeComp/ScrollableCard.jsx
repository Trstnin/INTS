import React, { useContext, useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import startupsData from "./startups.json";
import { UserDataContext } from "../../contexts/userContext";

function shuffledArray(array){
 const shuffled = [...array];
 for(let i = shuffled.length - 1; i>0; i--){
  const j = Math.floor(Math.random() * (i +1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
 }
  return shuffled;
} 



const SwipeScrollCard = ({ setJoinedStartups }) => {
  const { user } = useContext(UserDataContext);
  const [index, setIndex] = useState(0);
  const [startups,setStartups] = useState([]);


  useEffect(() => {
    setStartups(shuffledArray(startupsData));
  },[]);

  const handleSwipe = async (dir, name) => {
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
              group: name,
            }),
          }
        );
        if (res.ok) {
          toast.success(`🎉 You joined ${name}'s group!`);
          setJoinedStartups((prev) =>
            prev.filter((startupName) => startupName !== name)
          );
          setTimeout(() => window.location.reload(), 500); // reload after toast
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
        backgroundColor: "#18181B",
        minHeight: "100vh",
        overflowY: "scroll",
        py: 6,
        px: 2,
      }}
    >
      {startups.slice(index).map((startup) => (
        <TinderCard
          key={startup.name}
          onSwipe={(dir) => {
            if (dir === "right") {
              handleSwipe(dir, startup.name);
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
              overflowY: "auto",
              px: 4,
              py: 5,
              "&::-webkit-scrollbar": { width: "0px" },
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
          </Box>
        </TinderCard>
      ))}

      <ToastContainer />
    </Box>
  );
};

export default SwipeScrollCard;
