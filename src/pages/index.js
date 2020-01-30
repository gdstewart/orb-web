import React, { Component } from "react";
import StationsList from "../components/stationslist";

export default class Stations extends Component {
	render() {
		return (
			<div className="section">
				<StationsList />
			</div>
		)
	}
}