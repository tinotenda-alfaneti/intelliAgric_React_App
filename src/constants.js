export const API_BASE_URL = "http://127.0.0.1:5000";

export const ENDPOINTS = {
    SOIL_DATA_URL: `${API_BASE_URL}/get-soil-data`,
    SOIL_ANALYSIS_URL: `${API_BASE_URL}/soil-analysis`,
    CHAT_URL: `${API_BASE_URL}/chat`,
    PREDICT_MARKET_URL: `${API_BASE_URL}/predict-market`,
    PREDICT_DISEASE_URL: `${API_BASE_URL}/predict-disease`,
    REGISTER_FARM_URL: `${API_BASE_URL}register-farm/`,
    QUERY_ECOMMERCE_URL: `${API_BASE_URL}//query-ecommerce`,
    CHAT_SAVE_URL: `${API_BASE_URL}/chat/save`,
};

export const INTENTS = {
    MARKET_PRED_INTENT: "#Predict Agriculture Market",
    DISEASE_PRED_INTENT: "#Predict Crop Disease",
    QUERY_ECOMMERCE_INTENT: "#Query Ecommerce Database",
};