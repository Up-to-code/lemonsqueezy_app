import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = "https://api.lemonsqueezy.com/v1/products";

export async function GET() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // If response is wrapped in a 'data' key, extract it
    const products = response.data.data.map((product: any) => ({
      id: product.id,
      name: product.attributes.name,
      description: product.attributes.description,
      price: product.attributes.price_formatted,
      buyNowUrl: product.attributes.buy_now_url,
      status: product.attributes.status_formatted,
      thumbUrl: product.attributes.thumb_url,
    }));

    return NextResponse.json(products); // Return only the product data
  } catch (error: any) {
    console.error("Error fetching products", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
