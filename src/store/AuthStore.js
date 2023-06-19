import {action, makeAutoObservable, makeObservable, observable} from 'mobx';
import api from "../service/Configuration";

class AuthStore {
    isAuthenticated = false;
    token = null;

    constructor() {
        makeObservable(this, {
            isAuthenticated: observable,
            token: observable,
            login: action,
            logout: action
        });
        this.isAuthenticated = localStorage.getItem('token') !== null;
    }


    async login(username, password) {
        try {
            const response = await api.post('/login', { login: username, senha: password });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            this.isAuthenticated = true;
            this.token = response.data.token;
            return this.isAuthenticated;
        } catch (error) {
            console.log(error);
            return false; // Retorna falso em caso de erro
        }
    }


    logout() {
        localStorage.removeItem('token');
        this.isAuthenticated = false;
        this.token = null;
    }


    get getToken() {
        return this.token || localStorage.getItem('token');
    }
}

const store = new AuthStore();

export default store;
