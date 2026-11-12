import Alert from '@mui/material/Alert';
import Snackbar, {type SnackbarCloseReason} from '@mui/material/Snackbar';
import type {SyntheticEvent} from 'react';
import {clearErrorAC, selectErrorMessage} from '../../../app/app-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch();
    const message = useAppSelector(selectErrorMessage);

    const closeSnackbar = (_event: Event | SyntheticEvent | null, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') return;
        dispatch(clearErrorAC());
    };

    return (
        <Snackbar
            open={message !== null}
            autoHideDuration={6000}
            onClose={closeSnackbar}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={() => dispatch(clearErrorAC())} severity="error" variant="filled" sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
};
