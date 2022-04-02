import './App.css';
import Cards from './components/Cards/Cards';
import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<Cards />
		</Provider>
	);
}

export default App;
