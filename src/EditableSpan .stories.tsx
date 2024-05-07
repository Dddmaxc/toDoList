import { EditableSpan } from './EditableSpan'
import { action } from '@storybook/addon-actions'

export default {
	title: 'AddItemForm Component',
	component: EditableSpan,
}

const callBack = action('Button "Add" was pressed inside the form')

export const EditableSpanExample = () => {
	return <></>
}
