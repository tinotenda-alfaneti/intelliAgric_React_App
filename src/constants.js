import { ip_loc_key } from './firebase';
require('dotenv').config();
export const API_BASE_URL = "https://intelliagric-capstone.onrender.com";
// export const API_BASE_URL = "http://127.0.0.1:5000";

export const ENDPOINTS = {
    SOIL_CURRENT_DATA_URL: `${API_BASE_URL}/get_soil_data`,
    SOIL_ANALYSIS_URL: `${API_BASE_URL}/soil_analysis`,
    DAILY_AVERAGES_URL: `${API_BASE_URL}/daily_averages`,
    CHAT_URL: `${API_BASE_URL}/chat`,
    PREDICT_MARKET_URL: `${API_BASE_URL}/predict_market`,
    PREDICT_DISEASE_URL: `${API_BASE_URL}/predict_disease`,
    PREDICT_DISEASE_DRONE_URL: `${API_BASE_URL}/drone_image_analysis`,
    REGISTER_FARM_URL: `${API_BASE_URL}/farm/register`,
    QUERY_ECOMMERCE_URL: `${API_BASE_URL}/query_ecommerce`,
    CHAT_SAVE_URL: `${API_BASE_URL}/chat/save`,
    LOGOUT_URL: `${API_BASE_URL}/auth/logout`,
    LOGIN_URL: `${API_BASE_URL}/auth/login`,
    AGRI_NEWS_URL: `${API_BASE_URL}/agriculture_news`,
    IMG_UPLOAD_URL: `${API_BASE_URL}/upload/image`,
    SAVE_CHAT_URL: `${API_BASE_URL}/chat/save`,
    SAVED_CHAT_URL: `${API_BASE_URL}/chat/saved_chats`,
    FARM_OVERVIEW_URL: `${API_BASE_URL}/farm/overview`,
    OUTBREAK_ALERTS_URL: `${API_BASE_URL}/broadcasts`,
    OUTBREAK_ALERTS_RECOMMENDATION_URL: `${API_BASE_URL}/broadcasts/recommendation`,
    IP_TO_GEOLOC_URL: `https://api.ipgeolocation.io/ipgeo?apiKey=${ip_loc_key}`,

};

export const INTENTS = {
    MARKET_PRED_INTENT: "#Predict Agriculture Market",
    DISEASE_PRED_INTENT: "#Predict Crop Disease",
    QUERY_ECOMMERCE_INTENT: "#Query Ecommerce Database",
};
