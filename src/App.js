import PasswordGenarator from './PasswordGenarator';
import './App.css';
import { SnackbarProvider, useSnackbar } from 'notistack'; // Import useSnackbar from notistack
function App() {
  return (
    <SnackbarProvider maxSnack={1} 
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}>
      <div className="App">
        <PasswordGenarator />
      </div>
    </SnackbarProvider>
  );
}

export default App;
