import path from "path";
import { globalJsonResource } from "../core/global-json-resource.js";
import { applicationLanguagesService } from '../services/languages/application-languages.service.js';

export const getTranslations = async () => {
	const files = await applicationLanguagesService.getAllSortedByMain();
	const translationsByLang: Record<string, Record<string, string>> = {};

	const reads = files.map(async file => {
		const filePath = path.resolve(file.path);
		const fileManager = globalJsonResource<Record<string, string>>(filePath);

		translationsByLang[file.key] = await fileManager.get();
	});

	await Promise.all(reads);

	return translationsByLang;
};
