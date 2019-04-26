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
        const { data } = this.props;
        return data.fileName;
    }

    getStyle() {
        const { active } = this.props;

        let style = {
            cursor: 'pointer',
            padding: '2px 10px',
            margin: '4px 0px'
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
            <div style={this.getStyle()} onClick={() => this.handleOnClick(data)}>
                <Typography color={this.getColor()} component="h6" variant="h6">
                    {this.getFilename()}
                </Typography>
            </div>
        );
    }
}

export default connect()(File);
