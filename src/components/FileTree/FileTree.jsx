import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filesSelector } from '../../foundational/reducers/github';
import { activeFileSelector } from '../../foundational/reducers/app';
import File from './File.jsx';

class FileTree extends Component {
    render() {
        const { files, activeFile } = this.props;
        console.log(files);
        return (
            <div style={{float: "left"}}>
                {files.map(file => {
                    const active = file.sha === activeFile.sha;
                    return <File key={file.filename} fileData={file} active={active} />
                })}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    files: filesSelector(state),
    activeFile: activeFileSelector(state)
})

export default connect(mapStateToProps)(FileTree);
