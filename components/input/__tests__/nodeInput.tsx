import { render, screen } from '@testing-library/react'
import NodeInput from '../nodeInput'
import toTitleCase from '@/public/utils/toTitleCase'

describe('<NodeInput/>', () => {
	const properties = ['pressure', 'temperature', 'flow rate']

	beforeEach(() => {
		render(<NodeInput properties={properties} />)
	})

	it('should render a <SingleProperty /> for the first given property name', () => {
		const firstText = toTitleCase(properties[0])
		expect(screen.queryByText(firstText)).toBeInTheDocument()
	})
})
