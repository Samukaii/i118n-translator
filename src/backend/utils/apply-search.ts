import { Translation } from '@shared/models/translation.js';

export const applySearch = (translations: Translation[], search: string) => {
	const searchLower = search.toLowerCase();

	return translations.filter(({path, entries}) => {
		return (
			path.toLowerCase().includes(searchLower) ||
			entries.some(lang => lang.value?.toLowerCase().includes(searchLower))
		);
	});
}
