import {Route, Routes} from 'react-router';
import {Main} from '../../../app/Main/Main';
import {FavoritesPage} from '../../../features/movies/ui/FavoritePage/FavoritesPage';
import {FilteredMovies} from '../../../features/movies/ui/FilteredPage/FilteredMovies';
import {MovieDescription} from '../../../features/movies/ui/DescriptionPage/MovieDescription';
import {CategoryMovies} from '../../../features/movies/ui/CategoryPage/CategoryMovies';
import {SearchPage} from '../../../features/movies/ui/SearchPage/SearchPage';
import {PageNotFound} from '../PageNotFound/PageNotFound';

const Path = {
    Main: '/',
    Movie: '/movie/:id',
    Movies: '/movies/:category',
    FilteredMovies: '/filtered-movies',
    Search: '/search',
    Favorites: '/favorites',
    NotFound: '*',
} as const;

export const Routing = () => {

    return (
        <Routes>
            <Route path={Path.Main} element={<Main/>}/>
            <Route path={Path.Movie} element={<MovieDescription/>}/>
            <Route path={Path.Movies} element={<CategoryMovies/>}/>
            <Route path={Path.FilteredMovies} element={<FilteredMovies/>}/>
            <Route path={Path.Search} element={<SearchPage/>}/>
            <Route path={Path.Favorites} element={<FavoritesPage/>}/>
            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    );
};
