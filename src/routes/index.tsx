import * as React from 'react'
import {Route} from 'react-router-dom'
import {onPostsIndexEnter} from './route_callbacks'
import { connect } from 'react-redux'
import  PostsIndex  from '../components/posts_index'
import {PostIndexType} from '../reducers/post_reducer'


class PostListingRoute extends Route {

    componentDidMount() {
        onPostsIndexEnter();
    }

    render() {

        const posts:PostIndexType = (this.props as any).posts
        return <PostsIndex posts={posts} />
        
    }

}

function mapStateToProps(state:any) {
    console.log("PostListingRoute MapStateToProps", state)
    return { posts: state.posts }
}

export default connect(mapStateToProps)(PostListingRoute)