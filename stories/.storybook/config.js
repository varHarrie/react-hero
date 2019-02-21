import { addDecorator, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

const req = require.context('../src', true, /.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

addDecorator(withKnobs)
configure(loadStories, module)
