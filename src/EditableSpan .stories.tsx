import { EditableSpan } from './EditableSpan'
import { action } from '@storybook/addon-actions'

export default {
	title: 'EditableSpan Component',
	component: EditableSpan,
}

const changeCallback = action('title changed')

export const EditableSpanExample = () => {
	return <EditableSpan title={'Start title'} onChange={changeCallback} />
}
