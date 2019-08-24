import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [],
      url: ""
    };
  }

  changeText(quote) {
    this.setState({
      quote
    });
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      url: e.target.value
    });
  }

  getText(e) {
    e.preventDefault();
    axios
      .get("/api")
      .then(response => {
        // handle success
        this.changeText(response.data.quote);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
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
          {Boolean(this.state.quote.length) &&
            <blockquote class="blockquote mt-5">
            <p class="mb-0">{this.state.quote[0]}</p>
            <footer class="blockquote-footer"><cite title={this.state.quote[1]}>{this.state.quote[1]}</cite></footer>
          </blockquote>}
      </div>
    );
  }
}

export default App;
