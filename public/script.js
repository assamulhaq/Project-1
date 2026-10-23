// Navigation Elements
const homeView = document.getElementById('homeView');
const scannerView = document.getElementById('scannerView');
const startScanBtn = document.getElementById('startScanBtn');
const backHomeBtn = document.getElementById('backHomeBtn');

// View Switching
startScanBtn.addEventListener('click', () => {
    homeView.classList.add('hidden');
    scannerView.classList.remove('hidden');
});

backHomeBtn.addEventListener('click', () => {
    scannerView.classList.add('hidden');
    homeView.classList.remove('hidden');
});

// Professional Report Formatting Function
function renderFormattedAIOutput(text) {
    let cleanText = text
        // Clean up markdown divider lines
        .replace(/--+/g, '')
        // Convert headers (### or ##) into styled professional section headers
        .replace(/^###\s*(.*$)/gim, '<div class="report-section"><h3>$1</h3>')
        .replace(/^##\s*(.*$)/gim, '<div class="report-section"><h2>$1</h2>')
        // Convert **bold** text into strong tags
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        // Strip out rogue asterisks or hash symbols
        .replace(/[\#\*]/g, '')
        // Convert bullet points into clean list items
        .replace(/^[\-\•]\s*(.*$)/gim, '<li>$1</li>');

    // Wrap adjacent list items in <ul>
    cleanText = cleanText.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');

    // Close section divs neatly
    cleanText = cleanText.split('\n\n').map(block => {
        block = block.trim();
        if (!block) return '';
        if (block.startsWith('<div class="report-section">')) {
            return block + '</div>';
        }
        return `<p>${block}</p>`;
    }).join('');

    return cleanText;
}

// Form Submission Handler
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const imageInput = document.getElementById('cropImage');
    const cropType = document.getElementById('cropType').value;
    const symptoms = document.getElementById('symptoms').value;

    if (imageInput.files.length === 0) {
        alert('Please select an image first.');
        return;
    }

    const formData = new FormData();
    formData.append('cropImage', imageInput.files[0]);
    formData.append('cropType', cropType);
    formData.append('symptoms', symptoms);

    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const resultContainer = document.getElementById('resultContainer');
    const resultContent = document.getElementById('resultContent');

    submitBtn.disabled = true;
    loading.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    resultContent.innerHTML = '';

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            resultContent.innerHTML = renderFormattedAIOutput(data.analysis);
            resultContainer.classList.remove('hidden');
        } else {
            alert(data.error || 'Something went wrong.');
        }
    } catch (err) {
        console.error(err);
        alert('Failed to connect to the server.');
    } finally {
        submitBtn.disabled = false;
        loading.classList.add('hidden');
    }
});