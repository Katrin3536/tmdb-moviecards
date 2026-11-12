import type {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {isErrorWithDetailArray} from './isErrorWithDetailArray';
import {isErrorWithProperty} from './isErrorWithProperty';
import {trimToMaxLength} from './trimToMaxLength';

export const getTmdbErrorMessage = (data: unknown) => {
    if (
        typeof data === 'object'
        && data !== null
        && 'status_code' in data
        && data.status_code === 6
    ) {
        return 'We couldn’t find this movie. Check the movie link or ID and try again.';
    }

    if (isErrorWithProperty(data, 'status_message')) {
        return data?.status_message;
    }

    return 'Something went wrong while contacting TMDB. Please try again.';
};

export const handleErrors = (error: FetchBaseQueryError, showError: (message: string) => void) => {
    if (error) {
        switch (error.status) {
            case 'FETCH_ERROR':
                showError('Network error occurred. Please check your internet connection.');
                break

            case 'PARSING_ERROR':
            case 'CUSTOM_ERROR':
            case 'TIMEOUT_ERROR':
                showError(error.error)
                break

            case 401:
                if (isErrorWithProperty(error.data, 'status_message')) {
                    showError(error.data.status_message)
                } else if (isErrorWithProperty(error.data, 'message')) {
                    showError(error.data.message)
                } else {
                    showError('Unauthorized access. Please log in again.')
                }
                break

            case 400:
            case 403:
                if (isErrorWithDetailArray(error.data)) {
                    const errorMessage = error.data.errors[0].detail
                    if (errorMessage.includes("refreshToken")) return
                    showError(trimToMaxLength(errorMessage))
                } else if (isErrorWithProperty(error.data, 'status_message')) {
                    showError(getTmdbErrorMessage(error.data))
                } else {
                    showError(getTmdbErrorMessage(error.data))
                }
                break

            case 404:
                if (isErrorWithProperty(error.data, 'error')) {
                    showError(error.data.error)
                } else {
                    showError(getTmdbErrorMessage(error.data))
                }
                break

            case 429:
                if (isErrorWithProperty(error.data, 'message')) {
                    showError(error.data.message)
                } else {
                    showError(getTmdbErrorMessage(error.data))
                }
                break

            default:
                if (error.status >= 500 && error.status < 600) {
                    showError('Server error occurred. Please try again later.')
                } else {
                    showError('Some error occurred')
                }
        }
    }
}