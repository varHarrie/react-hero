import * as React from 'react'

import FormStore from './FormStore'

const FormStoreContext = React.createContext<FormStore | undefined>(undefined)

export default FormStoreContext
