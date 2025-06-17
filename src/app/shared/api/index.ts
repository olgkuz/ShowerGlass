import { environment } from "../../../environments/environment.development";
const serverIp = environment.apiUrl;
export const API = {
    desauth: `${serverIp}/desauth`,
    reg: `${serverIp}/reg`,
    cards:`${serverIp}/cards`,
    card:`${serverIp}/card`,
    config: `/config/config.json`,
    articles: `${serverIp}/articles`,
    articleById: (id: string) => `${serverIp}/articles/${id}`,

}