import React from 'react';
import './App.css';
import {Context} from './context/Auth';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import ListExplorations from './pages/Explorations/List';
import NewExploration from './pages/Explorations/New';
import EditExploration from './pages/Explorations/Edit';
import ShowExploration from  './pages/Explorations/Show';
import ListUsers from './pages/Users/List'
import NewUser from './pages/Users/New'
import ShowUser from './pages/Users/Show'
import ShowCanvass from './pages/Canvass/Show';
import DrawerIS from "./components/DrawerIS";


function AppWithAuth() {
    const {isAuth, setAuth} = Context();
    return (
            <div className='App'>
                {isAuth ?
                    <Switch>
                        <DrawerIS>
                       <Route exact path="/istrazivanja/" component={ListExplorations} />
                       <Route exact path="/istrazivanja/new" component={NewExploration} />
                       <Route exact path="/istrazivanja/:id/edit" component={EditExploration} />
                       <Route exact path="/istrazivanja/:id/show" component={ShowExploration} />
                       <Route exact path="/istrazivanja/:id/anketa/new" component={ShowCanvass} />
                       <Route exact path="/istrazivanja/:id/anketa/show" component={ShowCanvass} />
                       <Route exact path="/korisnici/" component={ListUsers} />
                       <Route exact path="/korisnici/new" component={NewUser} />
                       <Route exact path="/korisnici/:id/show" component={ShowUser} />
                        </DrawerIS>
                    </Switch>
                    : <Login/>
                }
            </div>
    )
}

export default AppWithAuth;