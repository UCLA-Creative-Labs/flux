import React, { Component } from "react";
import NewsFeed from "../NewsFeed/NewsFeed"
//import firebaseWrapper from "../../firebaseWrapper"

class FeaturedPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "",
            posts: {}
        };
    }

    changeActiveTab = event => {
        this.setState({
            activeTab: event.currentTarget.dataset.divid
        })
        //Firebase wrapper to get select posts, setState
    }
    render() {
        return (
            <div>
                <div data-divid={'userPosts'} onClick={this.changeActiveTab}>Click to see posts</div>
                <div data-divid={'likedPosts'} onClick={this.changeActiveTab}>Click to see liked posts</div>
                <NewsFeed userId="1234"/>
            </div>
        )
    }
}

export default FeaturedPosts