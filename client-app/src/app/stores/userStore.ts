import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
//import { router } from "../router/Routes";
import { store } from "./stores";
import { history } from "../../main";



export default class UserStore {
    user: User | null = null;

    

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
           // router.navigate('/activities');
           history.push('/activities');
           store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
           // router.navigate('/activities');
           history.push('/activities')
           store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }


    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        //router.navigate('/');
        history.push('/')
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}