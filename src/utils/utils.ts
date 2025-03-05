/**
 * Преобрауем минуты в часы и минуты
 * @param {number} totalMinutes минуты
 * @returns {[number, number]} массив из дух чисел: певое число часы, второе минуты 
 */
export function toHoursAndMinutes(totalMinutes?: number): [number, number] {
	if ((totalMinutes && totalMinutes < 0) || !totalMinutes) return [0, 0];
	const minutes = totalMinutes % 60;
	const hours = Math.floor(totalMinutes / 60);
	return [hours, minutes];
}

export type TypeFormatString = {
	format: string,
	value: string
}

/**
 * Форматирует минуты в строку формата 1 (M мин) или формата 2 (H ч M мин) 
 * @param {тumber} totalMinutes - минуты
 * @param {boolean} isHour - форматировать в строку формата 2
 * @returns 
 */
export function formatHoursAndMinutesToString(totalMinutes: number, isHour: boolean = false): TypeFormatString {
	if (totalMinutes < 0) throw Error('Значение минут отрицательно.');

	if (!isHour || totalMinutes <= 60) {
		return {
			format: `${totalMinutes}m`,
			value: `${totalMinutes} мин`
		};
	}

	const [hours, minutes] = toHoursAndMinutes(totalMinutes);

	return {
		format: `${hours}h ${minutes}m`,
		value: `${hours} ч ${minutes} мин`
	};
}

/**
 * Форматирует диапазон лет
 * @param {number} fromYear год начала
 * @param {number} toYear год конца
 * @returns 
 */
export function formatRangeYearsToString(fromYear?: number | null, toYear?: number | null): TypeFormatString {

	if ((!fromYear) || (fromYear < 0) || (toYear && toYear < 0) || (toYear && toYear < fromYear)) {
		return {
			format: '',
			value: '***'
		};
	}

	if (!toYear) {
		return {
			format: `${fromYear}`,
			value: `${fromYear}`
		};
	}

	return {
		format: `${fromYear}/${toYear}`,
		value: `${fromYear} - ${toYear}`
	};
}

/**
 * Функция делает первую букву строки заглавной
 * @param {string} text  
 * @returns {string} строка с первой буквой заглавной
 */
export function capitalizeFirstLetter(text: string): string {
	return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

/**
 * Функция преобразования кода языка в название языка
 * @param {string} code код языка
 * @returns {string} название языка
 */
export const getLanguage = (code: string, locales: string[]) => {
	const lang = new Intl.DisplayNames(locales, {type: 'language'});
	return lang.of(code);
};

/**
 * Функция преобразования числа в денежный формат (доллар)
 * @param {string} number - форматируемое число в строковом представлении
 * @returns {string} отформатированое число в строковом представлении
 */
export const formatNumberToCurrencyUSD = (number?: string | null): string | undefined => {

	if (number === null || !number) return;
	
	const num = Number(number);
	if (isNaN(num)) return;


	const formatter = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
		compactDisplay: 'short'
	});
	return formatter.format(num);
};
