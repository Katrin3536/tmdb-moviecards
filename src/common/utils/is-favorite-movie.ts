import type {FavoriteMovie} from '../../app/app-slice';

type StoredFavoriteMovie = Omit<FavoriteMovie, 'id'> & {id: string | number};

export const isFavoriteMovie = (value: unknown): value is StoredFavoriteMovie => {
    if (typeof value !== 'object' || value === null) return false;

    const movie = value as Record<string, unknown>;
    return (typeof movie.id === 'string' || (typeof movie.id === 'number' && Number.isFinite(movie.id)))
        && typeof movie.title === 'string'
        && typeof movie.rating === 'number'
        && typeof movie.poster === 'string';
};