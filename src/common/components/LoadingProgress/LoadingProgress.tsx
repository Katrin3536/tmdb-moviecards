import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {useAppSelector} from '../../hooks';

export const LoadingProgress = () => {
    const isFetching = useAppSelector((state) => (
        Object.values(state.baseApi.queries).some((query) => query?.status === 'pending')
    ));

    if (!isFetching) return null;

    return (
        <Box sx={{position: 'relative', height: 0, zIndex: (theme) => theme.zIndex.appBar + 1}}>
            <LinearProgress
                aria-label="Loading movies"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    height: 4,
                }}
            />
        </Box>
    );
};
