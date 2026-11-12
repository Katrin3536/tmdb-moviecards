export const formatRuntime = (runtime: number | null) => {
    if (runtime === null) return 'Runtime unavailable';

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};