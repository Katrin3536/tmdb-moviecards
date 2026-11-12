import {type FavoriteMovie} from '../../app/app-slice';
import {isFavoriteMovie} from './is-favorite-movie';

export const favoritesStorageKey = 'favoriteMovies';

export const getInitialFavorites = (): FavoriteMovie[] => {
    if (typeof window === 'undefined') return [];

    const storedFavorites = window.localStorage.getItem(favoritesStorageKey);
    if (storedFavorites === null) return [];

    const parsedFavorites: unknown = JSON.parse(storedFavorites);
    if (!Array.isArray(parsedFavorites) || !parsedFavorites.every(isFavoriteMovie)) {
        throw new Error('Stored favorite movies have an invalid format.');
    }

    return parsedFavorites.map((movie) => ({...movie, id: String(movie.id)}));
};