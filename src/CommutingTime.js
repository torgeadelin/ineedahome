import React, { Component } from "react"

const calculateTravelTime = async (from, to) => {
	let result = await fetch(
		"https://api.tfl.gov.uk/Journey/JourneyResults/TW91DN/to/TW134BZ"
	).then((res) => res.json())

	let journey = result.journeys[0] === undefined ? {} : result.journeys[0]
	console.log(journey)
	return journey
}

export default class CommutingTime extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	async componentWillMount() {
		let journey = await calculateTravelTime()
		this.setState({
			journey: journey,
		})
	}

	render() {
		if (this.state.journey != null) {
			return <p>{this.state.journey.duration}</p>
		} else {
			return <p>Loading....</p>
		}
	}
}
