import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filesSelector } from '../../foundational/reducers/github';
import { activeFileSelector } from '../../foundational/reducers/app';
import File from './File.jsx';

class FileTree extends Component {

    createFileTree() {
        const { files } = this.props;
        const tree = { files: [] };

        files.forEach(file => {
            // const filePathArray = file.filename.split('/');
            // for (let i = 0; i < filePathArray.length; i++) {
            //     if (i !== filePathArray.length) {
            //         // TODO 
            //         break;
            //     }
            //     if (i === 0) {

            //     } else if (i === 1) {

            //     } else if (i === 2) {

            //     } else if (i === 3) {

            //     } else if (i === 4) {

            //     } else if (i === 5) {

            //     }
            // }
            file.filename.split('/').forEach((folder, index) => {
                const isFile = folder.includes('.');
                // If cd is a folder and the key doesnt exist, create it
                if (!isFile && !tree[folder]) {
                    tree[folder] = { files: [] };
                }

                // 
                if (isFile) {
                    const path = file.filename.split('/');
                    if (isFile && (index === 0)) {
                        tree.files.push(path[0]);
                    } else {
                        tree[path[0]].files.push(path[1]);
                    }
                }
            });
        });
        return tree;
    }

    render() {
        const { files, activeFile } = this.props;
        console.log(this.createFileTree());
        return (
            <div style={{ float: "left" }}>
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
