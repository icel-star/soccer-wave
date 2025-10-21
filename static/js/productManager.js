// static/js/productManager.js

// State Management Functions
function showLoadingState() {
    console.log('Showing loading state');
    document.getElementById('loadingState').classList.remove('hidden');
    document.getElementById('errorState').classList.add('hidden');
    document.getElementById('emptyState').classList.add('hidden');
    document.getElementById('productGrid').classList.add('hidden');
}

function showErrorState(message) {
    console.log('Showing error state:', message);
    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('errorState').classList.remove('hidden');
    document.getElementById('emptyState').classList.add('hidden');
    document.getElementById('productGrid').classList.add('hidden');
    if (message) {
        document.getElementById('errorMessage').textContent = message;
    }
}

function showEmptyState() {
    console.log('Showing empty state');
    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('errorState').classList.add('hidden');
    document.getElementById('emptyState').classList.remove('hidden');
    document.getElementById('productGrid').classList.add('hidden');
}

function showProductGrid() {
    console.log('Showing product grid');
    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('errorState').classList.add('hidden');
    document.getElementById('emptyState').classList.add('hidden');
    document.getElementById('productGrid').classList.remove('hidden');
}

// Product Management Functions
function loadProducts() {
    console.log('Loading products...');
    showLoadingState();

    // Determine the current filter
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter') || 'all';

    let url = '/get-product/';
    if (filter === 'my') {
        url = '/get-product/?filter=my';
    }

    console.log('Fetching from URL:', url);

    fetch(url)
        .then(response => {
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Raw API response:', data);
            console.log('Response type:', typeof data);
            console.log('Is array?', Array.isArray(data));
            
            if (data && typeof data === 'object') {
                console.log('Response keys:', Object.keys(data));
            }
            
            renderProducts(data);
        })
        .catch(error => {
            console.error('Error loading products:', error);
            showErrorState('Failed to load products. Please check your connection and try again.');
        });
}

function renderProducts(products) {
    console.log('Rendering products:', products);
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) {
        console.error('Product grid element not found!');
        showErrorState('Product grid container not found');
        return;
    }

    productGrid.innerHTML = '';

    // Handle different response formats
    let productsArray = [];

    if (Array.isArray(products)) {
        productsArray = products;
    } else if (products && typeof products === 'object') {
        // Handle object response (might be {products: [], count: X})
        if (Array.isArray(products.products)) {
            productsArray = products.products;
        } else if (Array.isArray(products.data)) {
            productsArray = products.data;
        } else if (Array.isArray(products.items)) {
            productsArray = products.items;
        } else {
            // Convert object to array if it's {1: {...}, 2: {...}}
            productsArray = Object.values(products);
        }
    }

    console.log('Processed products array:', productsArray);

    if (!productsArray || productsArray.length === 0) {
        console.log('No products found, showing empty state');
        showEmptyState();
        return;
    }

    console.log(`Rendering ${products.length} products`);
    
    products.forEach(product => {
        try {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        } catch (error) {
            console.error('Error creating product card:', error, product);
        }
    });

    showProductGrid();
}

