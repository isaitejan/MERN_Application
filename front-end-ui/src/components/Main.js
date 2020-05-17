import React,{ Component , Fragment} from 'react';
import { BrowserRouter as Router ,Route, Link} from 'react-router-dom';
import Booking from './BookingPage';
import MainContent from './MainContent'

class MainPage extends Component{

    render(){
        return (
            <Router>
                <Fragment>
                <nav className="navbar navbar-expand-sm bg-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/booking" className="nav-link">Booking</Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    <Route exact path="/" component={MainContent}/>
                    <Route path="/booking" component={Booking}/>
                </div>
                </Fragment>
            </Router>
        );
    }
}

export default MainPage;
