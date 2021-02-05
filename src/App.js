import React, {Suspense, lazy} from 'react'
import {Switch, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
const Homepage = lazy(() => import('./views/Homepage'));
const History = lazy(() => import('./views/History'));
const About = lazy(() => import('./views/About'));
const Login = lazy(() => import('./views/Login'));
const Register = lazy(() => import('./views/Register'));



function App() {
    return (
        <div className="App">
            <Header/>
            <main>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/history" component={History}/>
                        <Route exact path="/" component={Homepage}/>
                        <Route exact path="/Register" component={Register}/>
                        <Route exact path="/Login" component={Login}/>
                    </Switch>
                </Suspense>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
