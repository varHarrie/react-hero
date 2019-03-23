import 'jest'

import * as React from 'react'
import * as Adapter from 'enzyme-adapter-react-16'
import { configure, render } from 'enzyme'

import { Form, FormField, FormItem, FormStore } from '..'

configure({ adapter: new Adapter() })

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

describe('Field', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <FormField label='Label' labelWidth={200} gutter={30} suffix='Suffix' required inline>
        <input type='text' />
      </FormField>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render error correctly', () => {
    const store = new FormStore()
    store.error('Name', 'Error Message')

    const wrapper = render(
      <Form store={store}>
        <div>
          <FormField label='Label' name='Name' />
        </div>
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Item', () => {
  it('should render correctly', () => {
    const store = new FormStore()

    const wrapper = render(
      <Form store={store}>
        <FormItem>
          <input type='text' />
        </FormItem>
      </Form>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
