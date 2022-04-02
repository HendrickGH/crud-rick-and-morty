import { createSlice } from '@reduxjs/toolkit';

export const characterSlice = createSlice({
	name: 'characters',
	initialState: {
		// to create random characters
		characters: [1, 2].map(() => Math.trunc(Math.random() * 826)),
		dataCharacters: [],
	},
	reducers: {
		addCharacter(state, action) {
			state.characters.push(action.payload);
		},
		deleteCharacter(state, action) {
			const filterElements = arrayElements => {
				return arrayElements.filter(character => {
					const id = character.id || character;
					return id !== action.payload;
				});
			};
			state.characters = filterElements(state.characters);
			state.dataCharacters = filterElements(state.dataCharacters);
		},
		editCharacter(state, action) {
			// higher order functions
			const isEqual = character => character.id === action.payload.id;
			const dataHandler = character =>
				isEqual(character) ? { ...action.payload } : character;
			state.dataCharacters = state.dataCharacters.map(dataHandler);
		},
		addData(state, action) {
			state.dataCharacters = action.payload;
		},
	},
});

export const { addCharacter, deleteCharacter, addData, editCharacter } =
	characterSlice.actions;
export default characterSlice.reducer;
