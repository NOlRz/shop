import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "RL Script 1 week",
      price: 5,
      image: "https://images.unsplash.com/photo-1614285457768-646f65ca8548?auto=format&fit=crop&q=80&w=800",
      description: "1 week access to our premium RL Script"
    },
    {
      id: 2,
      name: "RL Script 1 month",
      price: 10,
      image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&q=80&w=800",
      description: "1 month access to our premium RL Script"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Premium RL Scripts
        </h1>
        <p className="mt-2 text-gray-400">Elevate your game with our premium scripts</p>
      </header>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-400 mt-2">{product.description}</p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-purple-400">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
            <p className="text-gray-400 mb-6">Price: ${selectedProduct.price}</p>
            
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-400 mb-2">Send payment to:</p>
              <p className="font-mono text-sm break-all select-all">
                0x742d35Cc6634C0532925a3b844Bc454e4438f44e
              </p>
            </div>
            
            <p className="text-center text-sm text-gray-400">
              send the proof to the excomungado discord
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;