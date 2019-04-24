import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';
import './MakePost.css'
import ReactDOM from 'react-dom';

class MakePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.userid,
            text: "",
            photo: ""
        }
    };

    textInputHandler = event => {
        this.setState({ text: event.target.value });
    }

    postSubmitHandler = () => {

    }

    render() {
        console.log(this.state.text);
        return (
            <div>
                <h1>Make a Post</h1>
                <textarea className="post" type="text" onChange={this.textInputHandler} />
                <div>
                    <button onSubmit={this.postSubmitHandler}>Submit</button>
                </div>
            </div>

        );
    }
}

export default MakePost;