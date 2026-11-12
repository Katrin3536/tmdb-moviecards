import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {MovieGridSkeleton} from '../../../../common/components';
import {imageBaseUrl} from '../../../../common/constants';
import type {ResultType} from '../../api/moviesApi.types';
import {MovieCard} from '../Card/MovieCard';
import {TitleMainPage} from './TitleMainPage';

type Props = {
    title: string;
    movies: ResultType[] | undefined;
    isLoading?: boolean;
};

export const MainMoviesList = ({title, movies, isLoading = false}:Props) => {

    return (
        <section>
            <TitleMainPage title={title}/>
            <Container
                maxWidth="lg"
                sx={{
                    width: '100%',
                    px: {xs: 2, sm: 3},
                }}
            >
                {isLoading ? <MovieGridSkeleton count={6} /> : <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, minmax(0, 1fr))',
                            sm: 'repeat(3, minmax(0, 1fr))',
                            md: 'repeat(4, minmax(0, 1fr))',
                            lg: 'repeat(6, minmax(0, 1fr))',
                        },
                        width: '100%',
                        gap: {xs: 2, md: 2.5},
                    }}
                >
                    {movies?.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            rating={movie.vote_average}
                            poster={`${imageBaseUrl}${movie.poster_path}`}
                        />
                    ))}
                </Box>}
            </Container>
        </section>
    );
};