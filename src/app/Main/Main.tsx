import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
} from '../../features/movies/api/moviesApi';
import {MainMoviesList} from '../../features/movies/ui/MainMovieList/MainMoviesList';
import {WelcomeSection} from '../../features/movies/ui/WelcomeSection/WelcomeSection';

export const Main = () => {
    const {data: popularMovies, isFetching: isPopularLoading} = useGetPopularMoviesQuery();
    const {data: topRatedMovies, isFetching: isTopRatedLoading} = useGetTopRatedMoviesQuery();
    const {data: upcomingMovies, isFetching: isUpcomingLoading} = useGetUpcomingMoviesQuery();
    const {data: nowPlayingMovies, isFetching: isNowPlayingLoading} = useGetNowPlayingMoviesQuery();

    const movieLists = [
        {title: 'Popular Movies', movies: popularMovies?.results, isLoading: isPopularLoading},
        {title: 'Top Rated Movies', movies: topRatedMovies?.results, isLoading: isTopRatedLoading},
        {title: 'Upcoming Movies', movies: upcomingMovies?.results, isLoading: isUpcomingLoading},
        {title: 'Now Playing Movies', movies: nowPlayingMovies?.results, isLoading: isNowPlayingLoading},
    ];

    return (
        <div>
            <WelcomeSection movies={popularMovies?.results}/>
            <div>
                {movieLists.map(({title, movies, isLoading}) => (
                    <MainMoviesList
                        key={title}
                        title={title}
                        movies={movies?.slice(0, 6)}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
};
