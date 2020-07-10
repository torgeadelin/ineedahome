import React from "react"
import CommutingTime from "./CommutingTime"
import {
	InsertNewPropertyWrapper,
	TextField,
	Label,
	Button,
	PropertyRowWrapper,
} from "./Components"

// Hook
function useLocalStorage(key, initialValue) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = React.useState(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key)
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			// If error also return initialValue
			console.log(error)
			return initialValue
		}
	})

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value
			// Save state
			setStoredValue(valueToStore)
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error)
		}
	}

	return [storedValue, setValue]
}

export default function App() {
	const [properties, setProperties] = useLocalStorage("properties", [])
	const [workplace, setWorkplace] = useLocalStorage("workplace", "")
	const [price, setPrice] = React.useState("")
	const [link, setLink] = React.useState("")
	const [postcode, setPostcode] = React.useState("")

	const onClickAdd = () => {
		if (price === "" || link === "" || postcode === "") return

		let newProperty = {
			price: price,
			link: link,
			postcode: postcode,
		}

		setProperties([...properties, newProperty])
	}

	const handleWorkplaceChange = (event) => setWorkplace(event.target.value)
	const handleLinkChange = (event) => setLink(event.target.value)
	const handlePriceChange = (event) => setPrice(event.target.value)
	const handlePostcodeChange = (event) => setPostcode(event.target.value)

	return (
		<div style={{ padding: 100 }}>
			<h1>I need a home</h1>
			<div style={{ marginBottom: 20 }}>
				<Label>Workplace</Label>
				<TextField value={workplace} onChange={handleWorkplaceChange} />
			</div>
			<InsertNewPropertyWrapper>
				<div>
					<Label>Link</Label>
					<TextField value={link} onChange={handleLinkChange} />
				</div>
				<div>
					<Label>Price</Label>
					<TextField value={price} onChange={handlePriceChange} />
				</div>
				<div>
					<Label>Postcode</Label>
					<TextField value={postcode} onChange={handlePostcodeChange} />
				</div>
				<Button text="Add" onClick={onClickAdd} />
			</InsertNewPropertyWrapper>
			<p>My Properties</p>
			<div>
				{properties.map((property, index) => {
					return (
						<PropertyRowWrapper key={property.postcode}>
							<div>
								<Label>ID</Label>
								<p>{index}</p>
							</div>
							<div>
								<Label>Link</Label>
								<p>{property.link}</p>
							</div>
							<div>
								<Label>Price</Label>
								<p>{property.price}</p>
							</div>
							<div>
								<Label>Postcode</Label>
								<p>{property.postcode}</p>
							</div>
							<div>
								<Label>Commuting to Work (min)</Label>
								<CommutingTime />
							</div>
						</PropertyRowWrapper>
					)
				})}
			</div>
		</div>
	)
}
