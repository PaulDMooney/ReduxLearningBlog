import * as React from 'react'
import { RouteComponentProps, Link } from "react-router-dom";
import { fetchPostType, fetchPost, deletePostType, deletePost } from "../actions";
import { connect } from "react-redux";
import { PostIndex } from "../reducers/post_reducer";
import { BlogPost } from "../model/blog_post";

interface PostsShowProps extends RouteComponentProps<any> {
    fetchPost:fetchPostType
    post:BlogPost
    deletePost:deletePostType
}

class PostsShow extends React.Component<PostsShowProps, any>{
    
    constructor() {
        super();
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id)

    }


    onDeleteClick() {

        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/')
        });

    }
    
    render() {
        const {post} = this.props

        if (!post) {
            return <div>loading...</div>
        }

        return (
            <div>
                <Link to="/" >Back to Index</Link>
                <button 
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick}>
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>categories: {post.categories}</h6>
                <div>{post.content}</div>
            </div>
        );
    }    
}

function mapStateToProps(state:any, ownProps:PostsShowProps) {
    return {post: state.posts[ownProps.match.params["id"]]}
}


export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);