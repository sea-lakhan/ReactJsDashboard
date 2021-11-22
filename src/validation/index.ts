export const AlphabetValidation = new RegExp(/^[a-zA-Z\s]+$/);
export const AlphabetNumericValidation = new RegExp(/^[a-zA-Z0-9]+$/);
export const EmailValidation = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/);
export const AlphaNumericWithUnderscoreValidation = new RegExp(/^(?!_)(?!.*_$)[a-zA-Z0-9\_]+$/);
export const PasswordValidation = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
