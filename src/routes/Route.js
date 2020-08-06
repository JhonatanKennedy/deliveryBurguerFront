import React  from 'react';
import { Route as ReactDOMRouteProps , Redirect} from 'react-router-dom';

export default function Route({ isPrivate = false, component: Component, ...rest }){
    const token = localStorage.getItem('@DeliveryBurguer:token');
    return(
        <ReactDOMRouteProps
        {...rest}
        render={() => {
            return isPrivate === !!token ? (
                <Component/>
            ) : (
                <Redirect to={{pathname: isPrivate ? '/' : '/home'}}/>
            )
        }}
        />
    );
}