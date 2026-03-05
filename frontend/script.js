document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const birthDateInput = document.getElementById('birth-date');
    const resultSection = document.getElementById('result-section');
    const errorSection = document.getElementById('error-section');
    const errorMessage = document.getElementById('error-message');

    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodExplanation = document.getElementById('apod-explanation');
    const mediaContainer = document.getElementById('media-container');

    // Set max date to today to prevent future searches
    const today = new Date().toISOString().split('T')[0];
    birthDateInput.setAttribute('max', today);

    searchBtn.addEventListener('click', async () => {
        const date = birthDateInput.value;
        if (!date) {
            showError('Por favor, selecione uma data.');
            return;
        }

        prepareUIForLoading();

        try {
            const response = await fetch(`http://localhost:5000/api/apod?date=${date}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao buscar dados da NASA.');
            }

            displayResult(data);
        } catch (error) {
            showError(error.message);
        }
    });

    function prepareUIForLoading() {
        resultSection.classList.remove('hidden');
        errorSection.classList.add('hidden');
        mediaContainer.innerHTML = '<div class="loader"></div>';
        apodTitle.textContent = 'Buscando no espaço...';
        apodDate.textContent = '';
        apodExplanation.textContent = '';

        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    function displayResult(data) {
        mediaContainer.innerHTML = '';

        if (data.media_type === 'image') {
            const img = document.createElement('img');
            img.src = data.url;
            img.alt = data.title;
            mediaContainer.appendChild(img);
        } else if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            mediaContainer.appendChild(iframe);
        }

        apodTitle.textContent = data.title;
        apodDate.textContent = formatDate(data.date);
        apodExplanation.textContent = data.explanation;
    }

    function showError(message) {
        resultSection.classList.add('hidden');
        errorSection.classList.remove('hidden');
        errorMessage.textContent = message;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }
});
