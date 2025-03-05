import {useSearchParams} from 'react-router-dom';

/**
 * Хук для добавления/изменения URL параметра в поисковой строке браузера
 * @param {string} key - ключ параметра
 * @param {string | undefined} defaultValue - значение по умолчанию
 * @returns 
 */
const useSearchParamValue = (key: string, defaultValue?: undefined): [string | undefined, (newValue: string) => void] => {
	const [searchParams, setSearchParams] = useSearchParams();
	const value = searchParams.get(key) || defaultValue;
	const setValue = (newValue: string) => {
		setSearchParams((prev) => {
			prev.set(key, newValue);
			return prev;
		});
	};
	return [value, setValue];
};

export default useSearchParamValue;