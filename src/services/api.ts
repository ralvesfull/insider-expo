import axios from "axios";

export const key = "24b2b942211e48f5a72d534f65adf98a";

const api = axios.create({
    baseURL:"https://api.themoviedb.org/3"
});

export default api;