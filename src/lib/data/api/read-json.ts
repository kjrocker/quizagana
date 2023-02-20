import axios from 'axios';

type Tuples = [string, string][];

type Files = {
	hiragana: { base: Tuples };
};

export const readJSON = async <T extends keyof Files>(name: T): Promise<Files[T]> => {
	const data = await axios.get(`/quizagana/Data/${name}.json`).then((response) => response.data);
	return data;
};
