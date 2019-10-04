import axios from "axios";
import API from "../utils/API";

export const USERNAME_ATTRIBUTE_NAME= 'authenticatedUser';

class AuthService {

    executeAuthenticationService(username, password) {
        return API.post("auth/login", { username, password });
    }

    registerSuccessfulLogin(username, token) {
        localStorage.setItem(USERNAME_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    createJWTToken(token) {
        return 'Bearer ' + token;
    }

    isAuthenticated() {
        let user = localStorage.getItem(USERNAME_ATTRIBUTE_NAME);
        return user !== null;
    }

    logout() {
        localStorage.clear();
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isAuthenticated()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }
}

export default new AuthService();