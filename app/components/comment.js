import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';
import {likeComment, unlikeComment} from '../server';
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }
  /**
    * Triggered when the user clicks on the 'like '
    * or 'unlike' button.
    */
    handleLikeClick(clickEvent) {
      // Stop the event from propagating up the DOM
      // tree, since we handle it here. Also prevents
      // the link click from causing the page to scroll to the top.
      clickEvent.preventDefault();
      // 0 represents the 'main mouse button' --
      // typically a left click
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
      if (clickEvent.button === 0) {
      // Callback function for both the like and unlike cases.
      var callbackFunction = (updatedLikeCounter) => {
      // setState will overwrite the 'likeCounter'
      // field on the current state, and will keep
      // the other fields in-tact. This is called a
      // shallow merge:
      // https://facebook.github.io/react/docs/component-api.html#setstate
      this.setState({likeCounter: updatedLikeCounter});
      };
      if (this.didUserLike()) {
        // User clicked 'unlike' button.
        unlikeComment(this.props.feedItemKey,4,callbackFunction, this.props.commentIndex);
      } else {
        // User clicked 'like' button.
        likeComment(this.props.feedItemKey, 4,callbackFunction, this.props.commentIndex);
      }
    }
  }

  /**
    * Returns 'true' if the user liked the item.
    * Returns 'false' if the user has not liked the item.
    */
    didUserLike() {
      var likeCounter = this.state.likeCounter;
      var liked = false;
      // Look for a likeCounter entry with userId 4 -- which is the
      // current user.
      for (var i = 0; i < likeCounter.length; i++) {
        if (likeCounter[i]._id === 4) {
        liked = true;
        break;
        }
      }
        return liked;
    }

  render() {
    var likeBtn = "Like";
    if (this.didUserLike()) {
      likeBtn = "Unlike";
    }
    var data = this.state;
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + data.author._id}>
            {data.author.fullName}
          </Link>   {data.contents}
          <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>{likeBtn}
          </a> {data.likeCounter.length}  <a href="#">Reply</a>  {unixTimeToString(data.postDate)}

        </div>
      </div>
    )
  }
}
