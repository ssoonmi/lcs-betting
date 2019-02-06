import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
    render() {
        return (
            <h2>This is the Dashboard</h2>
        );
    }
}

const msp = state => {
    return {

    };
};

const mdp = dispatch => {
    return {

    };
}

export default connect(msp, mdp)(Dashboard);