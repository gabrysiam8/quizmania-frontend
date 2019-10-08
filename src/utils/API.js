import axios from "axios";

const fetchClient = () => {
    const defaultOptions = {
        baseURL: "http://localhost:8090/api/"
    };

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        config.headers.Authorization =  token ? token : '';
        return config;
    });

    return instance;
};

export default fetchClient();