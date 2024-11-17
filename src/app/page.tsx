"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  buyNowUrl: string;
  status: string;
  thumbUrl: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]); // Ensure the state is an array
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        // Handle different response cases
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected an array but received:", data);
          setError("Failed to load products. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching products", error);
        setError("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            {/* {product.thumbUrl && (
              <img
                src={product.thumbUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
            )} */}
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600">{product.description || "No description available"}</p>
            <p className="text-lg font-bold mt-2">{product.price}</p>
            <p className="text-sm text-gray-500">Status: {product.status}</p>
            <a
              href={product.buyNowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-center text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
            >
              Pay Now
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
