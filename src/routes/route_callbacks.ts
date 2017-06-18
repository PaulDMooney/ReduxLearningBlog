import {fetchPosts, fetchPostsType} from '../actions'
import store from '../store'

export function onPostsIndexEnter() {
    store.dispatch(fetchPosts());
}