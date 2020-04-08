import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown'

class Folder extends Component {

    static propTypes = {
        name: PropTypes.string,
    }

    static defaultProps = {
        name: ""
    }

    state = {
        hidden: false
    };

    handleClick = () => {
        // const { hidden } = this.state;
        // this.setState({
        //     hidden: !hidden,
        // });
    }

    render() {
        const { name } = this.props;
        const { hidden } = this.state;
        if (!name) {
            return null;
        }
        return (
            <ul
                style={{
                    margin: "4px 0px",
                    cursor: 'pointer'
                }}
                onClick={this.handleClick}
            >
                <ArrowDown />
                <Typography style={{ display: "inline" }} variant="body1">
                    {name}
                </Typography>
                {this.props.children}
            </ul>
        );
    }
}

export default Folder;
