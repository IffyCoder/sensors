import Axios from "axios";

const axios = Axios.create();
const baseUrl = 'http://192.168.1.15:5000'

export function get(url: string): any {
    return axios.get(`${baseUrl}${url}`, {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function post(url: string, requestData: any) {
    return axios.post(`${baseUrl}${url}`, requestData);
}