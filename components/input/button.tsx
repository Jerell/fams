interface IButtonProps {
	fn?: (e) => void
	text?: string
}

const Button = ({ fn, text = 'Submit' }: IButtonProps) => {
	function handleClick(e) {
		e.persist()
		e.preventDefault()
		if (fn) {
			fn(e)
		}
	}
	return (
		<button
			className='mt-4 mr-2 py-2 px-4 border border-transparent text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-24'
			onClick={handleClick}
		>
			{text}
		</button>
	)
}

export default Button
