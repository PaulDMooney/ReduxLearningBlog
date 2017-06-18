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

export type fetchPostsType = () => any

export function fetchPosts():any {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)
    
    // Thunk style. The action payload is resolved here.
    return (dispatch:any) => {
        request.then(
            response => {
                console.log("Dispatch", response)
                dispatch({
                    type: FETCH_POSTS,
                    payload: response.data
                })
            }
            ,error => {
                console.error("Error", error)
            }
        );
    }
} 

export function createPost(post:BlogPost, cb:() => void):any {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,post)
    
    return (dispatch:any) => {
        request.then(
            response => { 
                cb()
                console.log("Create Post Response", response)
                return {
                    type: CREATE_POST,
                    payload: response.data
                }
            }
        )
    }
    
}

export type fetchPostType = (id:string)=>Action<any>;

export function fetchPost(id:string):Action<Promise<any>> {

    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)

    // Redux Promise style. The payload is a promise, which is resolved by the time it
    // gets to the reducer, however the reducer still has to know the shape of the Ajax response
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