import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type {ChangeEvent} from 'react';

type Props = {
    showBorder?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
}

export const SearchInput = ({showBorder = false, value, onChange, onSubmit}: Props) => {
    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(value?.trim() ?? '');
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.8,
                width: '100%',
                maxWidth: 630,
            }}
        >
            <TextField
                type="search"
                placeholder="Search for a movie"
                value={value}
                onChange={onChange ? (event) => onChange(event.target.value) : undefined}
                slotProps={{htmlInput: {'aria-label': 'Search for a movie'}}}
                sx={{
                    flex: 1,
                    minWidth: 0,
                    '& .MuiOutlinedInput-root': {
                        height: 40.5,
                        borderRadius: 999,
                        bgcolor: '#fff',
                        '& fieldset': {
                            border: showBorder ? '1px solid' : 'none',
                            borderColor: 'divider',
                        },
                    },
                    '& .MuiOutlinedInput-input': {
                        px: 2.25,
                        py: 0,
                        color: '#333',
                        fontSize: 14.4,
                    },
                }}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{
                    minWidth: 93.6,
                    height: 40.5,
                    px: 2.25,
                    borderRadius: 999,
                    bgcolor: '#2f5fc4',
                    color: '#cbd5e8',
                    fontSize: 14.4,
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                        bgcolor: '#264fa8',
                        boxShadow: 'none',
                    },
                }}
            >
                Search
            </Button>
        </Box>
    );
};