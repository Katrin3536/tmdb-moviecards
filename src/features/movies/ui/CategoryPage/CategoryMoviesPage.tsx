import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import {Link} from 'react-router';
import {selectThemeMode} from '../../../../app/app-slice';
import {MovieGridSkeleton} from '../../../../common/components';
import { useAppSelector } from '../../../../common/hooks';
import {type MovieCategory, useGetMoviesByCategoryQuery} from '../../api/moviesApi';
import type {Category} from './CategoryMovies.types';
import {MoviesList} from './MoviesList';

type CategoryMoviesPageProps = {
    category: {slug: MovieCategory; title: string};
    categories: Category[]
}

export const CategoryMoviesPage = ({category, categories}: CategoryMoviesPageProps) => {
    const themeMode = useAppSelector(selectThemeMode);
    const headerBackground = themeMode === 'light' ? '#f4effa' : '#251d33';
    const [page, setPage] = useState(1);
    const {currentData: data, isLoading, isFetching, isError} = useGetMoviesByCategoryQuery({
        category: category.slug,
        page,
    });

    return (
        <Container maxWidth="lg" sx={{py: {xs: 3, md: 4}, px: {xs: 2, sm: 3}}}>
            <Box
                component="nav"
                aria-label="Movie categories"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    mb: 3.5,
                }}
            >
                {categories.map(({slug, title}) => {
                    const selected = slug === category.slug;
                    return (
                        <Button
                            key={slug}
                            component={Link}
                            to={`/movies/${slug}`}
                            variant="outlined"
                            aria-pressed={selected}
                            aria-current={selected ? 'page' : undefined}
                            sx={{
                                px: 2,
                                py: 0.75,
                                borderColor: 'divider',
                                borderRadius: 999,
                                bgcolor: selected ? headerBackground : 'background.paper',
                                color: 'text.primary',
                                fontSize: 16,
                                textTransform: 'none',
                                fontWeight: 500,
                                lineHeight: 1.5,
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    borderColor: 'text.disabled',
                                    bgcolor: selected ? headerBackground : 'action.hover',
                                },
                            }}
                        >
                            {title}
                        </Button>
                    );
                })}
            </Box>
            {(isLoading || (isFetching && !data)) && <MovieGridSkeleton count={10} />}
            {isError && <Typography role="alert">Could not load movies for this category.</Typography>}
            {data && (
                <MoviesList
                    activeCategory={category.title}
                    movies={data.results}
                    page={page}
                    pageCount={data.total_pages}
                    setPage={setPage}
                />
            )}
        </Container>
    );
};