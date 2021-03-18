import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Home from './pages/Home';

function App() {
    const theme = createMuiTheme({
        palette: {
            type: 'light'
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <Home />
            </div>
        </ThemeProvider>
    );
}

export default App;
