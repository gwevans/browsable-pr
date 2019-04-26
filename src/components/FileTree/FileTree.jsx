import React, { Component } from 'react';
import { connect } from 'react-redux';
import set from 'lodash/set';
import get from 'lodash/get';
import { filesSelector } from '../../foundational/reducers/github';
import { activeFileSelector } from '../../foundational/reducers/app';
import File from './File.jsx';

class FileTree extends Component {

    getFileTreeObject() {
        const { files } = this.props;
        const tree = {files: []};

        files.forEach(file => {
            const fileArray = file.filename.split('/');
            const fileName = fileArray[fileArray.length - 1];
            const filePath = fileArray.splice(0, fileArray.length - 1);
            set(tree, filePath, { files: [] });
            const filesArray = get(tree, [...filePath, 'files'].join('.'));
            const fileObject = {
                fileName,
                data: file
            }
            filesArray.push(fileObject);
        });
        return tree;
    }

    renderFileTree() {
        const tree = this.getFileTreeObject();
        console.log('tree', tree);
        const rootKeys = Object.keys(tree);

        return rootKeys.map(folder => {
            return <ul>{folder}</ul>
        });
    }

    render() {
        const { files, activeFile } = this.props;
        return (
            <div style={{ float: "left" }}>
                {this.renderFileTree()}
                {/* {files.map(file => {
                    const active = file.sha === activeFile.sha;
                    return <File key={file.filename} data={file} active={active} />
                })} */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    files: filesSelector(state),
    activeFile: activeFileSelector(state)
})

export default connect(mapStateToProps)(FileTree);
