import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import '../../App.css';
import { setLocation } from '../../foundational/reducers/location';
import { getGithubInfo } from '../../foundational/reducers/github';


class ViewPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(setLocation(window.location));
        dispatch(getGithubInfo(window.location.pathname));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Testview
                    </p>
                </header>
            </div>
        );
    }
}

export default connect()(ViewPage);
