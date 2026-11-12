import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router';
import { toggleFavoriteAC, selectFavorites} from '../../../../app/app-slice';
import {fallbackPoster} from '../../../../common/constants';
import {useAppDispatch, useAppSelector} from '../../../../common/hooks';
import {favoritesStorageKey} from '../../../../common/utils/get-initial-favorites';

type Props = {
    id: string | number
    title: string
    rating: number
    poster: string
}

export const MovieCard = ({id, title, rating, poster}: Props) => {
    const movieId = String(id);
    const isFallbackPoster = poster === fallbackPoster;
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(selectFavorites);
    const isFavorite = favorites.some((movie) => movie.id === movieId);

    const toggleFavorite = () => {
        const nextFavorites = isFavorite
            ? favorites.filter((movie) => movie.id !== movieId)
            : [...favorites, {id: movieId, title, rating, poster}];
        dispatch(toggleFavoriteAC({id: movieId, title, rating, poster}));
        window.localStorage.setItem(favoritesStorageKey, JSON.stringify(nextFavorites));
    };

    return (
        <Card
            component="article"
            elevation={0}
            sx={{
                width: '100%',
                overflow: 'visible',
                bgcolor: 'transparent',
                '&:hover .MuiCardMedia-root, &:focus-within .MuiCardMedia-root': {
                    transform: 'scale(1.05)',
                },
                '&:hover .MuiIconButton-root, &:focus-within .MuiIconButton-root': {
                    opacity: 1,
                    pointerEvents: 'auto',
                },
                '@media (prefers-reduced-motion: reduce)': {
                    '& .MuiCardMedia-root': {transition: 'none'},
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: isFallbackPoster ? 0 : 2.5,
                    bgcolor: isFallbackPoster ? '#e3e5e9' : 'transparent',
                }}
            >
                <CardActionArea
                    component={Link}
                    to={`/movie/${encodeURIComponent(movieId)}`}
                    aria-label={`View ${title} details`}
                >
                    <CardMedia
                        component="img"
                        image={poster}
                        alt={title}
                        sx={{
                            display: 'block',
                            width: '100%',
                            aspectRatio: '2 / 3',
                            borderRadius: isFallbackPoster ? 0 : 2.5,
                            objectFit: 'cover',
                            transition: 'transform 180ms ease',
                        }}
                    />
                </CardActionArea>
                <IconButton
                    aria-label={`${isFavorite ? 'Remove' : 'Add'} ${title} ${isFavorite ? 'from' : 'to'} favorites`}
                    aria-pressed={isFavorite}
                    onClick={toggleFavorite}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 1,
                        width: 35,
                        height: 35,
                        opacity: isFavorite ? 1 : 0,
                        pointerEvents: isFavorite ? 'auto' : 'none',
                        transition: 'opacity 180ms ease',
                        bgcolor: 'background.paper',
                        color: isFavorite ? '#fac104' : 'text.secondary',
                        boxShadow: 1,
                        '& .MuiSvgIcon-root': {fontSize: 20},
                        '&:hover': {bgcolor: 'grey.100'},
                    }}
                >
                    <FavoriteIcon />
                </IconButton>
                <Box
                    component="span"
                    sx={{
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                        width: 35,
                        height: 35,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        bgcolor: rating <= 5 ? '#e53935' : rating >= 7 ? '#08a94f' : '#ffc400',
                        color: rating <= 5 || rating >= 7 ? '#fff' : '#171717',
                        fontSize: 12,
                        fontWeight: 700,
                    }}
                >
                    {rating.toFixed(1)}
                </Box>
            </Box>
            <CardActionArea
                component={Link}
                to={`/movie/${encodeURIComponent(movieId)}`}
                aria-label={`View ${title} details`}
                sx={{mt: 1.5, borderRadius: 1}}
            >
                <Typography
                    component="h3"
                    sx={{
                        color: 'text.primary',
                        fontSize: 20,
                        fontWeight: 500,
                        lineHeight: 1.4,
                    }}
                >
                    {title}
                </Typography>
            </CardActionArea>
        </Card>
    );
};
