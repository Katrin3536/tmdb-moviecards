import type {ResultType} from '../../features/movies/api/moviesApi.types';

export const getRandomMovie = (movies: ResultType[] | undefined, randomValue: number) => {
    if (!movies?.length) return undefined;
    return movies[Math.floor(randomValue * movies.length)];
};