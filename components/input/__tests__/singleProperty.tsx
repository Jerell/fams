import SingleProperty from '../singleProperty'
import { render } from '@testing-library/react'

describe('<SingleProperty/>', () => {
	it('should match snapshot', () => {
		const component = render(<SingleProperty property='pressure' />)
		// expect(component).toMatchSnapshot()
	})
})
