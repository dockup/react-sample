import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      url: ""
    };
  }

  changeText(text) {
    this.setState({
      text
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
        this.changeText(response.data.string);
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
        <p>
          Everytime we deploy, Dockup spins up 3 containers for all the
          3 components, wires them together and sends url to slack channel.
          Users can click on that link and start testing. Deployment
          process can be automated whenever user opens a PR in frontend
          or backend
        </p>
        <button className="btn btn-primary" onClick={e => this.getText(e)}>
          Get random data from backend
        </button>
        <br />
        <p>{this.state.text}</p>
      </div>
    );
  }
}

export default App;
