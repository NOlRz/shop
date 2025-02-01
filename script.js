const products = [
  {
    id: 1,
    name: "RL Script 1 week",
    price: 5,
    description: "1 week access to our premium RL Script",
    stock: 6
  },
  {
    id: 2,
    name: "RL Script 1 month",
    price: 10,
    description: "1 month access to our premium RL Script",
    stock: 1
  }
];

const wallets = {
  bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  litecoin: "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
};

// Modal elements
const modal = document.getElementById('paymentModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const closeButton = document.querySelector('.close-button');
const copyButtons = document.querySelectorAll('.copy-button');
const cryptoTabs = document.querySelectorAll('.crypto-tab');
const walletAddresses = document.querySelectorAll('.wallet-address');

// Update stock displays
function updateStockDisplays() {
  document.querySelectorAll('.product-card').forEach(card => {
    const productId = parseInt(card.dataset.id);
    const product = products.find(p => p.id === productId);
    const stockDisplay = card.querySelector('.stock-display');
    
    if (product && stockDisplay) {
      stockDisplay.textContent = `${product.stock} licenses available`;
      stockDisplay.className = `stock-display ${product.stock <= 3 ? 'low-stock' : ''}`;
      
      // Update buy button state
      const buyButton = card.querySelector('.buy-button');
      if (product.stock === 0) {
        buyButton.disabled = true;
        buyButton.textContent = 'Out of Stock';
        buyButton.classList.add('disabled');
      } else {
        buyButton.disabled = false;
        buyButton.textContent = 'Purchase Now';
        buyButton.classList.remove('disabled');
      }
    }
  });
}

// Switch between crypto options
cryptoTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const crypto = tab.dataset.crypto;
    
    // Update active tab
    cryptoTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Update visible wallet address
    walletAddresses.forEach(addr => {
      addr.classList.remove('active');
      if (addr.dataset.crypto === crypto) {
        addr.classList.add('active');
      }
    });
  });
});

// Add click event listeners to buy buttons
document.querySelectorAll('.buy-button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const productCard = button.closest('.product-card');
    const productId = parseInt(productCard.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (product && product.stock > 0) {
      modalTitle.textContent = product.name;
      modalPrice.textContent = `Price: $${product.price}`;
      modal.classList.add('active');
      
      // Show Bitcoin tab by default
      document.querySelector('.crypto-tab[data-crypto="bitcoin"]').click();
    }
  });
});

// Copy wallet address
copyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const walletAddress = button.previousElementSibling;
    navigator.clipboard.writeText(walletAddress.textContent.trim())
      .then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy Address';
        }, 2000);
      });
  });
});

// Close modal when clicking the close button
closeButton.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Prevent modal close when clicking inside modal content
document.querySelector('.modal-content').addEventListener('click', (e) => {
  e.stopPropagation();
});

// Add hover effect to product cards
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Initialize stock displays
updateStockDisplays();
