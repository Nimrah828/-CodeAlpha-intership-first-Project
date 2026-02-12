 // Gallery Data
        const galleryData = [
            { id: 1, title: "Mountain Sunrise", category: "nature", seed: "mountain1" },
            { id: 2, title: "City Lights", category: "city", seed: "city1" },
            { id: 3, title: "Portrait Study", category: "people", seed: "portrait1" },
            { id: 4, title: "Wildlife Safari", category: "animals", seed: "animal1" },
            { id: 5, title: "Ocean Waves", category: "nature", seed: "ocean1" },
            { id: 6, title: "Urban Architecture", category: "city", seed: "building1" },
            { id: 7, title: "Street Photography", category: "people", seed: "street1" },
            { id: 8, title: "Bird in Flight", category: "animals", seed: "bird1" },
            { id: 9, title: "Forest Path", category: "nature", seed: "forest1" },
            { id: 10, title: "Night Skyline", category: "city", seed: "skyline1" },
            { id: 11, title: "Candid Moment", category: "people", seed: "candid1" },
            { id: 12, title: "Pet Portrait", category: "animals", seed: "pet1" },
            { id: 13, title: "Desert Landscape", category: "nature", seed: "desert1" },
            { id: 14, title: "Metro Station", category: "city", seed: "metro1" },
            { id: 15, title: "Group Photo", category: "people", seed: "group1" },
            { id: 16, title: "Butterfly Garden", category: "animals", seed: "butterfly1" },
            { id: 17, title: "Waterfall", category: "nature", seed: "waterfall1" },
            { id: 18, title: "Street Art", category: "city", seed: "streetart1" },
            { id: 19, title: "Festival Crowd", category: "people", seed: "festival1" },
            { id: 20, title: "Cat Nap", category: "animals", seed: "cat1" },
            { id: 21, title: "Sunset Beach", category: "nature", seed: "beach1" },
            { id: 22, title: "Bridge View", category: "city", seed: "bridge1" },
            { id: 23, title: "Wedding Day", category: "people", seed: "wedding1" },
            { id: 24, title: "Horse Riding", category: "animals", seed: "horse1" }
        ];

        // State
        let currentFilter = 'all';
        let currentImageIndex = 0;
        let filteredImages = [...galleryData];
        let currentEffect = 'none';

        // DOM Elements
        const gallery = document.getElementById('gallery');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxCounter = document.getElementById('lightboxCounter');
        const searchInput = document.getElementById('searchInput');
        const noResults = document.getElementById('noResults');
        const filterToggle = document.getElementById('filterToggle');
        const filterMenu = document.getElementById('filterMenu');

        // Initialize Gallery
        function initGallery() {
            renderGallery();
            setupEventListeners();
        }

        // Render Gallery
        function renderGallery() {
            gallery.innerHTML = '';
            
            if (filteredImages.length === 0) {
                gallery.style.display = 'none';
                noResults.style.display = 'block';
                return;
            }
            
            gallery.style.display = 'grid';
            noResults.style.display = 'none';
            
            filteredImages.forEach((item, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.dataset.category = item.category;
                galleryItem.dataset.index = index;
                
                const imageUrl = `https://picsum.photos/seed/${item.seed}/400/300.jpg`;
                
                galleryItem.innerHTML = `
                    <img src="${imageUrl}" alt="${item.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <div class="gallery-title">${item.title}</div>
                        <span class="gallery-category">${item.category}</span>
                    </div>
                `;
                
                galleryItem.addEventListener('click', () => openLightbox(index));
                gallery.appendChild(galleryItem);
            });
        }

        // Filter Gallery
        function filterGallery(category) {
            currentFilter = category;
            
            if (category === 'all') {
                filteredImages = galleryData.filter(item => 
                    item.title.toLowerCase().includes(searchInput.value.toLowerCase())
                );
            } else {
                filteredImages = galleryData.filter(item => 
                    item.category === category &&
                    item.title.toLowerCase().includes(searchInput.value.toLowerCase())
                );
            }
            
            renderGallery();
            updateFilterButtons();
        }

        // Update Filter Buttons
        function updateFilterButtons() {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.filter === currentFilter) {
                    btn.classList.add('active');
                }
            });
        }

        // Search Functionality
        function searchImages(query) {
            const searchTerm = query.toLowerCase();
            
            if (currentFilter === 'all') {
                filteredImages = galleryData.filter(item => 
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.category.toLowerCase().includes(searchTerm)
                );
            } else {
                filteredImages = galleryData.filter(item => 
                    item.category === currentFilter &&
                    (item.title.toLowerCase().includes(searchTerm) ||
                     item.category.toLowerCase().includes(searchTerm))
                );
            }
            
            renderGallery();
        }

        // Lightbox Functions
        function openLightbox(index) {
            currentImageIndex = index;
            const item = filteredImages[index];
            
            lightboxImage.src = `https://picsum.photos/seed/${item.seed}/1200/800.jpg`;
            lightboxTitle.textContent = item.title;
            lightboxCounter.textContent = `${index + 1} / ${filteredImages.length}`;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function navigateLightbox(direction) {
            if (direction === 'next') {
                currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
            } else {
                currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
            }
            
            const item = filteredImages[currentImageIndex];
            lightboxImage.style.opacity = '0';
            
            setTimeout(() => {
                lightboxImage.src = `https://picsum.photos/seed/${item.seed}/1200/800.jpg`;
                lightboxTitle.textContent = item.title;
                lightboxCounter.textContent = `${currentImageIndex + 1} / ${filteredImages.length}`;
                lightboxImage.style.opacity = '1';
            }, 200);
        }

        // Image Effects
        function applyImageEffect(effect) {
            currentEffect = effect;
            const images = document.querySelectorAll('.gallery-item img, #lightboxImage');
            
            images.forEach(img => {
                img.className = '';
                if (effect !== 'none') {
                    img.classList.add(`filter-${effect}`);
                }
            });
            
            // Update effect buttons
            document.querySelectorAll('.filter-option').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.effect === effect) {
                    btn.classList.add('active');
                }
            });
        }

        // Setup Event Listeners
        function setupEventListeners() {
            // Filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    filterGallery(btn.dataset.filter);
                });
            });
            
            // Search input
            searchInput.addEventListener('input', (e) => {
                searchImages(e.target.value);
            });
            
            // Lightbox controls
            document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
            document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox('prev'));
            document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox('next'));
            
            // Close lightbox on background click
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('active')) return;
                
                switch(e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        navigateLightbox('prev');
                        break;
                    case 'ArrowRight':
                        navigateLightbox('next');
                        break;
                }
            });
            
            // Touch/Swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            lightbox.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            lightbox.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                if (touchEndX < touchStartX - 50) navigateLightbox('next');
                if (touchEndX > touchStartX + 50) navigateLightbox('prev');
            }
            
            // Filter toggle
            filterToggle.addEventListener('click', () => {
                filterMenu.classList.toggle('active');
            });
            
            // Image effect buttons
            document.querySelectorAll('.filter-option').forEach(btn => {
                btn.addEventListener('click', () => {
                    applyImageEffect(btn.dataset.effect);
                });
            });
            
            // Close filter menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!filterToggle.contains(e.target) && !filterMenu.contains(e.target)) {
                    filterMenu.classList.remove('active');
                }
            });
        }

        // Initialize on load
        document.addEventListener('DOMContentLoaded', initGallery);
