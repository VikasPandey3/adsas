import {Route,Switch,BrowserRouter as Router,Redirect} from 'react-router-dom'
import './App.css';
import HomePage from "./component/HomePage"
import AppDetails from './component/AppDetails'
function PrivateRoute({component:Component,permission,...rest}){
  return(
    <Route
    {...rest}
    render={(props)=>permission?<Component{...props}/>:<Redirect to={{pathname:'/', state:{from:props.location}}}/>}
    />
  )
}
function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
          
        
        <Route path="/appdetails" component={AppDetails}/>
        
      </Switch>
    </Router>
  );
}

export default App;
