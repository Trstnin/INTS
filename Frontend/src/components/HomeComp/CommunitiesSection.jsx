import * as React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserDataContext } from "../../contexts/userContext";
import ScrollableCard from "./ScrollableCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useStartupsData } from "../../contexts/GroupContext";
import ValidateIdeaBtn from "./ValidateIdeaBtn";

const drawerWidth = 240;

const zincTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgba(16, 20, 30, 0.95)",
      paper: "rgba(20, 27, 45, 0.95)",
    },
    primary: {
      main: "#3b82f6",
    },
    text: {
      primary: "#fff",
      secondary: "#94a3b8",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage:
            "linear-gradient(180deg, rgba(16, 20, 30, 0.95) 0%, rgba(20, 27, 45, 0.95) 100%)",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "rgba(59, 130, 246, 0.08)",
            transform: "translateX(4px)",
          },
        },
      },
    },
  },
});

export default function StartupsSidebar() {
  const { user } = React.useContext(UserDataContext);
  const [joinedStartups, setJoinedStartups] = React.useState([]);
  const { startupsData } = useStartupsData();
  const joinedGroupIds = new Set(joinedStartups.map((s) => s.groupId));
  const navigate = useNavigate();

  const handleJoin = async (startup) => {
    if (joinedStartups.includes(startup.name)) return;

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
            group: startup._id, // ✅ Correct: Send the ObjectId
          }),
        }
      );

      if (res.ok) {
        window.location.reload();
        setJoinedStartups((prev) => [startup.name, ...prev]);
      } else {
        toast.error("Already joined group");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLeave = async (startup) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/group/leave-group`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user._id,
            group: startup._id,
          }),
        }
      );

      if (res.ok) {
        setJoinedStartups((prev) =>
          prev.filter((name) => name.name !== startup.name)
        );
      } else {
        console.log("Failed to leave group");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  React.useEffect(() => {
    const fetchJoinedStartups = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/group/join-group?userId=${user._id}`
        );
        const data = await res.json();

        // Map through the group IDs and match with the startupsData to get the full details (name and bgColor)
        const joinData = data
          .map((group) => {
            // Find the startup object that matches the group ID
            const startup = startupsData.find(
              (startup) => startup._id === group.group
            );
            if (startup) {
              return {
                name: startup.name,
                bgColor: startup.bgColor,
                groupId: group.group, // You can keep the group ID if needed
              };
            }
            return null; // If no match is found
          })
          .filter(Boolean); // Remove any null values if a match is not found

        // Set the joined startups data to state
        setJoinedStartups(joinData);
      } catch (error) {
        console.error("Failed to fetch joined startups:", error);
      }
    };

    if (user?._id) {
      fetchJoinedStartups();
    }
  }, [user?._id, startupsData]);

  const handleChatNavigate = (startupName) => {
    navigate(`/Chat/${startupName}`);
  };

  return (
    <ThemeProvider theme={zincTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              height: "100vh",
              position: "fixed",
              backgroundColor: "background.default",
              borderRight: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              overflowY: "scroll",
              "&::-webkit-scrollbar": { display: "none" },
            },
          }}
        >
          <Toolbar />
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Suggested Startups
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Here are some exciting startups to explore. Join the ones that
              interest you!
            </Typography>
          </Box>

          <Divider sx={{ mt: 2 }} />

          {/* Joined Startups */}
          {joinedStartups.length > 0 && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your Startups
                <br />
                Click on it to chat :
              </Typography>
              <List>
                {joinedStartups.map((startupName, index) => {
                  const startup = startupsData.find(
                    (s) => s.name === startupName.name
                  );
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        sx={{
                          borderRadius: 2,
                          background:
                            "linear-gradient(135deg, #0D1B2A 0%, #1E293B 100%)",
                          mb: 1,
                          px: 2,
                          py: 1.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          transition: "all 0.25s ease-in-out",
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                          "&:hover": {
                            transform: "translateX(4px)",
                            background:
                              "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            onClick={() => handleChatNavigate(startupName.name)}
                            sx={{
                              backgroundColor: startup?.bgColor || "#3b82f6",
                              marginRight: 2,
                              fontWeight: 600,
                              fontSize: "1rem",
                            }}
                          >
                            {startup?.name?.[0]}
                          </Avatar>
                          <ListItemText
                            primary={`In/${startupName.name}`}
                            primaryTypographyProps={{ fontSize: "12px" }}
                          />
                        </Box>
                        <Button
                          onClick={() => handleLeave(startup)}
                          sx={{
                            textTransform: "none",
                            borderRadius: "5px",
                            fontSize: "0.75rem",
                            transition: "all 0.2s ease-in-out",
                            color: "red",
                            p: 1,
                            overflow: "hidden",
                          }}
                        >
                          Exit
                        </Button>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          )}

          <Divider />

          {/* Suggested Startups (Filtered) */}
          <List sx={{ pt: 2 }}>
            {startupsData
              .filter((startup) => !joinedGroupIds.has(startup._id))
              .map((startup) => (
                <ListItem key={startup.name} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    sx={{
                      borderRadius: 2,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: "rgba(59, 130, 246, 0.08)",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: startup.bgColor || "#1e3a8a",
                        marginRight: 2,
                      }}
                    >
                      {startup.name[0]}
                    </Avatar>
                    <ListItemText primary={startup.name} />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleJoin(startup)}
                      sx={{
                        marginLeft: 2,
                        textTransform: "none",
                        borderRadius: "12px",
                        boxShadow: "none",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                        },
                      }}
                    >
                      Join
                    </Button>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>

          <Divider />
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflowY: "scroll",
            backgroundColor: "background.default",
          }}
        >
          <ScrollableCard
            joinedStartups={joinedStartups}
            setJoinedStartups={setJoinedStartups}
          />
        </Box>

        <ValidateIdeaBtn />
      </Box>
    </ThemeProvider>
  );
}
