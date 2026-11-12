import type {ThemeMode} from '../theme/theme';

const themeStorageKey = 'themeMode';

export const getInitialThemeMode = (): ThemeMode => {
    if (typeof window === 'undefined') {
        return 'light';
    }

    return window.localStorage.getItem(themeStorageKey) === 'dark' ? 'dark' : 'light';
};