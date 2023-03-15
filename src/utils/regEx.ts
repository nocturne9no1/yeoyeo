const EmailPattern = "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$";
const UsernamePattern = "^[A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]*$";
const UserMobilePattern = "[0-9]{3}-[0-9]{4}-[0-9]{4}";
const UserAuthNumberPattern = "^[0-9]{6}";

export const validEmail = new RegExp(EmailPattern);
export const validUsername = new RegExp(UsernamePattern);
export const validUserMobileNumber = new RegExp(UserMobilePattern);
export const validUserAuthNumber = new RegExp(UserAuthNumberPattern);
