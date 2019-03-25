import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number } from '@storybook/addon-knobs'
import { Form, useFormChange, useFormStore } from '@react-hero/form'

function App () {
  const store = useFormStore(
    {
      username: 'Default',
      password: '',
      gender: 'male',
      contact: {
        phone: '',
        address: ''
      }
    },
    {
      username: (val) => !!val.trim() || 'Name is required',
      password: (val) => !!val.trim() || 'Password is required',
      'contact.phone': (val) => /[0-9]{11}/.test(val) || 'Phone is invalid',
      'contact.address': (val) => !!val.trim() || 'Address is required'
    }
  )

  useFormChange(store, (name) => {
    console.log('change', name, store.get(name))
  })

  const onReset = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    store.reset()
  }, [])

  const onSubmit = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()

    const [error, values] = store.validate()
    console.log(error, values)
  }, [])

  return (
    <Form
      store={store}
      inline={boolean('Inline', false)}
      compact={boolean('Compact', false)}
      required={boolean('Required', false)}
      labelWidth={number('Label Width', 120)}
      gutter={number('Gutter', 20)}
    >
      <Form.Field label='Username' name='username'>
        <input type='text' />
      </Form.Field>
      <Form.Field label='Password' name='password'>
        <input type='password' />
      </Form.Field>
      <Form.Field label='Gender' name='gender'>
        <select>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </Form.Field>
      <Form.Field label='Phone' name='contact.phone'>
        <input type='text' />
      </Form.Field>
      <Form.Field label='Address' name='contact.address'>
        <input type='text' />
      </Form.Field>
      <Form.Field label=''>
        <button onClick={onReset}>Reset</button>
        <button onClick={onSubmit}>Submit</button>
      </Form.Field>
    </Form>
  )
}

storiesOf('Components/Form', module).add('hooks', () => {
  return <App />
})
