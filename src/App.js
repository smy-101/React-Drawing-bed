import React, {Suspense, lazy} from 'react'
import './App.css';
import {Switch, Route} from "react-router-dom";
// import Homepage from "./views/Homepage";
// import History from "./views/History";
// import About from "./views/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const Homepage = lazy(() => import('./views/Homepage'));
const History = lazy(() => import('./views/History'));
const About = lazy(() => import('./views/About'));


function App() {
    return (
        <div className="App">
            <Header/>
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/history" component={History}/>
                    <Route exact path="/" component={Homepage}/>
                </Switch>
            </Suspense>
            <Footer/>
        </div>
    );
}

export default App;
