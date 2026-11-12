import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router';
import {changeThemeModeAC, selectThemeMode} from '../../../app/app-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';

const navigationItems = [
    {label: 'Main', to: '/'},
    {label: 'Category movies', to: '/movies/popular'},
    {label: 'Filtered movies', to: '/filtered-movies'},
    {label: 'Search', to: '/search'},
    {label: 'Favorites', to: '/favorites'},
];

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode);
    const dispatch = useAppDispatch();

    const changeMode = () => {
        const nextThemeMode = themeMode === 'light' ? 'dark' : 'light';
        dispatch(changeThemeModeAC({themeMode: nextThemeMode}));
        window.localStorage.setItem('themeMode', nextThemeMode);
    };

    return (
        <AppBar
            position="static"
            color="default"
            sx={{
                bgcolor: themeMode === 'light' ? '#f4effa' : '#251d33',
                color: 'text.primary',
                boxShadow: 'none',
                borderBottom: 1,
                borderColor: 'divider',
            }}
        >
            <Toolbar sx={{minHeight: '72px !important'}}>
                <Container
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'relative',
                        px: {xs: 2, sm: 3},
                    }}
                >
                    <Box
                        component={Link}
                        to="/"
                        aria-label="TMDB home"
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.6,
                            textDecoration: 'none',
                        }}
                    >
                        <Box
                            component="img"
                            src="../../../assets/blue_long_movie.svg"
                            alt="TMDB"
                            sx={{
                                display: 'block',
                                width: 200,
                                height: 'auto',
                            }}
                        />
                    </Box>

                    <Box
                        component="nav"
                        aria-label="Main navigation"
                        sx={{
                            position: {md: 'absolute'},
                            left: {md: '50%'},
                            transform: {md: 'translateX(-50%)'},
                            display: {xs: 'none', md: 'flex'},
                            alignItems: 'center',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {navigationItems.map((item, index) => (
                            <Box key={item.label} sx={{display: 'flex', alignItems: 'center'}}>
                                {index > 0 && (
                                    <Box
                                        aria-hidden="true"
                                        sx={{
                                            height: 16,
                                            borderLeft: 1,
                                            borderColor: 'text.disabled',
                                            mx: 2,
                                        }}
                                    />
                                )}
                                <Typography
                                    component={Link}
                                    to={item.to}
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        px: 0.5,
                                        py: 0.35,
                                        border: 1,
                                        borderColor: 'transparent',
                                        borderRadius: 1,
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        fontSize: 16,
                                        fontWeight: 600,
                                        '&:hover': {color: 'primary.main'},
                                        '&:active': {outline: '1px solid', outlineColor: 'divider'},
                                        '&:focus-visible': {
                                            outline: '1px solid',
                                            outlineColor: 'text.disabled',
                                            outlineOffset: 2,
                                        },
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <IconButton
                        onClick={changeMode}
                        aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} theme`}
                        title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} theme`}
                        sx={{
                            width: 46,
                            height: 46,
                            border: 1,
                            borderColor: 'divider',
                            bgcolor: 'background.paper',
                        }}
                    >
                        {themeMode === 'light' ? (
                            <DarkModeIcon sx={{fontSize: 22, color: '#f3a43b'}} />
                        ) : (
                            <LightModeIcon sx={{fontSize: 22, color: '#f3c64e'}} />
                        )}
                    </IconButton>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
