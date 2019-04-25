import React, { Component } from 'react';

import './MakePost.css'
import ReactDOM from 'react-dom';

class MakePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: this.props.userid,
            text: "",
            photo: null,
            likes: 0,
            timestamp: null
        }
    };

    textInputHandler = event => {
        this.setState({ text: event.target.value });
    }

    fileUploadHandler = event => {
        this.setState({ photo: event.target.files[0] })
    }

    postSubmitHandler = () => {

    }

    render() {
        console.log(this.state.photo);
        console.log(this.state.text);
        return (
            <div>
                <h1>Make a Post</h1>
                <textarea className="post" type="text" onChange={this.textInputHandler} />
                <div>
                    <input type="file" accept="image/*" onChange={this.fileUploadHandler} />

                </div>
                <div>
                    <button onSubmit={this.postSubmitHandler}>Submit</button>
                </div>
            </div>

        );
    }
}

export default MakePost;