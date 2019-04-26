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
        const tree = { files: [] };

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

    testFunction(tree) {
        const { activeFile } = this.props;
        const rootKeys = Object.keys(tree);
        console.log(rootKeys);
        return rootKeys.map(folder => {
            if (Array.isArray(tree[folder])) {
                return tree[folder].map(file => {
                    const active = file.sha === activeFile.sha;
                    return <File key={file.filename} data={file} active={active} />;
                });
            }
            console.log('folder', folder);
            return this.testFunction(tree[folder]);
        });
    }

    renderFileTree() {
        const { activeFile } = this.props;
        const tree = this.getFileTreeObject();
        console.log('tree', tree);

        return this.testFunction(tree);
        // return rootKeys.map(folder => {
        //     if (Array.isArray(tree[folder])) {
        //         return tree[folder].map(file => {
        //             const active = file.sha === activeFile.sha;
        //             return <File key={file.filename} data={file} active={active} />;
        //         });
        //     }
        //     return <ul>{folder}</ul>;
        // });
    }

    render() {
        // const { files, activeFile } = this.props;
        return (
            <div style={{ float: "left", margin: '20px 0px 0px 20px' }}>
                {this.renderFileTree()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    files: filesSelector(state),
    activeFile: activeFileSelector(state)
})

export default connect(mapStateToProps)(FileTree);
