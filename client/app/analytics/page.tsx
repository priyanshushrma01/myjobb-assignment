'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

type Product = {
  price: number;
  category: string;
  rating: number;
};

const COLORS = [
  "#6366f1", "#f59e42", "#10b981", "#f43f5e", "#a21caf", "#fbbf24", "#3b82f6", "#ef4444"
];

export default function AnalyticsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      });
  }, [authChecked]);

  if (!authChecked || loading) return <div>Loading...</div>;

  // Category breakdown for PieChart
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  // Price distribution for BarChart (bucketed)
  const priceBuckets = [0, 100, 200, 300, 400, 500, 1000];
  const priceData = priceBuckets.map((min, i) => {
    const max = priceBuckets[i + 1] ?? Infinity;
    const label = max === Infinity ? `${min}+` : `${min}-${max - 1}`;
    const count = products.filter(p => p.price >= min && p.price < max).length;
    return { range: label, count };
  });

  // Average rating
  const avgRating = (
    products.reduce((sum, p) => sum + p.rating, 0) / products.length
  ).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Category Distribution Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Price Distribution Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Price Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow mt-8">
        <h3 className="font-semibold mb-2">Average Rating</h3>
        <p className="text-2xl">{avgRating}</p>
      </div>
    </div>
  );
}
