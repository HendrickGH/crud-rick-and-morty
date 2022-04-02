import axios from 'axios';

export async function getCharacters(ids) {
	const endpoint = `https://rickandmortyapi.com/api/character/${ids}`;
	const request = await axios.get(endpoint);
	return request.data;
}

export function generateRandomID(arrayIds = []) {
	const charactersAvailable = 826;
	const character = Math.trunc(Math.random() * charactersAvailable);

	if (arrayIds.length) {
		const isInTheArray = arrayIds.includes(character);
		const isLessThanTheTotal = arrayIds.length >= charactersAvailable;
		if (isLessThanTheTotal) return;
		if (isInTheArray) return generateRandomID(arrayIds);
	}

	return character;
}
