import type { LoginPayload, LoginResponse } from "../types/types";

const API_URL = "http://credit-sale-APIRestful.test/api";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {

    console.log("PAYLOAD QUE SALE DE REACT:", payload); 
    console.log("JSON STRINGIFY:", JSON.stringify(payload));
    
    const response = await fetch(`${API_URL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw { 
        response: { 
          data: errorData || { message: "Error en la solicitud" },
          status: response.status 
        } 
      };
    }

    const textResponse = await response.text();

    try {
        const jsonResponse = JSON.parse(textResponse);
        if (jsonResponse.token) return jsonResponse;
        return { token: jsonResponse }
    } catch {
        return { token: textResponse }
    }
  },
};