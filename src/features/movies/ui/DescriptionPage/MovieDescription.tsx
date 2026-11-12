import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {useNavigate, useParams} from 'react-router';
import {MovieDescriptionSkeleton} from '../../../../common/components';
import {fallbackPoster, imageBaseUrl, imageBaseUrlActor} from '../../../../common/constants';
import {formatRuntime} from './FormatRuntime';
import {useGetMovieDetailsQuery} from '../../api/moviesApi';
import {MovieCard} from '../Card/MovieCard';


export const MovieDescription = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {currentData: movie, isLoading, isFetching, isError} = useGetMovieDetailsQuery(id ?? '', {skip: !id});

    if (isLoading || (isFetching && !movie)) {
        return <MovieDescriptionSkeleton />;
    }

    if (isError || !movie) {
        return (
            <Container maxWidth="lg" sx={{py: 4}}>
                <Typography role="alert">Could not load movie details.</Typography>
            </Container>
        );
    }

    const poster = movie.poster_path
        ? `${imageBaseUrl}${movie.poster_path}`
        : fallbackPoster;
    const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown';

    return (
        <Container maxWidth="lg" sx={{py: {xs: 3, md: 3.5}, px: {xs: 2, sm: 3}}}>
            <Box
                component="section"
                aria-labelledby="movie-title"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', md: 'minmax(240px, 315px) minmax(0, 1fr)'},
                    columnGap: {xs: 3, md: 4.5},
                    rowGap: 3,
                }}
            >
                <Box
                    component="img"
                    src={poster}
                    alt={`${movie.title} movie poster`}
                    sx={{
                        display: 'block',
                        width: '100%',
                        maxWidth: {xs: 280, md: 'none'},
                        aspectRatio: '2 / 3',
                        objectFit: 'cover',
                        borderRadius: movie.poster_path ? 2 : 0,
                        bgcolor: movie.poster_path ? 'transparent' : '#e3e5e9',
                        boxShadow: 4,
                    }}
                />
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: {xs: 'flex-start', sm: 'center'},
                            justifyContent: 'space-between',
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Typography
                            id="movie-title"
                            component="h1"
                            sx={{fontSize: {xs: 32, sm: 40}, fontWeight: 700, lineHeight: 1.2}}
                        >
                            {movie.title}
                        </Typography>
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            sx={{
                                flexShrink: 0,
                                borderRadius: 999,
                                textTransform: 'none',
                                color: 'text.primary',
                                borderColor: 'divider',
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3}}>
                        <Typography color="text.secondary">Release year: {releaseYear}</Typography>
                        <Paper
                            elevation={2}
                            sx={{
                                width: 46,
                                height: 46,
                                display: 'grid',
                                placeItems: 'center',
                                borderRadius: '50%',
                                bgcolor: '#08a94f',
                                color: '#fff',
                                fontWeight: 700,
                            }}
                        >
                            {movie.vote_average.toFixed(1)}
                        </Paper>
                        <Typography color="text.secondary">Runtime: {formatRuntime(movie.runtime)}</Typography>
                    </Box>
                    <Typography
                        component="p"
                        sx={{mb: 3, color: 'text.secondary', fontSize: {xs: 16, md: 20}, lineHeight: 1.65}}
                    >
                        {movie.overview || 'No overview is available for this movie.'}
                    </Typography>
                    <Typography component="h2" sx={{mb: 1.5, fontSize: 22, fontWeight: 600}}>
                        Genres
                    </Typography>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1.5}}>
                        {movie.genres.map((genre) => (
                            <Chip key={genre.id} label={genre.name} sx={{px: 0.5}} />
                        ))}
                        {movie.genres.length === 0 && (
                            <Typography color="text.secondary">No genres available.</Typography>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box component="section" aria-labelledby="cast-title" sx={{mt: {xs: 4, md: 5}}}>
                <Typography id="cast-title" component="h2" sx={{mb: 2.5, fontSize: 24, fontWeight: 600}}>
                    Cast
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, minmax(0, 1fr))',
                            sm: 'repeat(3, minmax(0, 1fr))',
                            md: 'repeat(6, minmax(0, 1fr))',
                        },
                        gap: {xs: 2, md: 3},
                    }}
                >
                    {movie.credits.cast.slice(0, 6).map((actor) => (
                        <Box key={actor.id} sx={{minWidth: 0, textAlign: 'center'}}>
                            <Avatar
                                src={actor.profile_path ? `${imageBaseUrlActor}${actor.profile_path}` : undefined}
                                alt={actor.name}
                                sx={{
                                    width: {xs: 112, sm: 140, md: 'min(100%, 180px)'},
                                    height: {xs: 112, sm: 140, md: 'auto'},
                                    aspectRatio: '1 / 1',
                                    mx: 'auto',
                                    mb: 1.5,
                                }}
                            >
                                {actor.name.charAt(0)}
                            </Avatar>
                            <Typography sx={{fontSize: 16, fontWeight: 500}}>{actor.name}</Typography>
                            <Typography sx={{mt: 0.5, color: 'text.secondary', fontSize: 14}}>
                                {actor.character}
                            </Typography>
                        </Box>
                    ))}
                    {movie.credits.cast.length === 0 && (
                        <Typography color="text.secondary">Cast information is unavailable.</Typography>
                    )}
                </Box>
            </Box>

            <Box component="section" aria-labelledby="similar-title" sx={{mt: {xs: 4, md: 5}}}>
                <Typography id="similar-title" component="h2" sx={{mb: 2.5, fontSize: 24, fontWeight: 600}}>
                    Similar Movies
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, minmax(0, 1fr))',
                            sm: 'repeat(3, minmax(0, 1fr))',
                            md: 'repeat(6, minmax(0, 1fr))',
                        },
                        gap: {xs: 2, md: 3},
                    }}
                >
                    {movie.similar.results.slice(0, 6).map((similarMovie) => (
                        <MovieCard
                            key={similarMovie.id}
                            id={similarMovie.id}
                            title={similarMovie.title}
                            rating={similarMovie.vote_average}
                            poster={similarMovie.poster_path
                                ? `${imageBaseUrl}${similarMovie.poster_path}`
                                : fallbackPoster}
                        />
                    ))}
                    {movie.similar.results.length === 0 && (
                        <Typography
                            color="text.secondary"
                            sx={{gridColumn: '1 / -1', whiteSpace: 'nowrap'}}
                        >
                            No similar movies found.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
};
