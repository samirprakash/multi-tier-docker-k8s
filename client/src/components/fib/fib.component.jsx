import axios from "axios";
import React from "react";

class Fib extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seenIndices: [],
      values: {},
      index: ""
    };
  }

  componentDidMount = () => {
    this.fetchIndices();
    this.fetchValues();
  };

  handleSubmit = async event => {
    event.preventDefault();
    await axios.post("/api/values", {
      index: this.state.index
    });

    this.setState({ index: "" });
  };

  fetchIndices = async () => {
    const seenIndices = await axios.get("/api/values/all");
    this.setState({ seenIndices: seenIndices.data });
  };

  fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  };

  renderSeenIndices = () => {
    return this.state.seenIndices.map(({ number }) => number).join(", ");
  };

  renderValues = () => {
    const entries = [];

    // eslint-disable-next-line
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key}, I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  };

  render() {
    return (
      <>
        <h1>Fib Generator</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Enter Your index: </label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indices already viewed</h3>
        {this.renderSeenIndices()}

        <h3>Calculated values</h3>
        {this.renderValues()}
      </>
    );
  }
}

export default Fib;
