import axios from 'axios';
import { parse } from 'csv-parse/browser/esm/sync';

type Tuples = [string, string][];

type Files = {
	hiragana: { base: Tuples };
};

export const readJSON = async <T extends keyof Files>(name: T): Promise<Files[T]> => {
	const data = await axios.get(`/quizagana/Data/${name}.json`).then((response) => response.data);
	return data;
};

type CSVData = {
	group: 'hiragana' | 'katakana';
	japanese: string;
	romanji: string;
	english?: string;
}[];

export const readCSV = async (): Promise<CSVData> => {
	const response = await axios.get(`/quizagana/Data/hiragana.csv`);
	return parse(response.data, { columns: true, skip_empty_lines: true });
};
