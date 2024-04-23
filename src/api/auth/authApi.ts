import axiosInstances from "@/config/axios";

const requestAuth = axiosInstances.auth
const ROOT_AUTH ="/auth"

const confirmEmail = (email: string,
    code: number,) => requestAuth.get(`${ROOT_AUTH}/ConfirmEmail`, {params:{email: email,
    code: code}})

const authApi = {
    confirmEmail,
};
  
export default authApi;