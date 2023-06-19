import * as apiLogin from './login';
import * as apiAuthorityManagement from './authorityManagement';
import * as apiCommon from './common';
import * as apiClientManagement from './clientManagement';
import * as apiLayout from './layout';


const api = {
    ...apiLogin.default,
    ...apiAuthorityManagement.default,
    ...apiCommon.default,
    ...apiClientManagement.default,
    ...apiLayout.default,
};

export default api;