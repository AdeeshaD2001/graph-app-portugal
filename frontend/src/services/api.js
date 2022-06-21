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

export const updateVisitorId = async (user_id, visitorId) => {
    const res = await api.put(`/users/${user_id}/visitors`, {visitorId});
    return res.data;
}

export const getData = async(user_id, query='') => {
    let url = `/users/${user_id}/graphs`
    if (query !== '') {
        url +=`?name=${query}`
    }// http://localhost:3001/users/:id/graphs/?name=xxxx
    return api.get(url);
}