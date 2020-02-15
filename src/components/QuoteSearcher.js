import React, { Component } from 'react';
import Quote from './Quote';

export default class QuoteSearcher extends Component {
  state = {
    fetching: true,
    searchWord: "tree",
    quotes: [],
    numLikes: 0,
    numDislikes: 0
  };

  componentDidMount() {
    fetch (`https://quote-garden.herokuapp.com/quotes/search/${this.state.searchWord}`)
      .then(response => response.json())
      .then(data => {
        this.updateQuotes(data.results);
      })
      .catch(console.error);
  };

  search = (keyword) => {
    console.log(keyword);
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${keyword}`)
      .then(response => response.json())
      .then(data => {
        this.updateQuotes(data.results);
      })
      .catch(console.error);
    ;
  };

  updateQuotes = (array) => {
    this.setState({ quotes: array, fetching: false }
      , () => this.refreshStatus)
  }

  refreshStatus = () => {
    this.setState({ quotes:
      this.state.quotes.forEach(quote => (quote.status = 'neutral'))}
      , () => console.log(this.state.quotes))
  }


  setLiked = _id => {
    this.setState({ quotes:
      this.state.quotes.map(quote => {
        if (quote._id === _id) {
          return { ...quote, status: 'liked' };
        } else {
          return quote;
        }
      })}, ()=>
      this.updateCounter()
    );
    ;
  };

  setDisliked = _id => {
    this.setState({ quotes:
      this.state.quotes.map(quote => {
        if (quote._id === _id) {
          return { ...quote, status: 'disliked' };
        } else {
          return quote;
        }
      })}, ()=>
      this.updateCounter()
    );
    ;
  };

  updateCounter = () => {
    const likedQuotes = this.state.quotes.filter(quote =>
      quote.status === "liked");
    this.setState({numLikes: likedQuotes.length});
    const dislikedQuotes = this.state.quotes.filter(quote =>
      quote.status === "disliked");
    this.setState({numDislikes: dislikedQuotes.length});
  };

  handleChange = (event) => {
    this.setState({searchWord:event.target.value})
  };

  handleSubmit = (event) => {
    this.setState({fetching: true}, ()=>
      this.search(this.state.searchWord))
  };

  render() {
    return (
      <div className='quotesearcher'>
        <form onSubmit={this.handleSubmit}>
          <input
            type = "text"
            onChange = {this.handleChange} />
           <input type="submit" value="Search!" />
        </form>
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
