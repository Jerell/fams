import Meta from '../meta'
import renderer from 'react-test-renderer'

describe('<Meta/>', () => {
	it('should match snapshot', () => {
		const component = renderer.create(<Meta />).toJSON()
		expect(component).toMatchSnapshot()
	})
})
