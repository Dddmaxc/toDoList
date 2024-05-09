import AppWithRedux from './AppWithRedux'
import { ReduxStoreDecorator } from './stories/ReduxStoreDecorator'

export default {
	title: 'AppWithRedux Component',
	component: AppWithRedux,
	decorators: [ReduxStoreDecorator],
}

export const EditableSpanExample = () => {
	return <AppWithRedux />
}
