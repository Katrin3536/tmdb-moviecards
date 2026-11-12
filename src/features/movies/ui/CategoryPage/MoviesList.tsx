import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Pagination} from '../../../../common/components';
import {fallbackPoster, imageBaseUrl} from '../../../../common/constants';
import type {ResultType} from '../../api/moviesApi.types';
import {MovieCard} from '../Card/MovieCard';


type Props = {
    activeCategory: string;
    movies: ResultType[];
    page: number;
    pageCount: number;
    setPage: (page: number) => void;
}

export const MoviesList = ({activeCategory, movies, page, pageCount, setPage}: Props) => {
    return (
        <>
            <Typography component="h1" sx={{mb: 2.5, fontSize: {xs: 24, sm: 28}, fontWeight: 500}}>
                {activeCategory}
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(2, minmax(0, 1fr))',
                        sm: 'repeat(3, minmax(0, 1fr))',
                        md: 'repeat(4, minmax(0, 1fr))',
                        lg: 'repeat(5, minmax(0, 1fr))',
                    },
                    gap: {xs: 2, md: 2.5},
                }}
            >
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        rating={movie.vote_average}
                        poster={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackPoster}
                    />
                ))}
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={setPage}
                    ariaLabel={`${activeCategory} pages`}
                />
            </Box>
        </>
    );
};
