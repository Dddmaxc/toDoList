import { Provider } from 'react-redux'
import { store } from '../state/store'

export const ReduxStoreDecorator = (storyFn: any) => {
	return <Provider store={store}> {storyFn()}</Provider>
}
