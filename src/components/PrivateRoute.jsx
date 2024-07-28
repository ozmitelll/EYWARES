import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isAuth} from "../service/auth.service";

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuth() ? (
                    children
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};


export default PrivateRoute;