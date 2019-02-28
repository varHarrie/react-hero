import * as React from 'react'

import { FormRules } from './FormStore'
import { FormStore } from '.'

export default function useFormStore<T extends Object = any> (
  values: Partial<T> = {},
  rules: FormRules = {}
) {
  return React.useState(new FormStore(values, rules))[0]
}
