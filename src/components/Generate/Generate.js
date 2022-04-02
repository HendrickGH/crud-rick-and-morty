import React from 'react';
import { addCharacter, addData } from '../../store/slices/characters';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters, generateRandomID } from '../../helpers';
import classes from './Generate.module.css';

const Generate = () => {
	const dispatch = useDispatch();
	const selector = useSelector(state => state.characters);
	const createNewCharacterHandler = async () => {
		const { characters } = selector;
		const character = generateRandomID(characters);
		const newCharacter = await getCharacters(character);

		dispatch(addCharacter(character));
		dispatch(addData([newCharacter, ...selector.dataCharacters]));
	};
	return (
		<button
			type='button'
			onClick={createNewCharacterHandler}
			className={classes.button}
		>
			Generate new character
		</button>
	);
};

export default Generate;
