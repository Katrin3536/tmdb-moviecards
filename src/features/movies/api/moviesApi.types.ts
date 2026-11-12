import {z} from 'zod';

const movieSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

const movieListResponseSchema = z.object({
    page: z.number(),
    results: z.array(movieSchema),
    total_pages: z.number(),
    total_results: z.number(),
});

const nowPlayingResponseSchema = movieListResponseSchema.extend({
    dates: z.object({
        maximum: z.string(),
        minimum: z.string(),
    }),
});

const movieDetailsResponseSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genres: z.array(z.object({
        id: z.number(),
        name: z.string(),
    })),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    runtime: z.number().nullable(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
    credits: z.object({
        cast: z.array(z.object({
            id: z.number(),
            name: z.string(),
            character: z.string(),
            profile_path: z.string().nullable(),
        })),
    }),
    similar: movieListResponseSchema,
});

export type MovieNowPlayingResponse = z.infer<typeof nowPlayingResponseSchema>;
export type MoviePopularResponse = z.infer<typeof movieListResponseSchema>;
export type MovieDetailsResponse = z.infer<typeof movieDetailsResponseSchema>;
export type ResultType = z.infer<typeof movieSchema>;

export {
    movieDetailsResponseSchema,
    movieListResponseSchema,
    nowPlayingResponseSchema,
};
