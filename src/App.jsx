import "./App.css";
import Map from "./Map/components/Map";
import Home from "./Home/components/Home";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { GlobalProvider } from "./GlobalPrompt";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#eae2d4",
          },
          "& label.Mui-focused": {
            color: "#ffb74d",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#eae2d4",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#eae2d4",
            },
            "&:hover fieldset": {
              borderColor: "#eae2d4",
              borderWidth: "0.1rem",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffb74d",
            },
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalProvider>
          <div className="App">
            <Routes>
              <Route index element={<Home />} />
              <Route path="app" element={<Map />} />
            </Routes>
          </div>
        </GlobalProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
