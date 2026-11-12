import {Pagination} from '../../../../common/components';
import {useState} from 'react';
import type {SyntheticEvent} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, {type SelectChangeEvent} from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import {MovieGridSkeleton} from '../../../../common/components';
import {fallbackPoster, genres, imageBaseUrl, sortOptions} from '../../../../common/constants';
import {type DiscoverSortBy, useDiscoverMoviesQuery} from '../../api/moviesApi';
import {MovieCard} from '../Card/MovieCard';


export const FilteredMovies = () => {
    const [sortBy, setSortBy] = useState<DiscoverSortBy>('popularity.desc');
    const [ratingRange, setRatingRange] = useState<number[]>([0, 10]);
    const [appliedRatingRange, setAppliedRatingRange] = useState<number[]>([0, 10]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const {currentData: data, isLoading, isFetching, isError} = useDiscoverMoviesQuery({
        page,
        sortBy,
        voteAverageGte: appliedRatingRange[0],
        voteAverageLte: appliedRatingRange[1],
        genreIds: selectedGenres,
    });

    const handleSortChange = (event: SelectChangeEvent<DiscoverSortBy>) => {
        setSortBy(event.target.value as DiscoverSortBy);
        setPage(1);
    };

    const handleRatingChange = (_event: Event, value: number | number[]) => {
        if (Array.isArray(value)) setRatingRange(value);
    };

    const handleRatingChangeCommitted = (_event: Event | SyntheticEvent, value: number | number[]) => {
        if (Array.isArray(value)) {
            setRatingRange(value);
            setAppliedRatingRange(value);
            setPage(1);
        }
    };

    const toggleGenre = (genreId: number) => {
        setSelectedGenres((current) => current.includes(genreId)
            ? current.filter((id) => id !== genreId)
            : [...current, genreId]);
        setPage(1);
    };

    const resetFilters = () => {
        setSortBy('popularity.desc');
        setRatingRange([0, 10]);
        setAppliedRatingRange([0, 10]);
        setSelectedGenres([]);
        setPage(1);
    };

    return (
        <Container maxWidth="lg" sx={{py: {xs: 3, md: 3.5}, px: {xs: 2, sm: 3}}}>
            <Box
                component="main"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', md: '250px minmax(0, 1fr)'},
                    alignItems: 'start',
                    gap: {xs: 3, md: 3},
                }}
            >
                <Paper
                    component="aside"
                    elevation={0}
                    aria-labelledby="filters-title"
                    sx={{p: {xs: 2.5, sm: 3}, borderRadius: 2, bgcolor: 'action.hover'}}
                >
                    <Typography id="filters-title" component="h1" sx={{mb: 3, fontSize: 20, fontWeight: 600}}>
                        Filters / Sort
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 3}}>
                        <Typography sx={{fontSize: 14}}>Sort by</Typography>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="sort-by-label">Sort</InputLabel>
                            <Select
                                labelId="sort-by-label"
                                value={sortBy}
                                label="Sort"
                                onChange={handleSortChange}
                            >
                                {sortOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{mb: 3.5, px: 1}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 0.5}}>
                            <Typography sx={{fontSize: 14}}>Rating</Typography>
                            <Typography sx={{fontSize: 14}}>
                                {ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)}
                            </Typography>
                        </Box>
                        <Slider
                            value={ratingRange}
                            onChange={handleRatingChange}
                            onChangeCommitted={handleRatingChangeCommitted}
                            valueLabelDisplay="auto"
                            min={0}
                            max={10}
                            step={0.1}
                            aria-label="Movie rating range"
                        />
                    </Box>
                    <Typography sx={{mb: 1, fontSize: 14}}>Genres</Typography>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3.5}}>
                        {genres.map((genre) => {
                            const selected = selectedGenres.includes(genre.id);
                            return (
                                <Chip
                                    key={genre.id}
                                    label={genre.name}
                                    clickable
                                    color={selected ? 'primary' : 'default'}
                                    variant={selected ? 'filled' : 'outlined'}
                                    onClick={() => toggleGenre(genre.id)}
                                    aria-pressed={selected}
                                />
                            );
                        })}
                    </Box>
                    <Button variant="contained" onClick={resetFilters} sx={{borderRadius: 999, textTransform: 'none'}}>
                        Reset filters
                    </Button>
                </Paper>
                <Box component="section" aria-label="Filtered movie results">
                    {(isLoading || (isFetching && !data)) && <MovieGridSkeleton count={10} />}
                    {isError && <Typography role="alert">Could not load movies. Please try again.</Typography>}
                    {!isLoading && !isError && data?.results.length === 0 && (
                        <Typography color="text.secondary">No movies match the selected filters.</Typography>
                    )}
                    {data && (
                        <>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(2, minmax(0, 1fr))',
                                        sm: 'repeat(3, minmax(0, 1fr))',
                                        lg: 'repeat(5, minmax(0, 1fr))',
                                    },
                                    alignItems: 'start',
                                    gap: {xs: 2, md: 2.5},
                                    opacity: isFetching ? 0.6 : 1,
                                }}
                            >
                                {data.results.map((movie) => (
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
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                                <Pagination
                                    count={Math.min(data.total_pages, 500)}
                                    page={page}
                                    onChange={setPage}
                                    ariaLabel="Filtered movie pages"
                                />
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
};
