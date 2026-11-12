import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

export const MovieDescriptionSkeleton = () => (
    <Container maxWidth="lg" sx={{py: {xs: 3, md: 3.5}, px: {xs: 2, sm: 3}}} aria-label="Loading movie details" role="status">
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr', md: 'minmax(240px, 315px) minmax(0, 1fr)'},
                gap: {xs: 3, md: 4.5},
            }}
        >
            <Skeleton variant="rounded" sx={{width: '100%', maxWidth: {xs: 280, md: 'none'}, aspectRatio: '2 / 3'}} />
            <Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2, mb: 3}}>
                    <Skeleton variant="text" sx={{width: '60%', fontSize: 48}} />
                    <Skeleton variant="rounded" width={90} height={40} />
                </Box>
                <Skeleton variant="text" sx={{width: '70%', fontSize: 24, mb: 2}} />
                <Skeleton variant="text" sx={{fontSize: 20}} />
                <Skeleton variant="text" sx={{fontSize: 20}} />
                <Skeleton variant="text" sx={{width: '80%', fontSize: 20, mb: 3}} />
                <Skeleton variant="text" sx={{width: 100, fontSize: 24, mb: 1}} />
                <Box sx={{display: 'flex', gap: 1}}>
                    <Skeleton variant="rounded" width={90} height={32} />
                    <Skeleton variant="rounded" width={90} height={32} />
                    <Skeleton variant="rounded" width={90} height={32} />
                </Box>
            </Box>
        </Box>
        <Skeleton variant="text" sx={{width: 130, fontSize: 30, mt: 5, mb: 2}} />
        <Box sx={{display: 'grid', gridTemplateColumns: {xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)'}, gap: 3}}>
            {Array.from({length: 6}, (_, index) => (
                <Box key={index} sx={{textAlign: 'center'}}>
                    <Skeleton variant="circular" sx={{width: {xs: 112, sm: 140}, aspectRatio: '1 / 1', mx: 'auto', mb: 1}} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" sx={{width: '70%', mx: 'auto'}} />
                </Box>
            ))}
        </Box>
        <Skeleton variant="text" sx={{width: 220, fontSize: 30, mt: 5, mb: 2}} />
        <Box sx={{display: 'grid', gridTemplateColumns: {xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)'}, gap: 3}}>
            {Array.from({length: 6}, (_, index) => (
                <Box key={index}>
                    <Skeleton variant="rounded" sx={{width: '100%', aspectRatio: '2 / 3'}} />
                    <Skeleton variant="text" sx={{mt: 1, fontSize: 20}} />
                </Box>
            ))}
        </Box>
    </Container>
);
