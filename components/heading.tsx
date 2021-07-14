interface IHeadingProps {
	children: string
}

const Heading = ({ children }: IHeadingProps) => (
	<h2 className='text-xl font-semibold border-l pl-1 border-green-300 text-green-700'>
		{children}
	</h2>
)

export default Heading
