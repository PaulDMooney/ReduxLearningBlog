import axios, { AxiosPromise, AxiosResponse } from 'axios'
import { BlogPost } from "../model/blog_post";

export const FETCH_POSTS = "fetch_posts";
export const CREATE_POST = "create_post";
export const FETCH_POST = "fetch_post";
export const DELETE_POST = "delete_post";

const ROOT_URL = "http://reduxblog.herokuapp.com/api"
const API_KEY = "?key=jkgdfgasdfre"

export interface Action<PayloadType> {

    type:string
    payload:PayloadType
}

export type fetchPostsType = () => Action<AxiosPromise>

export function fetchPosts():Action<AxiosPromise> {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)
    console.log("Fetch Posts")
    return {
        type: FETCH_POSTS,
        payload: request
    }
} 

export function createPost(post:BlogPost, cb:() => void):Action<Promise<any>> {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,post)
        .then(() => cb());

    return {
        type: CREATE_POST,
        payload: request
    }
}

export type fetchPostType = (id:string)=>Action<any>;

export function fetchPost(id:string):Action<Promise<any>> {

    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)

    return {
        type: FETCH_POST,
        payload: request
    }
}

export type deletePostType = (id:string, cb:() => void)=>Action<any>;

export function deletePost(id:string, cb: ()=> void) :Action<string> {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(() => cb())

    return {
        type: DELETE_POST,
        payload: id
    }
}