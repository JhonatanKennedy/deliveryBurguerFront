import React from 'react';
import { Route , Switch } from 'react-router-dom';

import Login from '../pages/Login/index';
import Home from '../pages/Home/index';
import Products from '../pages/Products';
import Additionals from '../pages/Additionals';
import Users from '../pages/Users/index';
import Orders from '../pages/Orders/index';

export default function Routes() {
    return(
        <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/products' component={Products}/>
            <Route path='/additionals' component={Additionals}/>
            <Route path='/users' component={Users}/>
            <Route path='/orders' component={Orders}/>
        </Switch>
    );
}