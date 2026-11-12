import {createSlice} from '@reduxjs/toolkit';
import type {ThemeMode} from '../common/theme/theme';
import {getInitialFavorites, getInitialThemeMode} from '../common/utils';

export type FavoriteMovie = {
    id: string
    title: string
    rating: number
    poster: string
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: getInitialThemeMode(),
        favorites: getInitialFavorites(),
        errorMessage: null as string | null,
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectFavorites: (state) => state.favorites,
        selectErrorMessage: (state) => state.errorMessage,

    },
     reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        toggleFavoriteAC: create.reducer<FavoriteMovie>((state, action) => {
            const existingIndex = state.favorites.findIndex((movie) => movie.id === action.payload.id);
            if (existingIndex >= 0) {
                state.favorites.splice(existingIndex, 1);
            } else {
                state.favorites.push(action.payload);
            }
        }),
        showErrorAC: create.reducer<string>((state, action) => {
            state.errorMessage = action.payload;
        }),
        clearErrorAC: create.reducer((state) => {
            state.errorMessage = null;
        }),
    }),
})

export const {changeThemeModeAC, toggleFavoriteAC, showErrorAC, clearErrorAC} = appSlice.actions
export const {selectThemeMode, selectFavorites, selectErrorMessage} = appSlice.selectors
export const appReducer = appSlice.reducer


