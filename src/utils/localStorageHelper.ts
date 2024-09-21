const LAYOUTKEY = '_layout';
export default class LocalStorageHelper {
    static className = 'LocalStorageHelper';
    static setLayout = (value: string) => {
        localStorage.setItem(LAYOUTKEY, value);
    };

    static getLayout = () => {
        const value = localStorage.getItem(LAYOUTKEY);
        return value;
    };
}