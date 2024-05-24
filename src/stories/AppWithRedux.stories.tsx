import AppWithRedux from '../AppWithRedux'
import { ReduxStoreDecorator } from './ReduxStoreDecorator'

export default {
	title: 'AppWithRedux Component',
	component: AppWithRedux,
	decorators: [ReduxStoreDecorator],
}

export const EditableSpanExample = () => {
	return <AppWithRedux />
}
