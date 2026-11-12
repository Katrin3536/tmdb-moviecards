import { ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import {ErrorSnackbar, Header, LoadingProgress, Routing} from '../common/components';
import CssBaseline from "@mui/material/CssBaseline"
import {Footer} from '../common/components';
import {useAppSelector} from '../common/hooks';
import {getTheme} from '../common/theme';
import {selectThemeMode} from './app-slice';
import styles from "./App.module.css"

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.app} style={{minHeight: '100vh'}}>
                <CssBaseline />
                <Header />
                <LoadingProgress />
                <Box component="main" sx={{flexGrow: 1}}>
                    <Routing />
                </Box>
                <ErrorSnackbar />
                <Footer/>
            </div>
        </ThemeProvider>
    );
};
