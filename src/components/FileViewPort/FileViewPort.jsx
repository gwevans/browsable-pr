import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activeFileSelector } from '../../foundational/reducers/app';

class FileViewPort extends Component {
    render() {
        const { activeFile } = this.props;

        return (
            <div style={{float: "right", width: "75%"}}>
                {activeFile.patch}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeFile: activeFileSelector(state),
})

export default connect(mapStateToProps)(FileViewPort);
