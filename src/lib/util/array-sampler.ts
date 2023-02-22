import { equals } from 'ramda';

export const sample = <T>(list: T[]): T => {
	return list[Math.floor(Math.random() * list.length)];
};

export const sampleMany = <T>(list: T[], count = 3): T[] => {
	return shuffle(list).slice(0, count);
};

const shuffle = <T>(input: T[]): T[] => {
	const array = input.slice();

	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
};

export const makeArraySampler = <T>(list: T[]) => {
	let cache = shuffle(list);
	return {
		including: (val: T, count = 3): T[] => {
			const options = sampleMany(list, count + 1).filter((v) => !equals(v, val));
			return shuffle([val, ...sampleMany(options, count - 1)]);
		},
		next: (): T => {
			if (!Array.isArray(list) || list.length === 0) throw Error("Can't sample an empty array");
			if (cache.length === 1) {
				const result = cache.pop() as T;
				cache = shuffle(list);
				return result;
			} else if (cache.length === 0) {
				cache = shuffle(list);
				return cache.pop() as T;
			} else {
				return cache.pop() as T;
			}
		}
	};
};
