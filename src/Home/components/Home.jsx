import background from "/Assets/map.png";
import { Box, Typography, Button } from "@mui/material";
import Form from "./Form";
import { useState } from "react";

const Home = () => {
  const [displayForm, setDisplayForm] = useState(false);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: `linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(${background})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" sx={{ maxWidth: "80%", paddingBottom: "2rem" }}>
         An AI-Powered Educational Resource on "Global Health"
      </Typography>
      {displayForm ? (
        <Form></Form>
      ) : (
        <Button
        variant="contained"
        onClick={() => setDisplayForm(true)}
        sx={{ backgroundColor: "#ffb74d", color: "#293949", fontSize: "1.5rem"}}
    >
        Start
    </Button>
      )}
    </Box>
  );
};

export default Home;
