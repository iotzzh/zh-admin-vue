export default class Form {
  emit: any;
  refForm: any;
  constructor(params: any) {
    this.emit = params.emit;
    this.refForm = params.refForm;
  }

  validate = async () => {
    if (!this.refForm.value) return;
    const result = await this.refForm.value.validate((valid: any) => {
      return valid;
    });

    return result;
  };
}
