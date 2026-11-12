import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router';

type Props = {
    title: string
}

const categoryPaths: Record<string, string> = {
    'Popular Movies': '/movies/popular',
    'Top Rated Movies': '/movies/top-rated',
    'Upcoming Movies': '/movies/upcoming',
    'Now Playing Movies': '/movies/now-playing',
};

export const TitleMainPage = ({title}:Props) => {
    return (
        <Box
            component="header"
            sx={{
                minHeight: 115,
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: {xs: 2, sm: 3},
                }}
            >
                <Typography
                    component="h2"
                    sx={{
                        color: 'text.primary',
                        fontSize: {xs: 24, sm: 28},
                        fontWeight: 600,
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </Typography>
                <Button
                    component={Link}
                    to={categoryPaths[title]}
                    variant="outlined"
                    sx={{
                        px: 2,
                        py: 0.75,
                        borderColor: 'divider',
                        borderRadius: 999,
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        fontSize: 16,
                        fontWeight: 500,
                        lineHeight: 1.5,
                        textTransform: 'none',
                        '&:hover': {
                            borderColor: 'text.disabled',
                            bgcolor: 'action.hover',
                        },
                    }}
                >
                    View more
                </Button>
            </Container>
        </Box>
    );
};
