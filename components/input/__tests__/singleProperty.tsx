import SingleProperty from '../singleProperty'
import { fireEvent, render, screen } from '@testing-library/react'
import toTitleCase from '@/public/utils/toTitleCase'

describe('<SingleProperty/>', () => {
	const property = 'pressure'

	beforeEach(() => {
		render(<SingleProperty property={property} />)
	})

	it('should show input box', () => {
		const input = screen.getByLabelText(property, { exact: false })

		expect(input).toBeTruthy()
	})

	it('should start at zero', () => {
		const zeroText = screen.getByText(0)

		expect(zeroText).toBeTruthy()
	})

	it('should change with user input', () => {
		const input = screen.getByLabelText(property, { exact: false })
		const text = screen.getByText(0)

		fireEvent.change(input, { target: { value: 1 } })

		expect(text.innerHTML).toBe('1')
	})

	it('should capitalize the label', () => {
		const label = screen.queryByText(toTitleCase(property))
		expect(label).toBeInTheDocument()
	})
})
