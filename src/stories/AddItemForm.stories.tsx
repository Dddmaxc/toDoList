import { AddItemForms } from '../AddItemForm'
import { action } from '@storybook/addon-actions'

export default {
	title: 'AddItemForm Component',
	component: AddItemForms,
}

const callBack = action('Button "Add" was pressed inside the form')

export const AddItemFormsBaseExample = () => {
	return (
		<>
			<AddItemForms addItem={callBack} />
		</>
	)
}
