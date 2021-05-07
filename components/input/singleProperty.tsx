// import { useState } from 'React'
import toTitleCase from '@/public/utils/toTitleCase'

interface Props {
	property: string
}

const SingleProperty = ({ property }) => {
	// const [value, setValue] = useState(0)

	function update(e) {
		console.log(e.target.value)
	}

	return (
		<>
			<div className='grid grid-cols-3 gap-3 mb-2'>
				<label htmlFor={property}>{toTitleCase(property)}</label>
				<input type='number' name={property} onChange={update} />
				<p>1</p>
			</div>
		</>
	)
}

export default SingleProperty
