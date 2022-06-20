import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3001',

});

export const createSession = async (email, password) => {
    return api.post('/sessions', {email,password});
}

export const createUser = async (email, password, name, tel) =>{
    return api.post('/users', {email, password, name, tel})
}

export const getAllGraphs = async () => {
    return api.get('/graphs');
}

export const updateSubscription = async (user_id, subscriptionType, chosenChains) => {
   const res = await api.put(`/users/${user_id}/subscription`, {subscriptionType, chosenChains});
   return res.data;
}

export const getData = async(userId, query) => {
    let url = `/users/${userId}/graphs`
    if (query !== '') {
        url +=`?q=${query}`
    }// http://localhost:5000/users/ID/gaphs/?q=xxxx
    return api.get(url);
}