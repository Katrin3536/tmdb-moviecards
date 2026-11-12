import {baseApi} from '../../../app/baseApi';
import type {MovieDetailsResponse, MovieNowPlayingResponse, MoviePopularResponse} from './moviesApi.types';
import {
    movieDetailsResponseSchema,
    movieListResponseSchema,
    nowPlayingResponseSchema,
} from './moviesApi.types';

export type MovieCategory = 'popular' | 'top-rated' | 'upcoming' | 'now-playing';
export type DiscoverSortBy =
    | 'popularity.desc'
    | 'popularity.asc'
    | 'vote_average.desc'
    | 'vote_average.asc'
    | 'release_date.desc'
    | 'release_date.asc'
    | 'original_title.asc'
    | 'original_title.desc';

const categoryEndpoints: Record<MovieCategory, string> = {
    popular: '/movie/popular',
    'top-rated': '/movie/top_rated',
    upcoming: '/movie/upcoming',
    'now-playing': '/movie/now_playing',
};

export const moviesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNowPlayingMovies: builder.query<MovieNowPlayingResponse, void>({
            query: () => "/movie/now_playing",
            responseSchema: nowPlayingResponseSchema,
        }),
        getPopularMovies: builder.query<MoviePopularResponse, void>({
            query: () => "/movie/popular",
            responseSchema: movieListResponseSchema,
        }),
        getTopRatedMovies: builder.query<MoviePopularResponse, void>({
            query: () => "/movie/top_rated",
            responseSchema: movieListResponseSchema,
        }),
        getUpcomingMovies: builder.query<MoviePopularResponse, void>({
            query: () => "/movie/upcoming",
            responseSchema: movieListResponseSchema,
        }),
        getMovieDetails: builder.query<MovieDetailsResponse, string>({
            query: (id) => `/movie/${id}?append_to_response=credits,similar`,
            responseSchema: movieDetailsResponseSchema,
        }),
        searchMovies: builder.query<MoviePopularResponse, {query: string; page: number}>({
            query: ({query, page}) => ({
                url: '/search/movie',
                params: {query, page, include_adult: false},
            }),
            responseSchema: movieListResponseSchema,
        }),
        getMoviesByCategory: builder.query<MoviePopularResponse, {category: MovieCategory; page: number}>({
            query: ({category, page}) => ({
                url: categoryEndpoints[category],
                params: {page},
            }),
            responseSchema: movieListResponseSchema,
        }),
        discoverMovies: builder.query<MoviePopularResponse, {
            page: number;
            sortBy: DiscoverSortBy;
            voteAverageGte: number;
            voteAverageLte: number;
            genreIds: number[];
        }>({
            query: ({page, sortBy, voteAverageGte, voteAverageLte, genreIds}) => ({
                url: '/discover/movie',
                params: {
                    page,
                    sort_by: sortBy,
                    'vote_average.gte': voteAverageGte,
                    'vote_average.lte': voteAverageLte,
                    ...(genreIds.length > 0 ? {with_genres: genreIds.join('|')} : {}),
                },
            }),
            responseSchema: movieListResponseSchema,
        }),

    }),

})

export const {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetMovieDetailsQuery,
    useGetMoviesByCategoryQuery,
    useDiscoverMoviesQuery,
    useSearchMoviesQuery,
} = moviesApi
