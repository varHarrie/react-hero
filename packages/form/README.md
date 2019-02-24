# `@react-hero/form`

> A full-featured form component.

## Installation

```bash
npm install @react-hero/form --save
# or
yarn add @react-hero/form
```

## Basic Usage

Simply create a `FormStore` and pass into `Form` component. `value` and `onChange` of form controls (such as `input`) are unnecessary.

```javascript
import { Form, FormStore } from '@react-hero/form'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.store = new FormStore()
  }

  onSubmit = (e) => {
    e.preventDefault()

    const values = this.store.get()
    console.log(values)
  }

  render() {
    return (
      <Form store={this.store}>
        <Form.Field label='Name' name='name'>
          <input type='text' />
        </Form.Field>
        <Form.Field label=''>
          <button onClick={this.onSubmit}>Submit</button>
        </Form.Field>
      </Form>
    )
  }
}
```

## Default Values

To set default values, you can pass an object as the first parameter. Use `reset()` to restore defaults at any time.

```javascript
const store = new FormStore({ name: 'Harry' })
// ...
store.reset()
```

## Form Validation

The second parameter is used to pass the form rules. Each function should return a `boolean` or `string` value:

- Returning `true` means check successfully.
- Returning `false` or `string` means check failed, and the string result is the error message.

Using `store.validate()` to check entire form, and returns a tuple with error message and form values. Or directly gets form values by `store.get()` without validation.

```javascript
const rules = {
  name: (!!val && !!val.trim()) || 'Name is required'
}

const store = new FormStore({}, rules)
// ...
const [error, values] = store.validate()
```

## APIs

### Form Props

- `className` Form element class name, `optional`.
- `store` Form store, `required`.
- `inline` Inline layout for fields, default to `false`.
- `compact` Hides error message, default to `false`.
- `required` Displays star mark, does not include validation, default to `false`.
- `labelWidth` Customized label width, `optional`.
- `gutter` Customized distance between label and control, `optional`.
- `errorClassName` Adds customized class name when field has error message, `optional`.
- `onSubmit` Submit callback, `optional`.

### Form Field Props

- `className` Field element class name, `optional`.
- `label` Field label, `optional`.
- `name` Field name, `optional`.
- `valueProp` Value prop name of child component, default to `'value'`.
- `valueGetter` The way to parse value from change event, `optional`.
- `suffix` Suffix nodes, `optional`.

### FormStore Methods

- `new FormStore(defaultValues?, rules?)` Creates form store.
- `store.get()` Returns entire form values.
- `store.get(name)` Returns field value by name.
- `store.set()` Sets entire form values.
- `store.set(name, value)` Sets field value by name.
- `store.set(name, value, false)` Sets field value by name without validating.
- `store.reset()` Resets form with default values.
- `store.validate()` Validates entire form and returns error message and values.
- `store.validate(name)` Validates field value by name and returns error message and value.
- `store.error()` Returns the all error messages.
- `store.error(index)` Returns the nth error message.
- `store.error(name)` Returns error message by name.
- `store.error(name, message)` Sets error message by name.
- `store.subscribe(listener)` Adds listener and returns unsubscribe callback.
