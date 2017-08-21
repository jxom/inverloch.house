export const isRequired = value => (value ? undefined : 'This field is required');
export const isNumber = value => (value.match(/[^0-9]/) ? 'This field must only contain numbers' : undefined);
export const isLengthEqualTo = length => value => (value && value.length === length ? undefined : `Field must contain ${length} characters`);
export const isValidMobile = value => (/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/i.test(value) ? undefined : 'Please enter a valid mobile number');