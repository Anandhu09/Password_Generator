import PasswordGenarator from './PasswordGenarator';
import './App.css';
import { SnackbarProvider } from 'notistack'; 
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
