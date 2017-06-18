import { FETCH_POSTS, Action, FETCH_POST, DELETE_POST } from '../actions'
import {BlogPost} from '../model/blog_post'
import { AxiosResponse } from "axios";
import * as _ from 'lodash';

export interface PostIndexType {
    [id:string]: BlogPost
}

export default function(state:PostIndexType = {}, action:Action<AxiosResponse | string>):PostIndexType {

    switch(action.type) {

        case FETCH_POST:
            const newPost:BlogPost = (<AxiosResponse> action.payload).data;
            // const newState =  {...state }
            // newState[newPost.id] = newPost
            // return newState;

            return { ...state, [newPost.id]:newPost }
        case FETCH_POSTS:
            return _.mapKeys((<AxiosResponse> action.payload).data, 'id') as PostIndexType
        case DELETE_POST:
            return (<PostIndexType> _.omit(state, (<string> action.payload)))
        default: 
            return state;
    }
}