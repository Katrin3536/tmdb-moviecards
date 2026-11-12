import {useParams} from 'react-router';
import {PageNotFound} from '../../../../common/components/PageNotFound/PageNotFound';
import type {Category} from './CategoryMovies.types';
import {CategoryMoviesPage} from './CategoryMoviesPage';

const categories: Category[] = [
    {slug: 'popular', title: 'Popular Movies'},
    {slug: 'top-rated', title: 'Top Rated Movies'},
    {slug: 'upcoming', title: 'Upcoming Movies'},
    {slug: 'now-playing', title: 'Now Playing Movies'},
];

export const CategoryMovies = () => {
    const {category: categorySlug} = useParams();
    const category = categories.find(({slug}) => slug === categorySlug);

    if (!category) {
        return <PageNotFound />;
    }

    return <CategoryMoviesPage key={category.slug} category={category} categories={categories} />;
};


