import React, { Component } from "react";
import Loader from "react-loader-spinner";

export default class LoadingOverlay extends Component {
    render() {
        return (
            <div className="overlay">
                <Loader type="TailSpin" color="#FFF" height={100} width={100} />
            </div>
        )
    }
}