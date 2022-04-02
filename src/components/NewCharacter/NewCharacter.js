import React, { useState, useEffect } from 'react';
import { addCharacter, addData } from '../../store/slices/characters';
import { useDispatch, useSelector } from 'react-redux';
import classes from './NewCharacter.module.css';
import { getCharacters } from '../../helpers';

const NewCharacter = () => {
	const dispatch = useDispatch();
	const selector = useSelector(state => state.characters);
	const [isCreating, setIsCreating] = useState(false);
	const [name, setName] = useState('');
	const [species, setSpecies] = useState('');
	const [status, setStatus] = useState('');
	const [location, setLocation] = useState({ name: '' });
	const [origin, setOrigin] = useState({ name: '' });
	const [image, setImage] = useState('');

	useEffect(() => {
		(async () => {
			const generateRandomNumber = Math.trunc(Math.random() * 826);
			const newDataCharacter = await getCharacters(generateRandomNumber);
			setImage(newDataCharacter.image);
		})();
	}, [isCreating]);

	const createNewCharacterHandler = () => {
		setIsCreating(true);
	};

	const addNewCharacterHandler = e => {
		e.preventDefault();
		console.log('addNewCharacter');
		const updateCharacters = [
			{
				name,
				species,
				status,
				location,
				origin,
				image,
				id: Date.now(),
				fromZero: true,
			},
			...selector.dataCharacters,
		];
		dispatch(addCharacter(updateCharacters.at(0).id));
		dispatch(addData(updateCharacters));
		cleanForm();
	};

	const cleanForm = () => {
		setName('');
		setSpecies('');
		setStatus('');
		setLocation({ name: '' });
		setOrigin({ name: '' });
		setImage('');
		setIsCreating(false);
	};

	return (
		<>
			<button onClick={createNewCharacterHandler} className={classes.button}>
				Custom character!
			</button>
			{isCreating && (
				<>
					<form className={classes.form}>
						<label htmlFor='name'>Name: </label>
						<input
							id='name'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<label htmlFor='species'>Species: </label>
						<input
							id='species'
							value={species}
							onChange={e => setSpecies(e.target.value)}
						/>
						<label htmlFor='status'>Status: </label>
						<input
							id='status'
							value={status}
							onChange={e => setStatus(e.target.value)}
						/>
						<label htmlFor='origin'>Origin: </label>
						<input
							id='origin'
							value={origin.name}
							onChange={e => setOrigin({ name: e.target.value })}
						/>
						<label htmlFor='location'>Location: </label>
						<input
							id='location'
							value={location.name}
							onChange={e => setLocation({ name: e.target.value })}
						/>
					</form>
					<div className={classes.buttons}>
						<button onClick={e => addNewCharacterHandler(e)}>Create!</button>
						<button onClick={cleanForm}>Cancel!</button>
					</div>
				</>
			)}
		</>
	);
};

export default NewCharacter;
