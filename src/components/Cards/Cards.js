import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addData } from '../../store/slices/characters';
import { getCharacters } from '../../helpers';
import NewCharacter from '../NewCharacter/NewCharacter';
import Generate from '../Generate/Generate';
import Card from '../Card/Card';
import classes from './Cards.module.css';

const Cards = () => {
	const dispatch = useDispatch();
	const selector = useSelector(state => state.characters);
	const { characters: selectorCharacters } = selector;

	useEffect(() => {
		(async () => {
			const newDataCharacters = await getCharacters(selectorCharacters);
			dispatch(addData(newDataCharacters));
		})();
	}, []);

	const mapCharacters = selector.dataCharacters.map(character => (
		<Card key={character.id} {...character} className={classes.card} />
	));

	return (
		<div className={classes.container}>
			<div className={classes.single}>
				<Generate />
				<NewCharacter />
			</div>
			<section className={classes.cards}>{mapCharacters}</section>
		</div>
	);
};

export default Cards;
