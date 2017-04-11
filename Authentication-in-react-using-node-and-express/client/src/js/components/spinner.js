import React from 'react';

class Loading extends React.Component {

    render() {
        if (!this.props.loading) {
            return (<span></span>)
        }
        return (
            <span className='icon-spinner icon-spin'></span>
        )
    }
}

export default Loading;