import * as React from 'react'
import * as Adapter from 'enzyme-adapter-react-16'
import { configure, render } from 'enzyme'

import { Form, FormStore } from '..'

configure({ adapter: new Adapter() })

// function setup () {
//   const props = {
//     store: new FormStore(),
//     onChange: jest.fn()
//   }

//   const wrapper = shallow(<Form {...props} />)
//   return { props, wrapper }
// }

describe('Form', () => {
  it('should render correctly', () => {
    const wrapper = render(<Form store={new FormStore()} />)
    expect(wrapper).toMatchSnapshot()

    const wrapper2 = render(<Form store={new FormStore()}>Hello World</Form>)
    expect(wrapper2).toMatchSnapshot()

    const wrapper3 = render(
      <Form store={new FormStore()}>
        <div>Hello</div>
        <div>World</div>
      </Form>
    )
    expect(wrapper3).toMatchSnapshot()
  })
})
