import React from 'react';
import classes from './Card.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteCharacter,
	editCharacter,
} from '../../store/slices/characters/index';

const Card = props => {
	const { name, image, species, status, origin, location, id } = props;
	const [nameCharacter, setNameCharacter] = useState(name);
	const [speciesCharacter, setSpeciesCharacter] = useState(species);
	const [statusCharacter, setStatusCharacter] = useState(status);
	const [originCharacter, setOriginCharacter] = useState(origin.name);
	const [locationCharacter, setLocationCharacter] = useState(location.name);
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useDispatch();
	const selector = useSelector(state => state.characters);

	const deleteCardHandler = () => {
		if (selector.characters.length === 1) return;
		dispatch(deleteCharacter(id));
	};
	const toggleEditHandler = () => {
		setIsEditing(!isEditing);
	};

	const submitEditHandler = e => {
		e.preventDefault();
		const updateLocation = { ...location, name: locationCharacter };
		const updateOrigin = { ...origin, name: originCharacter };
		dispatch(
			editCharacter({
				name: nameCharacter,
				species: speciesCharacter,
				status: statusCharacter,
				origin: updateOrigin,
				location: updateLocation,
				image,
				id,
			})
		);
		toggleEditHandler();
	};

	return (
		<article className={classes.card}>
			<h2>{name}</h2>
			<figure>
				<img src={image} alt={name} />
				<div className={classes.info}>
					<p>
						{species} <span>{status}</span>
					</p>
					<p>
						{origin.name} - {location.name}
					</p>
				</div>
			</figure>
			<div className={classes.buttons}>
				<button onClick={deleteCardHandler}>Delete</button>
				<button onClick={toggleEditHandler}>Edit</button>
			</div>
			{isEditing && (
				<>
					<form className={classes.form}>
						<label htmlFor='name'>Name</label>
						<input
							id='name'
							type='text'
							value={nameCharacter}
							onChange={e => setNameCharacter(e.target.value)}
						/>
						<label htmlFor='species'>Species</label>
						<input
							id='species'
							type='text'
							value={speciesCharacter}
							onChange={e => setSpeciesCharacter(e.target.value)}
						/>
						<label htmlFor='status'>Status</label>
						<input
							id='status'
							type='text'
							value={statusCharacter}
							onChange={e => setStatusCharacter(e.target.value)}
						/>
						<label htmlFor='origin'>Origin</label>
						<input
							id='origin'
							type='text'
							value={originCharacter}
							onChange={e => setOriginCharacter(e.target.value)}
						/>
						<label htmlFor='location'>Location</label>
						<input
							id='location'
							type='text'
							value={locationCharacter}
							onChange={e => setLocationCharacter(e.target.value)}
						/>
						<button type='submit' onClick={submitEditHandler}>
							Update!
						</button>
					</form>
					<button
						type='submit'
						onClick={toggleEditHandler}
						className={classes.cancel}
					>
						Cancel!
					</button>
				</>
			)}
		</article>
	);
};

export default Card;
