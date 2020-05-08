import React from 'react';
// import RouH from './routes/router';
// const createHistory = require("history").createBrowserHistory

// import Home from './pages/home/home'

class TestError extends React.Component {
  componentDidCatch(e) {
    alert(e.message);
  }
  componentDidMount() {
    // throw new Error('a');
  }
  render() {
    return <div>TestError</div>
  }
}

class App extends React.Component{

  constructor(props){
    super(props)
    console.log(this.props)
  }

  render(){
    return (<React.Fragment>
      <TestError>
      </TestError>

      {/* <RouH  history={createHistory()}/> */}

    </React.Fragment>
    )
  }


}


export default App


