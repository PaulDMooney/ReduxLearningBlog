import * as React from 'react'
import { Field, reduxForm, WrappedFieldProps, FormErrors } from 'redux-form'
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { createPost } from '../actions';
import { BlogPost } from "../model/blog_post";

interface PostsNewProps extends RouteComponentProps<any> {
    createPost:any;
    handleSubmit:any;
}

interface FieldProps extends WrappedFieldProps<any> {
      label:string
}

class PostsNew extends React.Component<PostsNewProps,any> {
    

    renderField(field:FieldProps) {
        
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`
        return (
            <div className={className}>
                <label htmlFor={field.input.name}>{field.label}</label>
                <input className="form-control"
                    type="text" {...field.input} />
                <div className="text-help"> {touched? error:''}</div>
            </div>
        );
    }
    
    onSubmit(values:BlogPost) {
        
        this.props.createPost(values, () => {
            this.props.history.push('/')
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="title"
                    label="Title"
                    component={this.renderField}/>
                <Field name="categories"
                    label="Categories"
                    component={this.renderField}/>
                <Field name="content"
                    label="Post Content"
                    component={this.renderField}/>
                <button type="Submit" className="btn btn-primary">Save</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}


function validate(values: BlogPost /*FormData*/):FormErrors<BlogPost> {
    const errors:FormErrors<BlogPost> = {};

    //validate fields
    if (!values.title) {
        errors.title= "Enter a Title!"
    }

    if (!values.categories) {
        errors.categories= "Enter a Category!"
    }

    if (!values.content) {
        errors.content= "Enter Content!"
    }

    //If errors is empty the form is valid
    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null,{createPost})(PostsNew)
);