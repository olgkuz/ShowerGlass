import { environment } from "../../../environments/environment.development";

const serverIp = environment.apiUrl;

export const API = {
  auth: `${serverIp}/users/login`,          
  reg: `${serverIp}/users/register`,       
  cards: `${serverIp}/cards`,    
  card: (id: string) => `${serverIp}/cards/${id}`,   
  config: `/config/config.json`,
  articles: `${serverIp}/articles`,
  articleById: (id: string) => `${serverIp}/articles/${id}`
};
