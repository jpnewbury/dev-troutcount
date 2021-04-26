import React, { Component } from "react";
import fetch from "isomorphic-unfetch";

export default class extends Component {
  static async getInitialProps() {
    const res = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?lat=39.52479515228387&lon=-107.32812105201361&appid=a60e6e63615bfd115f40208faf0ebc46&units=imperial"
    );
    const images = await res.json();
    return { images };
  }
  componentWillMount() {
    this.setState({
      images: this.props.images,
    });
  }
  render() {
    return (
      <>
        {this.state.images.map((image, key) => (
          <ul id={key} id={key}>
            {image}
          </ul>
        ))}
      </>
    );
  }
}
