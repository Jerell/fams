import { mount, shallow, render } from 'enzyme';
import Meta from "../meta"

describe("<Meta/>", () => {
  it("should match snapshot", () => {
    const component = shallow(<Meta />)
    expect(component).toMatchSnapshot()
  })
})