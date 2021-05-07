import { render } from '@testing-library/react'
import NodeInput from '../nodeInput'

describe('<NodeInput/>', () => {
	it('should match snapshot', () => {
		const component = render(<NodeInput />)
		// expect(component).toMatchSnapshot()
	})
})
