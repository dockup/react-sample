import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [],
      url: "",
      isLoading: false,
    };
  }

  changeText(quote) {
    this.setState({
      quote,
    }, this.setLoading());
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      url: e.target.value
    });
  }

  setLoading(){
    this.setState({isLoading: !this.state.isLoading})
  }

  getText(e) {
    e.preventDefault();
    this.setState({isLoading: true}, () => {
      axios
        .get("/api")
        .then(response => {
          // handle success
          this.changeText(response.data.quote);
        })
        .catch((error) => {
          // handle error
          console.log(error);
          this.setLoading()
        });
    })
  }

  render() {
    const { isLoading, quote } = this.state;
    return (
      <div className="container mt-5" style={{width: '50%'}}>
        <h2> Dockup Demo (github-branch: master)</h2>
        <hr />
        <p>
          This stack has got 3 components (containers).
          <ul>
            <li>Frontend written in React.</li>
            <li>Backend written in Django</li>
            <li>Backend talks to Postgres</li>
          </ul>
        </p>
        <br />
        <button className="btn btn-primary" onClick={e => this.getText(e)}>
          Get random Quote
        </button>
        <br />
          {Boolean(quote.length) && !isLoading &&
            <blockquote class="blockquote mt-5">
            <p class="mb-0">{quote[0]}</p>
            <footer class="blockquote-footer"><cite title={quote[1]}>{quote[1]}</cite></footer>
          </blockquote>}

          {isLoading &&
            <div className="mt-5 spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
      </div>
    );
  }
}

export default App;
