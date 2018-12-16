import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

/**
 * Redirects the user to the landing page if they are not logged in
 */
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                auth.isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/' }} />
                )
            }
        />
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
