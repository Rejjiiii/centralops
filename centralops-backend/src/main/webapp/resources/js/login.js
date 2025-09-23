// Handle image upload and preview
const imageUpload = document.getElementById('imageUpload');
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');

if (imageUpload && fileInput) {
    imageUpload.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.src = event.target.result;
                imagePreviewContainer.classList.remove('hidden');
                imageUpload.classList.add('hidden');
                
                // Add animation to the preview
                imagePreview.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    imagePreview.style.transform = 'scale(1)';
                    imagePreview.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }, 50);
            };
            reader.readAsDataURL(file);
        }
    });

    // Allow drag and drop
    imageUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUpload.classList.add('border-white/50', 'bg-white/10');
    });

    imageUpload.addEventListener('dragleave', () => {
        imageUpload.classList.remove('border-white/50', 'bg-white/10');
    });

    imageUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUpload.classList.remove('border-white/50', 'bg-white/10');
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }
    });
}
