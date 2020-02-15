import React, { Component } from 'react';
import Quote from './Quote';

export default class QuoteSearcher extends Component {
  state = {
    fetching: true,
    quotes: [],
    numLikes: 0,
    numDislikes: 0
  };

  async componentDidMount() {
    const url = 'https://quote-garden.herokuapp.com/quotes/search/tree';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ quotes: data.results, fetching: false });
    this.state.quotes.forEach(quote => (quote.status = 'neutral'));
  }

  setLiked = _id => {
    this.setState({ quotes:
      this.state.quotes.map(quote => {
        if (quote._id === _id) {
          return { ...quote, status: 'liked' };
        } else {
          return quote;
        }
      })
    });
    this.updateCounter();
  };

  setDisliked = _id => {
    this.setState({ quotes:
      this.state.quotes.map(quote => {
        if (quote._id === _id) {
          return { ...quote, status: 'disliked' };
        } else {
          return quote;
        }
      })
    });
    this.updateCounter();
  };

  updateCounter = () => {
    const likedQuotes = this.state.quotes.filter(quote =>
      quote.status === "liked");
    this.setState({numLikes: likedQuotes.length});
    const dislikedQuotes = this.state.quotes.filter(quote =>
      quote.status === "disliked");
    this.setState({numDislikes: dislikedQuotes.length});
    console.log(this.state.quotes)
  }

  render() {
    return (
      <div className='quotesearcher'>
        <h2>
          Liked: {this.state.numLikes} / Disliked: {this.state.numDislikes}
        </h2>
        {this.state.fetching ? (
          <div>Loading...</div>
        ) : (
            <div>
              {this.state.quotes.map(quote => (
                <Quote
                  changeToLiked={this.setLiked}
                  changeToDisliked={this.setDisliked}
                  text={quote.quoteText}
                  author={quote.quoteAuthor}
                  _id={quote._id}

                />
              ))}
            </div>
        )}
      </div>
    );
  }
}
