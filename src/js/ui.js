// src/js/ui.js

import { DOM } from './dom.js';

export const UI = {
    setLoadingState(isLoading) {
        if (isLoading) {
            DOM.buttonText.classList.add('hidden');
            DOM.buttonLoading.classList.remove('hidden');
            DOM.sendButton.disabled = true;
        } else {
            DOM.buttonText.classList.remove('hidden');
            DOM.buttonLoading.classList.add('hidden');
            DOM.sendButton.disabled = false;
        }
    },

    displayResponse(prompt, text) {
        DOM.responseSection.classList.remove('hidden');
        DOM.userPrompt.textContent = prompt;
        DOM.responseContent.textContent = text;
    },

    displayError(message) {
        this.displayResponse("Ocorreu um erro", message);
    },

    clearAll() {
        DOM.promptInput.value = '';
        DOM.responseSection.classList.add('hidden');
        DOM.userPrompt.textContent = '';
        DOM.responseContent.textContent = '';
    },

    showCopyFeedback() {
        DOM.copyButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        DOM.copyButton.classList.add('copied');

        setTimeout(() => {
            DOM.copyButton.innerHTML = '<i class="fa-solid fa-copy"></i>';
            DOM.copyButton.classList.remove('copied');
        }, 2000);
    }
};