import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

type Props = {
    count?: number;
}

export const MovieGridSkeleton = ({count = 10}: Props) => (
    <Box
        aria-label="Loading movies"
        role="status"
        sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: 'repeat(2, minmax(0, 1fr))',
                sm: 'repeat(3, minmax(0, 1fr))',
                md: 'repeat(4, minmax(0, 1fr))',
                lg: 'repeat(5, minmax(0, 1fr))',
            },
            gap: {xs: 2, md: 2.5},
        }}
    >
        {Array.from({length: count}, (_, index) => (
            <Box key={index}>
                <Skeleton variant="rounded" sx={{width: '100%', aspectRatio: '2 / 3'}} />
                <Skeleton variant="text" sx={{mt: 1, fontSize: 20}} />
                <Skeleton variant="text" sx={{width: '60%', fontSize: 16}} />
            </Box>
        ))}
    </Box>
);
