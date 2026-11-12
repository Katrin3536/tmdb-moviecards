import {useSearchParams} from 'react-router';
import {SearchResults} from './SearchResults';

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('query')?.trim() ?? '';

    return (
        <SearchResults
            key={searchQuery}
            searchQuery={searchQuery}
            setSearchParams={setSearchParams}
        />
    );
};


