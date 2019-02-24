# `@react-hero/form`

> 一个功能齐全的表单组件。

## 安装

```bash
npm install @react-hero/form --save
# 或者
yarn add @react-hero/form
```

## 基础用法

只需简单地创建一个`FormStore`实例并传递到`Form`组件上。对于表单组件（如`input`），无需再传递`value`和`onChange`了。

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

## 默认值

如要设置默认值，只需提供一个对象给第一个参数。并且你可以在任何时候通过`reset()`恢复到这个默认值。

```javascript
const store = new FormStore({ name: 'Harry' })
// ...
store.reset()
```

## 表单校验

第二个参数用于设置校验规则，其中的每个函数必须返回一个`boolean`或`string`类型的值。

- 若返回`true`，代表校验通过。
- 若返回`false`或者`string`，代表校验失败，`string`类型的结果作为错误信息。

使用`store.validate()`可以校验整个表单，并且返回一个包含错误信息和表单值的数组。

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

- `className` 表单元素类名，`可选`。
- `store` 表单数据存储，`必须`。
- `inline` 设置行内布局，默认值为`false`。
- `compact` 是否隐藏错误信息，默认值为`false`。
- `required` 是否显示星号，不包含表单校验，仅用于显示，默认值为`false`。
- `labelWidth` 自定义标签宽度，`可选`。
- `gutter` 自定义标签和表单组件间的距离，`可选`。
- `errorClassName` 当有错误信息时，添加一个自定义类名，`可选`。
- `onSubmit` 表单提交回调，`可选`。

### Form Field Props

- `className` 表单域类名，`可选`。
- `label` 表单域标签，`可选`。
- `name` 表单域字段名，`可选`。
- `valueProp` 填写到子组件的值属性名，默认值为`'value'`。
- `valueGetter` 从表单事件中获取表单值的方式，`可选`。
- `suffix` 后缀节点，`可选`。

### FormStore Methods

- `new FormStore(defaultValues?, rules?)` 创建表单存储。
- `store.get()` 返回整个表单的值。
- `store.get(name)` 根据字段名返回表单域的值。
- `store.set()` 设置整个表单的值。
- `store.set(name, value)` 根据字段名设置表单域的值。
- `store.set(name, value, false)` 根据字段名设置表单域的值，并跳过校验。
- `store.reset()` 重置表单。
- `store.validate()` 校验整个表单，并返回错误信息和表单值。
- `store.validate(name)` 根据字段名校验表单域的值，并返回错误信息和表单值。
- `store.error()` 返回所有错误信息。
- `store.error(index)` 返回第 index 条错误信息。
- `store.error(name)` 根据字段名返回错误信息。
- `store.error(name, message)` 根据字段名设置错误信息。
- `store.subscribe(listener)` 订阅表单变动，并返回一个用于取消订阅的函数。
