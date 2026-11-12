import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {imageBaseUrlOriginal} from '../../../../common/constants';
import {getRandomMovie} from '../../../../common/utils';
import type {ResultType} from '../../api/moviesApi.types';
import {SearchInput} from '../SearchPage/SearchInput';

type Props = {
    movies: ResultType[] | undefined;
}

export const WelcomeSection = ({movies}: Props) => {
    const [randomValue] = useState(() => Math.random());
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const randomMovie = getRandomMovie(movies, randomValue);
    const posterUrl = randomMovie?.poster_path
        ? `${imageBaseUrlOriginal}${randomMovie.poster_path}`
        : undefined;

    return (
        <Box
            component="section"
            sx={{
                height: 700,
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                color: '#fff',
                backgroundImage: posterUrl ? `url("${posterUrl}")` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    width: '100%',
                    px: {xs: 2, sm: 3},
                }}
            >
                <Box sx={{width: '100%'}}>
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            mb: 2.5,
                            color: 'inherit',
                            fontSize: {xs: 40, sm: 56},
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                        }}
                    >
                        Welcome
                    </Typography>
                    <Typography
                        component="h2"
                        variant="h2"
                        sx={{
                            mb: 3.5,
                            color: 'inherit',
                            fontSize: {xs: 20, sm: 30},
                            fontWeight: 600,
                            lineHeight: 1.3,
                        }}
                    >
                        Browse highlighted titles from TMDB
                    </Typography>
                    <SearchInput
                        value={searchValue}
                        onChange={setSearchValue}
                        onSubmit={(query) => {
                            if (query) navigate(`/search?query=${encodeURIComponent(query)}`);
                        }}
                    />
                </Box>
            </Container>
        </Box>
    );
};
