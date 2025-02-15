import {
  Box,
  Button,
  Typography,
  Checkbox,
  checkboxClasses,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useGlobalContext } from "../../GlobalPrompt";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [duration, setDuration] = useState("");
  const [age, setAge] = useState("");
  const [focusFields, setFocusFields] = useState([]);

  const navigate = useNavigate();
  const { globalPrompt, setGlobalPrompt } = useGlobalContext();

  const handleCheckboxChange = (field) => {
    setFocusFields((prev) =>
      prev.includes(field)
        ? prev.filter((item) => item !== field)
        : [...prev, field]
    );
  };

  const handleSubmit = () => {
    // Generate global prompt
    let prompt = "The story should be no more than 80 words long.";

    if (age) {
      prompt += " The target learner audience is " + age + " years old.";
    }
    if (focusFields) {
      prompt += " Where possible, focus on the following fields: ";
      for (let i = 0; i < focusFields.length; i++) {
        prompt += focusFields[i] + ", ";
      }
    }
    setGlobalPrompt(prompt);
    navigate("app");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#293949",
        padding: "1.5rem",
        borderRadius: 2,
        width: {xs: "70%", sm : "70%", md: "400px", lg: "400px"},
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ color: "#eae2d4", marginBottom: 2 }}>
        Let's Design Your Course!
      </Typography>

      <TextField
        fullWidth
        label="Activity Duration"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        sx={{
          marginBottom: 2,
          input: { color: "#eae2d4" },
          label: { color: "#eae2d4" },
        }}
      />

      <TextField
        fullWidth
        label="Learners' Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        sx={{
          marginBottom: 2,
          input: { color: "#eae2d4" },
          label: { color: "#eae2d4" },
        }}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {[
          "Biology",
          "Chemistry",
          "Technology",
          "Engineering",
          "Medicine",
          "Mathematics",
        ].map((field) => (
          <FormControlLabel
            key={field}
            control={
              <Checkbox
                checked={focusFields.includes(field)}
                onChange={() => handleCheckboxChange(field)}
                sx={{ color: "#ffb74d",  [`&, &.${checkboxClasses.checked}`]: {
                  color: "#ffb74d",
                },}}
               
              />
            }
            label={field}
            sx={{ color: "#eae2d4", mr: 2 }}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={() => handleSubmit()}
        sx={{ backgroundColor: "#ffb74d", color: "#293949" }}
      >
        <Link to="app" sx={{textDecoration: "none", color:"inherit"}}>Start Learning!</Link>
      </Button>
    </Box>
  );
};

export default Form;
