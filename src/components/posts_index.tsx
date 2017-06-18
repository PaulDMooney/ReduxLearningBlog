import * as React from 'react'
import { RouteComponentProps, Link } from "react-router-dom";
import * as _ from 'lodash';
import {PostIndexType} from '../reducers/post_reducer'

export interface PostsIndexProps {
    posts: PostIndexType
}

export default class PostsIndex extends React.Component<PostsIndexProps, any> {

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                    {post.title}
                    </Link>
                </li>
            )
        })
    }

    render() {
        console.log("Posts Index Render", this.props.posts)
        return(
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                    
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

