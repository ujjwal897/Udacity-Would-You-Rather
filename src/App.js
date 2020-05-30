import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LeaderBoard from './components/LeaderBoard'
import Votes from './components/Votes'
import Error from './components/Error'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import NewQuestion from './components/NewQuestion'
import { handleInitialData } from './actions/shared'
import Loading from './components/Loading'
import PrivateRoute from './components/privateRoute'

class App extends Component {
  componentDidMount() {
    const { dispatch, loading } = this.props
    if(loading === true) {
      dispatch(handleInitialData())
   }
  }
  render() {

    const {loading, auth} = this.props

    if(loading){
      return(
        <Loading />
      )
    }
    return (
    <Router>
        <Navbar/>
        <Switch>
          <PrivateRoute exact path='/' component={Home} auth={auth} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/add' component={NewQuestion} auth={auth} />
          <PrivateRoute exact path='/questions/:question_id' component={Votes} auth={auth} />
          <PrivateRoute exact path='/leaderboard' component={LeaderBoard} auth={auth} />
          <Route path="*" component={Error}/>
        </Switch>
    </Router>
    )
  }
}

function mapStateToProps({users,authedUser}) {

  return {
    loading: Object.keys(users).length!==0?false:true,
    authedUser,
    auth:authedUser?true:false
  }
}

export default connect(mapStateToProps)(App)
