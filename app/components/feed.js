import React from 'react';
import FeedItem from './feeditem';
import StatusUpdateEntry from './statusupdateentry';
import {getFeedData}from '../server';
import {postStatusUpdate}  from '../server';

export default class Feed extends React.Component {
  constructor(props) {
    //super() calls the parent class constructor --
    //e.g React.Component's constructor
    super(props);
    //set state's initial value
    //note that the constructor is the ONLY place
    // you should EVER set the state directly!
    // In all other places, use the `setState` method instead.
    // Setting `state` directly in other places will not
    // trigger `render()` to run, so your
    // program will have bugs.
    this.state = {
    // Empty feed.
    contents: []
    };
  }

  refresh() {
    getFeedData(this.props.user, (feedData) => {
      this.setState(feedData);
    });
  }

  onPost(postContents) {
    //send to server.
    // We could use geolocation to get location
    //but let's fix it to  Amherst for now.
    postStatusUpdate(4,"Amherst, MA", postContents, () => {
      this.refresh();
    });
  }

  componentDidMount() {
    this.refresh()
  }

  render() {
    return (
      <div>
        <StatusUpdateEntry
          onPost={(postContents) => this.onPost(postContents)} />
        {this.state.contents.map((feedItem) => {
          return (
            <FeedItem key = {feedItem._id} data={feedItem} />
          )
        })}
      </div>
    )
  }
}
