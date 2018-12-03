import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cardlist from '../components/Cardlist';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'

import {setSearchField, requestRobots} from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     robots: []
  //   }
  // }


  componentDidMount() {

    this.props.onRequestRobots()
  
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => {return response.json()})
    //   .then(users => {this.setState({robots: users})
    //   })

  }

  render() {
    // const {robots} = this.state
    const {searchField, onSearchChange, robots, isPending} = this.props
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    });
    return isPending ?
      <h1 className='tc f1'>Loading</h1> :
   (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <Searchbox searchChange={onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
            <Cardlist robots={filteredRobots} />
            </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
