const EmailPattern = "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$";
const UsernamePattern = "^[A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]*$";

export const validEmail = new RegExp(EmailPattern);
export const validUsername = new RegExp(UsernamePattern);
