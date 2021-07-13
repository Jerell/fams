const NumberInput = ({
	label,
	labelClasses,
	required = false,
	unit,
	unitRight = false,
	min = 0,
}) => {
	return (
		<>
			<label htmlFor={label} className={`text-right mx-2 ${labelClasses}`}>
				{label}
				{required && <span className='text-red-500'>*</span>}
			</label>
			<div
				className={`inline-flex border border-green-300 focus-within:ring-green-100 focus-within:ring focus-within:border-green-500 ${
					unitRight ? 'flex-row-reverse ' : 'pr-0'
				}`}
			>
				{unit && <span className='inline-flex mx-1'>{unit}</span>}
				<input
					type='number'
					min={min}
					name={label}
					className='focus:outline-none'
				/>
			</div>
		</>
	)
}

export default NumberInput
