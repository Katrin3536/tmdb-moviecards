import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import type {useSearchParams} from 'react-router';
import {fallbackPoster, imageBaseUrl} from '../../../../common/constants';
import {useSearchMoviesQuery} from '../../api/moviesApi';
import {MovieCard} from '../Card/MovieCard';
import {MovieGridSkeleton, Pagination} from '../../../../common/components';
import {SearchInput} from './SearchInput';


type SearchResultsProps = {
    searchQuery: string;
    setSearchParams: ReturnType<typeof useSearchParams>[1];
}

export const SearchResults = ({searchQuery, setSearchParams}: SearchResultsProps) => {
    const [inputValue, setInputValue] = useState(searchQuery);
    const [page, setPage] = useState(1);
    const {currentData, isLoading, isFetching, isError} = useSearchMoviesQuery(
        {query: searchQuery, page},
        {skip: !searchQuery},
    );

    const submitSearch = (query: string) => {
        if (query) setSearchParams({query});
        setPage(1);
    };

    const updateInput = (value: string) => {
        setInputValue(value);
        if (!value.trim()) {
            setSearchParams({}, {replace: true});
            setPage(1);
        }
    };

    return (
        <Container maxWidth="lg" sx={{py: 4, px: {xs: 2, sm: 3}}}>
            <Box component="section" aria-labelledby="search-results-title">
                <Typography
                    id="search-results-title"
                    component="h1"
                    sx={{mb: 2.5, fontSize: {xs: 28, sm: 32}, fontWeight: 700}}
                >
                    Search Results
                </Typography>
                <SearchInput
                    showBorder
                    value={inputValue}
                    onChange={updateInput}
                    onSubmit={submitSearch}
                />
                {!searchQuery && (
                    <Typography component="p" sx={{mt: 3, color: 'text.secondary', fontSize: 16, lineHeight: 1.6}}>
                        Enter a movie title to start searching
                    </Typography>
                )}
                {searchQuery && (isLoading || (isFetching && !currentData)) && (
                    <Box sx={{mt: 3}}><MovieGridSkeleton count={10}/></Box>
                )}
                {searchQuery && isError && (
                    <Typography role="alert" sx={{mt: 3}}>Could not search movies. Please try again.</Typography>
                )}
                {searchQuery && !isLoading && !isError && currentData?.results.length === 0 && (
                    <Typography sx={{mt: 3, color: 'text.secondary'}}>
                        No matches found for &quot;{searchQuery}&quot;
                    </Typography>
                )}
                {currentData && currentData.results.length > 0 && (
                    <>
                        <Box
                            sx={{
                                mt: 3,
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(2, minmax(0, 1fr))',
                                    sm: 'repeat(3, minmax(0, 1fr))',
                                    md: 'repeat(4, minmax(0, 1fr))',
                                    lg: 'repeat(5, minmax(0, 1fr))',
                                },
                                gap: {xs: 2, md: 2.5},
                                opacity: isFetching ? 0.6 : 1,
                            }}
                        >
                            {currentData.results.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    rating={movie.vote_average}
                                    poster={movie.poster_path
                                        ? `${imageBaseUrl}${movie.poster_path}`
                                        : fallbackPoster}
                                />
                            ))}
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                            <Pagination
                                count={Math.min(currentData.total_pages, 500)}
                                page={page}
                                onChange={setPage}
                                ariaLabel="Search result pages"
                            />
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};