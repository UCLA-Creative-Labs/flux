import React, { Component } from "react";
import Firebase from "firebase";
import PropTypes from "prop-types";
import ShowPost2 from "./ShowPost";
import ExpandedPost from "./ExpandedPost";
import "./NewsFeed.css";

class NewsFeed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: {},
      openpost: null
    };
  }

  componentDidMount() {
    const postRef = Firebase.database().ref("posts");
    postRef.on("value", snapshot => {
      this.setState({
        posts: snapshot.val()
      });
    });
  }

  seeMoreHandler = event => {
    console.log("CLicked btn");
    this.setState({ openpost: event.target.postId });
  };

  render() {
    const { posts, openpost } = this.state;
    const { userId } = this.props;
    // console.log(posts);
    console.log(openpost);
    return (
      <div>
        <div className="SearchBar">
          <input className="search" placeholder="SEARCH" />
        </div>
        <div className="flex-container">
          {Object.keys(posts)
            .reverse()
            .map(post => (
              <ShowPost2
                postId={post}
                postObject={posts[post]}
                userId={userId}
                clickHandler={this.seeMoreHandler}
              />
            ))}
        </div>
        {posts["-LePgZlvWiv0uZhjZGK_"] !== undefined && (
          <ExpandedPost postObject={posts["-LePgZlvWiv0uZhjZGK_"]} />
        )}
      </div>
    );
  }
}

NewsFeed.propTypes = {
  userId: PropTypes.string.isRequired
};
export default NewsFeed;
