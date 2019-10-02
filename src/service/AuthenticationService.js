import axios from "axios";
import API from '../utils/API';

export const USERNAME_ATTRIBUTE_NAME= 'authenticatedUser'


class AuthenticationService {

    executeAuthenticationService(username, password) {
        return API.post("auth/login", { username, password });
    }

    registerSuccessfulLogin(username, token) {
        localStorage.setItem(USERNAME_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(USERNAME_ATTRIBUTE_NAME);
        return user !== null;

    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService();