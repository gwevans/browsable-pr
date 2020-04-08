import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFileData } from '../../foundational/reducers/app';
import Typography from '@material-ui/core/Typography';

class File extends Component {

    static propTypes = {
        data: PropTypes.object,
        active: PropTypes.bool,
    }

    static defaultProps = {
        data: {},
        active: false,
    }

    getFilename() {
        const { fileName } = this.props;
        return fileName;
    }

    getStyle() {
        const { active } = this.props;

        let style = {
            cursor: 'pointer',
            padding: '4px 10px',
            margin: '4px 0px',
            listStyleType: 'none',
        }

        if (active) {
            style = {
                ...style,
                backgroundColor: '#D7D9D9',
                borderRadius: '3px',
            }
        }

        return style;
    }

    getColor() {
        const { data } = this.props;
        switch (data.status) {
            case 'modified':
                return 'default';
            case 'added':
                return 'primary';
            case 'deleted':
                return 'error';
            default:
                return 'default';
        }
    }

    handleOnClick(data) {
        const { dispatch } = this.props;
        dispatch(setFileData(data));
    }

    render() {
        const { data } = this.props;
        return (
            <li style={this.getStyle()} onClick={() => this.handleOnClick(data)}>
                <Typography color={this.getColor()} variant="body1">
                    {this.getFilename()}
                </Typography>
            </li>
        );
    }
}

export default connect()(File);
