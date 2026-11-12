import MuiPagination from '@mui/material/Pagination';

type Props = {
    count: number
    page: number
    onChange: (page: number) => void
    ariaLabel?: string
}

export const Pagination = ({count, page, onChange, ariaLabel = 'Movie pages'}: Props) => {
    if (count < 2) return null;

    return (
        <MuiPagination
            count={count}
            page={page}
            onChange={(_event, selectedPage) => onChange(selectedPage)}
            color="primary"
            aria-label={ariaLabel}
        />
    );
};
