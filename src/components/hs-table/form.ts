/*
 * @Author: zzh
 * @Date: 2022-03-08 17:22:46
 * @LastEditors: zzh
 * @LastEditTime: 2022-04-10 22:10:14
 * @Description: 搜索框内相关方法
 * @FilePath: \zh-admin\src\components\hs-table\form.ts
 */
import { FormSettingsModel } from '../../model/hsTableModel';

const getSearchParams = (formSttings: FormSettingsModel, page: any) => {
    const model = formSttings.formModel ? JSON.parse(JSON.stringify(formSttings.formModel)) : {};
    // 针对date-range
    const needSplitKeys = Object.keys(model).filter((x) => x.split('$').length > 1);
    for (let i = 0; i < needSplitKeys.length; i++) {
        if (formSttings.formModel[needSplitKeys[i]] && formSttings.formModel[needSplitKeys[i]].length > 0) {
            model[needSplitKeys[i].split('$')[0]] = formSttings.formModel[needSplitKeys[i]][0];
        }

        if (formSttings.formModel[needSplitKeys[i]] && formSttings.formModel[needSplitKeys[i]].length > 1) {
            model[needSplitKeys[i].split('$')[1]] = formSttings.formModel[needSplitKeys[i]][1];
        }
        delete model[needSplitKeys[i]];
    }

    if (formSttings.fields) {
        // 针对需要额外转换的参数
        const needConvertFields = formSttings.fields.filter((x) => x.convertValue);
        for (let i = 0; i < needConvertFields.length; i++) {
            model[needConvertFields[i].prop] = needConvertFields[i].convertValue(model[needConvertFields[i].prop]);
        }

        // 针对需要额外扩展的参数，例如 { a: 'a' } => { b: 'a1', c: 'a2' }
        const needExtendFields = formSttings.fields.filter((x) => x.extendMethod);
        for (let i = 0; i < needExtendFields.length; i++) {
            const extendMethodResult = needExtendFields[i].extendMethod(model[needExtendFields[i].prop]); // 该结果是一个数组
            for (const res of extendMethodResult) {
                model[res.property] = res.value;
            }
            // 衍生出了其他属性后，原有属性是否需要删除，默认不删除
            if (needExtendFields[i].deleteOriginProperty) {
                delete model[needExtendFields[i].prop];
            }
        }
    }


    // 表格里的搜索，如果是""或者为null/undefined均不传参数
    for (const key in model) {
        if (model[key] === '' || model[key] === undefined || model[key] === null) {
            delete model[key];
        }
    }

    const params = { current: page.current, size: page.size, ...formSttings.request.conditions, ...model };
    return params;
};


const initFormModel = async (formSttings: FormSettingsModel) => {
    if (formSttings.fields && formSttings.fields.length > 0) {
        for (const field of formSttings.fields) {
            formSttings.formModel[field.prop] = field.defaultValue;
        }
    }
};

const handleFormActionButton = async (method: Function) => {
    console.log('handleFormActionButton');
    //  const selections = this.$refs.table.selection;
    method();
};

const search = async () => {
    console.log('search');
};

const reset = async () => {
    console.log('reset');
};

const download = async () => {
    console.log('download');
};

const save = async () => {
    console.log('save');
};


export {
    getSearchParams,
    initFormModel,
    handleFormActionButton,
    search,
    reset,
    download,
    save
};