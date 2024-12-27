const API_URL = 'http://localhost:3000/api';

const appState = {
    isLoading: false,
    error: null,
    success: null,
};

const stateContainer = document.getElementById('appState');
const errorContainer = document.getElementById('errorContainer');
const fileList = document.getElementById('fileList');

function updateAppState() {
    if (appState.isLoading) {
        stateContainer.innerHTML = '⏳ Loading... Please wait.';
        stateContainer.className = 'app-state loading';
    } else if (appState.error) {
        stateContainer.innerHTML = '';
        errorContainer.innerHTML = `❌ ${appState.error}`;
        errorContainer.style.display = 'block';
    } else if (appState.success) {
        stateContainer.innerHTML = `✅ ${appState.success}`;
        stateContainer.className = 'app-state success';
        errorContainer.style.display = 'none';
    } else {
        stateContainer.innerHTML = '';
        errorContainer.style.display = 'none';
    }
}

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        appState.error = 'Please select a file to upload.';
        updateAppState();
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        appState.isLoading = true;
        appState.error = null;
        appState.success = null;
        updateAppState();

        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error('Failed to upload file. Please try again.');
        }

        appState.success = 'File uploaded successfully!';
        fileInput.value = '';
        fetchFiles();
    } catch (error) {
        appState.error = error.message;
    } finally {
        appState.isLoading = false;
        updateAppState();
    }
}

async function fetchFiles() {
    try {
        appState.isLoading = true;
        appState.error = null;
        appState.success = null;
        updateAppState();

        const res = await fetch(`${API_URL}/files`);
        if (!res.ok) {
            throw new Error('Failed to fetch files. Please try again.');
        }

        const files = await res.json();
        console.log(files); // Debugging: Verify file URLs

        fileList.innerHTML = '';

        files.forEach(file => {
            fileList.innerHTML += `
                <li>
                    <strong>${file.filename}</strong>
                    <a href="${API_URL}/download/${file._id}" download="${file.filename}">
                        Download
                    </a>
                </li>`;
        });

        appState.success = 'Files loaded successfully!';
    } catch (error) {
        console.error('Error fetching files:', error);
        appState.error = error.message || 'An unknown error occurred.';
    } finally {
        appState.isLoading = false;
        updateAppState();
    }
}

fetchFiles();
