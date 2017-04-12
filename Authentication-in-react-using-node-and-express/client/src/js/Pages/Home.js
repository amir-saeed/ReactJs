import React from "react";

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="content">
                {this.props.children}
            </div>
        );
    }
}

export default Home;