function createProductCard(productData) {
    console.log('Creating product card for:', productData);
    
    let product, productId;
    
    if (productData.fields && productData.pk) {
        product = productData.fields;
        productId = productData.pk;
    } else if (productData.id) {
        product = productData;
        productId = productData.id;
    } else {
        product = productData;
        productId = productData.pk || productData.id || Math.random();
    }

    let productUserId;
    if (product.user) {
        if (typeof product.user === 'object') {
            productUserId = product.user.id || product.user.pk || product.user.toString();
        } else {
            productUserId = product.user.toString();
        }
    } else {
        productUserId = null;
    }

    // Get user info from Django template
    const currentUserId = window.currentUserId;
    const isOwner = currentUserId && currentUserId !== 'None' && currentUserId.toString() === productUserId.toString();
    
    console.log('Product details:', { productId, product, currentUserId, isOwner });

    const card = document.createElement('article');
    card.className = 'bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden product-card';
    card.id = `product-${productId}`;

    card.innerHTML = `
        <div class="aspect-[4/3] relative overflow-hidden bg-gray-100">
            ${product.thumbnail ? 
                `<img src="${product.thumbnail}" alt="${product.name}" 
                      class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` :
                ''
            }
            <div class="w-full h-full ${product.thumbnail ? 'hidden' : 'flex'} items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
                <i class="fas fa-shopping-bag text-4xl opacity-50"></i>
            </div>
            
            <!-- Category Badge -->
            <div class="absolute top-3 left-3">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-400 text-white shadow-lg">
                    ${getCategoryDisplay(product.category)}
                </span>
            </div>
            
            <!-- Status Badges -->
            <div class="absolute top-3 right-3 flex flex-col space-y-1">
                ${product.is_featured ? 
                    '<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 shadow-sm"><i class="fas fa-star mr-1"></i> Featured</span>' : ''
                }
                ${product.product_views > 20 ? 
                    '<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 shadow-sm"><i class="fas fa-fire mr-1"></i> Hot</span>' : ''
                }
            </div>
        </div>
        
        <div class="p-6">
            <!-- Product Name -->
            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight hover:text-pink-500 transition-colors">
                <a href="/product/${productId}/" class="hover:no-underline">
                    ${product.name}
                </a>
            </h3>
            
            <!-- Price -->
            <div class="mb-4">
                <span class="text-2xl font-bold text-pink-500">
                    Rp${parseInt(product.price).toLocaleString('id-ID')}
                </span>
            </div>
            
            <!-- Rating and Stock -->
            <div class="flex items-center mb-4">
                <div class="flex items-center text-yellow-400 mr-2">
                    ${generateStarRating(product.rating || 0)}
                </div>
                <span class="text-yellow-700 font-semibold text-sm">${product.rating || '0.0'}</span>
                <span class="mx-2">•</span>
                <span class="text-gray-400 text-sm ml-1">${product.stock || 0} in stock</span>
            </div>
            
            <!-- Brand -->
            ${product.brand ? `
                <div class="flex items-center text-sm text-gray-600 mb-4">
                    <i class="fas fa-tag mr-2 text-gray-400"></i>
                    <span class="font-medium">${product.brand}</span>
                </div>
            ` : ''}
            
            <!-- Description Preview -->
            ${product.description ? `
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    ${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}
                </p>
            ` : ''}
            
            <!-- Action Buttons -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <a href="/product/${productId}/" 
                   class="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium text-sm transition-colors group">
                    Read more
                    <i class="fas fa-arrow-right ml-1 transform group-hover:translate-x-1 transition-transform"></i>
                </a>
                
                ${isOwner ? `
                    <div class="flex space-x-2">
                        <button onclick="event.stopPropagation(); showEditModal('${productId}')" 
                                class="text-blue-400 hover:text-blue-500 text-xs transition-colors px-2 py-1 rounded hover:bg-blue-50">
                            Edit
                        </button>
                        <button onclick="event.stopPropagation(); showDeleteModal('${productId}')" 
                                class="text-red-400 hover:text-red-500 text-xs transition-colors px-2 py-1 rounded hover:bg-red-50">
                            Delete
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    return card;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function getCategoryDisplay(category) {
    const categories = {
        'jersey': '<i class="fas fa-tshirt mr-1"></i> Jersey',
        'shoes': '<i class="fas fa-shoe-prints mr-1"></i> Shoes',
        'ball': '<i class="fas fa-basketball-ball mr-1"></i> Ball',
        'accessory': '<i class="fas fa-vest mr-1"></i> Accessory'
    };
    return categories[category] || `<i class="fas fa-tag mr-1"></i> ${category}`;
}

// Form submission
function setupFormHandler() {
    const form = document.getElementById('productForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            const formData = new FormData(this);
            const productId = document.getElementById('productId').value;

            const url = productId ? `/edit-ajax/${productId}/` : '/create-ajax/';
            console.log('Sending to URL:', url);

            const isFeaturedCheckbox = document.getElementById('is_featured');
            if (isFeaturedCheckbox.checked) {
                formData.set('is_featured', 'true');
            } else {
                formData.set('is_featured', 'false');
            }

            fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
                if (data.message) {
                    hideModal();
                    showToast(productId ? 'Product updated successfully!' : 'Product created successfully!', 'success');
                    loadProducts();
                } else {
                    showToast('Error: ' + (data.error || 'Unknown error'), 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('An error occurred. Please try again.', 'error');
            });
        });
    }
}

// Delete product function
function deleteProduct(productId) {
    console.log('Attempting to delete product:', productId);

    if (!productId) {
        showToast('Product ID is missing', 'error');
        return;
    }
    
    fetch(`/delete-ajax/${productId}/`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        console.log('Delete response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Delete response data:', data);
        if (data.message) {
            hideDeleteModal();
            // Remove product from DOM
            const productElement = document.getElementById(`product-${productId}`);
            if (productElement) {
                productElement.remove();
                showToast('Product deleted successfully!', 'success');
            }
            loadProducts();
        } else {
            showToast('Error: ' + (data.error || 'Unknown error'), 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('An error occurred. Please try again.', 'error');
    });
}

// Initialize product management
function initializeProductManager() {
    console.log('Initializing product manager...');
    
    // Setup event listeners
    const refreshButton = document.getElementById('refreshButton');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            loadProducts();
            showToast('Products refreshed!', 'success');
        });
    }
    
    setupFormHandler();
    
    // Load products initially
    loadProducts();
}

// Make functions globally available
window.loadProducts = loadProducts;
window.renderProducts = renderProducts;
window.createProductCard = createProductCard;
window.deleteProduct = deleteProduct;
window.initializeProductManager = initializeProductManager;