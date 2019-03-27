import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import FileTree from "../FileTree/FileTree.jsx"
import { setLocation } from '../../foundational/reducers/location';
import { getGithubInfo } from '../../foundational/reducers/github';
import FileViewPort from '../FileViewPort/FileViewPort';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class ViewPage extends Component {

    state = {
        activeTab: 0,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        
        dispatch(setLocation(window.location));
        dispatch(getGithubInfo(window.location.pathname));
    }

    handleChange = (event, activeTab) => {
        this.setState({ activeTab });
    };

    getTabContent() {
        const { activeTab } = this.state;
        if (activeTab === 0) {
            return (
                <>
                    <FileTree />
                    <FileViewPort />
                </>
            )
        }

        return null;
    }

    render() {
        const { activeTab } = this.state;
        return (
            <div>
                <Tabs
                    value={activeTab}
                    onChange={this.handleChange}
                    centered
                >
                    <Tab label="Files" />
                    <Tab label="Commits" />
                    <Tab label="Conversation" />
                </Tabs>
                {this.getTabContent()}
            </div>
        );
    }
}

export default connect()(ViewPage);
