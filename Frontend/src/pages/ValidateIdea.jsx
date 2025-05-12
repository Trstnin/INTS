import React, {useState, useRef, useEffect} from "react";

import {
    Box, 
    Typography,
    TextField,
    Button,
    Paper,
    Divider, 
} from "@mui/material"
import NavbarIdea from "../components/IdeaComp/NavBarIdea";

const ValidateIdea = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const chatEndRef = useRef(null);
    
    const handleSend = () => {
        if(!userInput.trim()) return;

        const newMessage = {sender: "user", text: userInput};
        const aiReply = {
            sender: 'ai',
            text: 'Your idea looks good! Let me review it nicely 😄'
        } ;

        setMessages((prev) => [...prev, newMessage, aiReply]);
        setUserInput("");
    };
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behaviour: "smooth"});
    }, [messages]);

    return (
        <Box 
        sx={{
         height:"100vh", 
         width:"100vw", 
         bgcolor:"#27272A"}}
         >
          <NavbarIdea />

          <Box
          sx={{
           p:2,
           maxWidth:700,
           mx:"auto",
           mt:"20px"
          }}>
            {/* Disclaimer  */}
            <Paper
            sx={{
                p:2,
                mb:3,
                backgroundColor:"#facc15",
                color:"#1c1917",
                borderRadius:"10px",
                fontSize:"0.9rem",
            }}
            elevation={3}
            >
           ⚠️ This chat is <strong>not stored</strong> and will be {" "}
           <strong>removed after each refresh</strong>
            </Paper>

            {/* Chat Window  */}
            <Paper
            sx={{
                p:2,
                minHeight:400,
                maxHeight:500,
                mb:2,
                overflowY: "auto",
                backgroundColor:"#1E1E20",
                borderRadius:"10px",
                scrollbarColor:"#888 #1E1E20",
                scrollbarWidth: "thin",
            }}
            >
                { messages.length === 0 ? (
                  <Typography variant="body2" sx={{color:"#9ca3af"}}>
                  Start chatting with AI about your startup Idea...
                  </Typography>
                ): (
                    messages.map((msg, idx) => (
                        <Box
                        key={idx}
                        sx={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:msg.sender === 'user' ? "flex-end" : "flex-start",
                            mb:1.5,  
                        }}
                        >
                            <Box
                            sx={{
                                maxWidth: "80%",
                                p:1.5,
                                borderRadius:"15px",
                                backgroundColor:
                                     msg.sender === 'user' ? "#3B82F6" : "#4f46e5",
                                color: '#fff',
                                fontSize: "0.95rem",
                                transition:"0.3s ease-in-out",     
                            }}
                            >
                                {msg.text}

                            </Box>

                        </Box>
                    ))
                )}
              <div ref={chatEndRef} /> 
            </Paper>

            {/* Input Box  */}
            <Box
            sx={{display: "flex", gap:1}}>
                <TextField 
                fullWidth
                label= 'Validate your startup idea...'
                variant="outlined"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                InputLabelProps={{style: {color:"#cbd5e1"}}}
                inputProps={{
                    style:{
                        backgroundColor: "#1E1E20",
                        color:"#fff",
                        borderRadius:"8px",
                    },
                }}
                />
                <Button
                variant="contained"
                onClick={handleSend}
                sx={{
                    backgroundColor:"#6366f1",
                    textTransform:"none",
                    borderRadius:"8px",
                    "&:hover":{
                        backgroundColor:"#4f46e5",
                    },
                }}
                >
                   Send
                </Button>
            </Box>

          </Box>
        </Box>
    )
}

export default ValidateIdea