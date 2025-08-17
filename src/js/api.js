// src/js/api.js

// URL da API da Groq
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Modelo de IA que usaremos (Llama 3)
const MODEL = 'llama3-8b-8192';

export const API = {
    async getAIResponse(apiKey, prompt) {
        if (!apiKey) {
            throw new Error('Chave de API da Groq não fornecida.');
        }
        if (!prompt) {
            throw new Error('A pergunta não pode estar vazia.');
        }

        try {
            // A requisição para a Groq segue o padrão da OpenAI
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // A chave é enviada no cabeçalho 'Authorization'
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    model: MODEL
                })
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`Erro na API: ${errorBody.error.message}`);
            }

            const data = await response.json();
            
            // A resposta da Groq vem em um formato um pouco diferente
            if (data.choices && data.choices[0] && data.choices[0].message) {
                return data.choices[0].message.content;
            } else {
                throw new Error('Formato de resposta inesperado da API.');
            }

        } catch (error) {
            console.error('Falha na comunicação com a API:', error);
            // Se a mensagem de erro já for específica, a usamos. Senão, uma genérica.
            const errorMessage = error.message.startsWith('Erro na API:') 
                ? error.message 
                : 'Não foi possível conectar à API. Verifique sua conexão ou a chave de API.';
            throw new Error(errorMessage);
        }
    }
};
