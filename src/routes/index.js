import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Home from '../pages/Home/index';
import Products from '../pages/Products';
import Additionals from '../pages/Additionals';
import Users from '../pages/Users/index';
import Orders from '../pages/Orders/index';
import Categorys from '../pages/Categorys/index';
import Unauthorized from '../pages/Unauthorized/index';

export default function Routes() {
    return(
        <Switch>
            <Route exact path='/' component={Unauthorized}/>
            <Route path='/home' component={Home} isPrivate />
            <Route path='/products' component={Products} isPrivate />
            <Route path='/additionals' component={Additionals} isPrivate />
            <Route path='/users' component={Users} isPrivate />
            <Route path='/orders' component={Orders} isPrivate />
            <Route path='/categorys' component={Categorys} isPrivate />
        </Switch>
    );
}