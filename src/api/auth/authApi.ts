import axiosInstances from "@/config/axios";

const requestAuth = axiosInstances.auth
const ROOT_AUTH ="/auth"

const confirmEmail = (email: string,
    code: number,) => requestAuth.get(`${ROOT_AUTH}/ConfirmEmail`, {params:{email: email,
    code: code}})

const sendCodeForgotPassword = (email: string) => requestAuth.post(`${ROOT_AUTH}/ForgotPassword?email=${email}`)

const confirmResetPassCode = (email: string, code: string, newPassword: string) => requestAuth.post(`${ROOT_AUTH}/ConfirmResetPassCode?email=${email}&code=${code}&newpass=${newPassword}`)

const authApi = {
    confirmEmail,
    sendCodeForgotPassword,
    confirmResetPassCode
};
  
export default authApi;