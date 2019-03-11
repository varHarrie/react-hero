import * as React from 'react'

import FormStore, { FormRules } from './FormStore'

export default function useFormStore<T extends Object = any> (
  values: Partial<T> = {},
  rules: FormRules = {}
) {
  return React.useMemo(() => new FormStore(values, rules), [values, rules])
}
