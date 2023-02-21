const sample = <T>(list: T[]): T => {
	return list[Math.floor(Math.random() * list.length)];
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
