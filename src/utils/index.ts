import * as isHelper from './isHelper';
import * as storageHelper from './storage';

const modules = import.meta.glob('./**');

const utils = {
    isHelper: isHelper.default,
    storageHelper: storageHelper.default
};

export default utils;