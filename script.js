const products = [
  {
    id: 1,
    name: "RL Script 1 week",
    price: 5,
    description: "1 week access to our premium RL Script"
  },
  {
    id: 2,
    name: "RL Script 1 month",
    price: 10,
    description: "1 month access to our premium RL Script"
  }
];

// Modal elements
const modal = document.getElementById('paymentModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const closeButton = document.querySelector('.close-button');
const copyButton = document.querySelector('.copy-button');
const walletAddress = document.querySelector('.wallet-address');

// Add click event listeners to buy buttons
document.querySelectorAll('.buy-button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const productCard = button.closest('.product-card');
    const productId = parseInt(productCard.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (product) {
      modalTitle.textContent = product.name;
      modalPrice.textContent = `Price: $${product.price}`;
      modal.classList.add('active');
    }
  });
});

// Copy wallet address
copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(walletAddress.textContent.trim())
    .then(() => {
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy Address';
      }, 2000);
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