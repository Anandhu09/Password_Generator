import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Snackbar,
  Typography
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useSnackbar } from "notistack";
import "./App.css";

function App() {
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeAlphabets, setIncludeAlphabets] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [previousPasswords, setPreviousPasswords] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const generatePassword = () => {
    const numbers = "0123456789";
    const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*";

    if(includeAlphabets || includeNumbers || includeSpecialChars){
    let allChars = "";
    if (includeNumbers) allChars += numbers;
    if (includeAlphabets) allChars += alphabets;
    if (includeSpecialChars) allChars += specialChars;

    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      newPassword += allChars[randomIndex];
    }

    setGeneratedPassword(newPassword);
    setPreviousPasswords((prevPasswords) => [
      newPassword,
      ...prevPasswords.slice(0, 4)
    ]);
    
    }else{
        enqueueSnackbar("Select atleast one of the preferences ", { variant: "error" ,autoHideDuration:3000});
    }
  };
  useEffect(()=>{
    localStorage.setItem(
        "previousPasswords",
        JSON.stringify(previousPasswords)
      );
  },[previousPasswords])

  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = generatedPassword;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    enqueueSnackbar("Password copied to the Clipboard", { variant: "success" ,autoHideDuration:3000});

  };



  return (
    <div className="password_top">
      <Typography variant="h4">Random Password Generator</Typography>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
          }
          label="Include Numbers"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeAlphabets}
              onChange={() => setIncludeAlphabets(!includeAlphabets)}
            />
          }
          label="Include Alphabets"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
            />
          }
          label="Include Special Characters"
        />
      </div>
      <Button  style={{  marginTop: '5px',marginBottom: '5px' }}variant="contained" color="primary" onClick={generatePassword}>
        Generate Password
      </Button>
      {generatedPassword && (
        <>
          <Typography variant="subtitle1" style={{  marginTop: '5px',marginBottom: '5px' }}>
          
           Current Generated Password : 
          </Typography>
          <Typography style ={{fontWeight:"bold"}}>{generatedPassword}</Typography>
          <Button
          style={{  marginTop: '5px',marginBottom: '5px' }}
            variant="outlined"
            color="primary"
            startIcon={<FileCopyIcon />}
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </Button>
        </>
        
      )}

      <Typography variant="h5" style={{  marginTop: '5px',marginBottom: '5px' }}>Previous Passwords</Typography>
      <div className="List">
      <List>
        {previousPasswords.map((password, index) => (
          <ListItem key={index}>
            <Typography>{index+1}. {password}</Typography>
          </ListItem>
        ))}
      </List>
      </div>
    </div>
  );
}

export default App;
