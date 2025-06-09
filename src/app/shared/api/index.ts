import { environment } from "../../../environments/environment.development";
const serverIp = environment.apiUrl;
export const API = {
    desauth: `${serverIp}/desauth`,
    reg: `${serverIp}/reg`
}