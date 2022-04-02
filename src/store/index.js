import { configureStore } from '@reduxjs/toolkit';

import characters from './slices/characters';

export default configureStore({
	reducer: {
		characters,
	},
});
