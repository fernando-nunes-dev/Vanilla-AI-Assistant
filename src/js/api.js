// src/js/api.js

// URL da API da Hugging Face apontando para um modelo de linguagem popular
// Modelo: Llama 3 da Meta
const API_URL = 'https://api-inference.huggingface.co/models/distilgpt2';

export const API = {
    async getAIResponse(apiKey, prompt) {
        if (!apiKey) {
            throw new Error('Chave de API (Token) da Hugging Face não fornecida.');
        }
        if (!prompt) {
            throw new Error('A pergunta não pode estar vazia.');
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        return_full_text: false
                    }
                })
            });

            if (!response.ok) {
                const errorBody = await response.text();
                if (response.status === 503) {
                     throw new Error('O modelo de IA está sendo carregado. Por favor, tente novamente em 20-30 segundos.');
                }
                throw new Error(`Erro na API: ${response.statusText} - ${errorBody}`);
            }

            const data = await response.json();
            
            if (data && data[0] && data[0].generated_text) {
                return data[0].generated_text;
            } else {
                throw new Error('Formato de resposta inesperado da API.');
            }

        } catch (error) {
            console.error('Falha na comunicação com a API:', error);
            throw new Error(error.message);
        }
    }
};