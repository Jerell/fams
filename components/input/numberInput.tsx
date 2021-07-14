const UnitSelect = ({ type }) => {
	let options
	switch (type) {
		case 'currency':
			options = ['£', '€', 'US$', 'AU$', 'MYR', 'PKR']
			break
		case 'pressure':
			options = ['bar', 'Pa']
			break
		case 'length':
			options = ['m', 'km', 'mm']
			break
		default:
			options = ['unit1', 'unit2']
	}
	return (
		<div className='inline-flex'>
			<label htmlFor='unit' className='sr-only'>
				Unit
			</label>
			<select name='unit' className='outline-none bg-green-50'>
				{options.map((o, i) => (
					<option key={i}>{o}</option>
				))}
			</select>
		</div>
	)
}

interface INIProps {
	label: string
	labelClasses?: string
	required?: boolean
	unit?: string
	unitListType?: string
	unitLeft?: boolean
	min?: number
}

const NumberInput = ({
	label,
	labelClasses,
	required = false,
	unit,
	unitListType,
	unitLeft = false,
	min = 0,
}: INIProps) => {
	return (
		<>
			<label htmlFor={label} className={`text-right mx-2 ${labelClasses}`}>
				{label}
				{required && <span className='text-red-500'>*</span>}
			</label>
			<div
				className={`inline-flex border border-green-300 focus-within:ring-green-100 focus-within:ring focus-within:border-green-500 ${
					unitLeft ? '' : 'flex-row-reverse'
				}`}
			>
				{unit && <span className='inline-flex mx-1'>{unit}</span>}
				{unitListType && <UnitSelect type={unitListType}></UnitSelect>}
				<input
					type='number'
					min={min}
					name={label}
					className={`focus:outline-none w-36 pl-2 ${
						unitLeft ? '' : 'text-right'
					}`}
				/>
			</div>
		</>
	)
}

export default NumberInput
