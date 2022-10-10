import {frontUrl} from "../config/config";

const CLIENT_ID = "b2591ba5c1ea35054b56c6152c7d0d77";
const REDIRECT_URI =  frontUrl + "/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;