import * as React from 'react';
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
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import startupsData from './startups.json'; // Your JSON file with name and bgColor

const drawerWidth = 240;

const zincTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#10141E',
      paper: '#141B2D',
    },
    text: {
      primary: '#fff',
      secondary: '#b0b0b0',
    },
  },
});

export default function StartupsSidebar() {
  const [joinedStartups, setJoinedStartups] = React.useState([]);

  const handleJoin = (startupName) => {
    if (!joinedStartups.includes(startupName)) {
      setJoinedStartups((prev) => [startupName, ...prev]);
    }
  };

  return (
    <ThemeProvider theme={zincTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              height: '100vh',
              position: 'fixed',
              top: 0,
              backgroundColor: '#10141E',
              color: '#fff',
              overflowY: 'scroll',
              overflowX: 'hidden',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Suggested Startups
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Here are some exciting startups to explore. Join the ones that interest you!
            </Typography>
          </Box>

          <Divider sx={{ mt: 2 }} />

          {/* Joined Startups */}
          {joinedStartups.length > 0 && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your Startups
              </Typography>
              <List>
                {joinedStartups.map((startupName, index) => {
                  const startup = startupsData.find((s) => s.name === startupName);
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        sx={{
                          borderRadius: 2,
                          backgroundColor: '#0D1B2A', // Dark blue background
                          mb: 1,
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor: startup?.bgColor || '#1e3a8a',
                            marginRight: 2,
                          }}
                        >
                          {startup?.name?.[0]}
                        </Avatar>
                        <ListItemText primary={startupName} />
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
              .filter((startup) => !joinedStartups.includes(startup.name))
              .map((startup) => (
                <ListItem key={startup.name} disablePadding>
                  <ListItemButton sx={{ borderRadius: 2, mb: 1 }}>
                    <Avatar
                      sx={{
                        backgroundColor: startup.bgColor || '#1e3a8a',
                        marginRight: 2,
                      }}
                    >
                      {startup.name[0]}
                    </Avatar>
                    <ListItemText primary={startup.name} />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleJoin(startup.name)}
                      sx={{ marginLeft: 2 }}
                    >
                      Join
                    </Button>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>

          <Divider />
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
          {/* Optional main content */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
