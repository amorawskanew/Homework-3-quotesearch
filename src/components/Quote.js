import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Quote extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    setLiked: PropTypes.func.isRequired,
    setDisliked: PropTypes.func.isRequired
  };

  state = {
    color: 'black',
    fontWeight: 'normal',
    textDecoration: 'none'
  };

  like = () => {
      this.setState({
      color: 'green',
      fontWeight: 'bold',
      textDecoration: 'none'
    });
    this.props.changeToLiked(this.props._id);
  };

  dislike = () => {
    this.setState({
      color: 'red',
      fontWeight: 'normal',
      textDecoration: 'line-through'
    });
    this.props.changeToDisliked(this.props._id);
  };

  render() {
    return (
      <div className='quote'>
        <p className='text' style={this.state}>
          {this.props.text}
        </p>
        <p className='author'>
          By: {this.props.author}
          <button className='likeButton' onClick={this.like}>
            Like
          </button>
          <button className='dislikeButton' onClick={this.dislike}>
            Dislike
          </button>
        </p>
      </div>
    );
  }
}
