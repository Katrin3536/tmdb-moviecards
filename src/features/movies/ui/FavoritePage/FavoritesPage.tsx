import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {selectFavorites} from '../../../../app/app-slice';
import {useAppSelector} from '../../../../common/hooks';
import {MovieCard} from '../Card/MovieCard';

export const FavoritesPage = () => {
    const favorites = useAppSelector(selectFavorites);

    return (
        <Container maxWidth="lg" sx={{py: 4, px: {xs: 2, sm: 3}}}>
            <Typography component="h1" sx={{mb: 4, fontSize: {xs: 28, sm: 36}, fontWeight: 700}}>
                Favorites
            </Typography>

            {favorites.length > 0 ? (
                <>
                    <Typography component="h2" sx={{mb: 2.5, fontSize: {xs: 22, sm: 26}, fontWeight: 500}}>
                        Favorite Movies
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(2, minmax(0, 1fr))',
                                sm: 'repeat(3, minmax(0, 1fr))',
                                md: 'repeat(4, minmax(0, 1fr))',
                                lg: 'repeat(5, minmax(0, 1fr))',
                            },
                            gap: {xs: 2, md: 3},
                        }}
                    >
                        {favorites.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                rating={movie.rating}
                                poster={movie.poster}
                            />
                        ))}
                    </Box></>
            ) : (
                <Typography color="text.secondary">
                    You haven&apos;t added any favorite movies yet.
                </Typography>
            )}
        </Container>
    );
};