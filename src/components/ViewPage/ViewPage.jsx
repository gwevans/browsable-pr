import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import '../../App.css';
import { setLocation } from '../../foundational/reducers/location';

class ViewPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(setLocation(window.location));
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
