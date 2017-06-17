import { FETCH_POSTS, Action, FETCH_POST, DELETE_POST } from '../actions'
import {BlogPost} from '../model/blog_post'
import { AxiosResponse } from "axios";
import * as _ from 'lodash';

export interface PostIndex {
    [id:string]: BlogPost
}

export default function(state:PostIndex = {}, action:Action<AxiosResponse | string>):PostIndex {

    switch(action.type) {

        case FETCH_POST:
            const newPost:BlogPost = (<AxiosResponse> action.payload).data;
            // const newState =  {...state }
            // newState[newPost.id] = newPost
            // return newState;

            return { ...state, [newPost.id]:newPost }
        case FETCH_POSTS:
            return _.mapKeys((<AxiosResponse> action.payload).data, 'id') as PostIndex
        case DELETE_POST:
            return (<PostIndex> _.omit(state, (<string> action.payload)))
        default: 
            return state;
    }
}