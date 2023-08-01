import React, { Component } from "react";
// import { robots } from "./robots";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import Scroll from "../Components/Scroll";
import "./App.css";
import ErrorBoundary from "../Components/ErrorBoundary";

class App extends Component {
  constructor() {
    super();
    //super() it is used for accessing the "this".
    this.state = {
      robots: [],
      searchfield: "",
    };
  }
  //The above are two states which help to search the robots

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  //Whenever the searchfield is search with the letters we type, it get updated to that empty by using .setState()

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    //filteredRobots filter the robots name by first lowercase it and then check whether the typed letters on searchfield are in robots
    return !robots.length ? (
      //If it is ), Js thinks of the opposite, So '!' is need
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f2">Robofriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }

  //here the searchbox has the function of searchfiled and cardlist will do filteredrobots
}

export default App;

//State >> Props, state has child of props
