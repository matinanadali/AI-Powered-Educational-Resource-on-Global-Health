import { Typography } from "@mui/material";

const Header = () => {
  return (
    <Typography
      variant="h5"
      sx={{
        backgroundColor: "#ffb74d",
        height: "15vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 0.5rem"
      }}
    >
      Click on any marker to discover how each region has contributed to global
      health!
    </Typography>
  );
};

export default Header;
