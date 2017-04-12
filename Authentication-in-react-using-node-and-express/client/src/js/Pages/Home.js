import React from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header />
                <div className="content">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;
