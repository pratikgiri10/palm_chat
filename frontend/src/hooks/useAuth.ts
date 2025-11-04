export const useAuth = () => {
    const token = localStorage.getItem('accessToken');
    return !!token
}