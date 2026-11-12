import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {selectThemeMode} from '../../../app/app-slice';
import {useAppSelector} from '../../hooks';

export const Footer = () => {
    const themeMode = useAppSelector(selectThemeMode);

    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                py: 2.5,
                bgcolor: themeMode === 'light' ? '#f4effa' : '#251d33',
                color: 'text.secondary',
                borderTop: 1,
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    © 2026 Kinopoisk Demo · Data courtesy of TMDB.
                </Typography>
            </Container>
        </Box>
    );
};
