import React, { Component } from 'react';
import { connect } from 'react-redux';
import set from 'lodash/set';
import get from 'lodash/get';
import { filesSelector } from '../../foundational/reducers/github';
import { repoNameSelector } from '../../foundational/reducers/location';
import { activeFileSelector } from '../../foundational/reducers/app';
import File from './File.jsx';
import Folder from './Folder.jsx';

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

    createFolder(tree, name = "") {
        console.log(tree);
        const { activeFile } = this.props;
        const rootKeys = Object.keys(tree);
        return (
            <>
                <Folder name={name}>
                    {rootKeys.map(folder => {
                        if (Array.isArray(tree[folder])) {
                            return tree[folder].map(file => {
                                const active = file.data.sha === activeFile.sha;
                                return <File key={file.fileName} fileName={file.fileName} data={file.data} active={active} />;
                            });
                        }
                        return this.createFolder(tree[folder], folder);
                    })}
                </Folder>
            </>
        );
    }

    render() {
        const {repoName} = this.props;

        return (
            <div style={{ float: "left", margin: '20px 0px 0px 0px' }}>
                {this.createFolder(this.getFileTreeObject(), repoName)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    files: filesSelector(state),
    activeFile: activeFileSelector(state),
    repoName: repoNameSelector(state),
})

export default connect(mapStateToProps)(FileTree);
