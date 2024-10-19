import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Loader from './components/ui/Loader';
import { API } from './api';
import { Product, ProductResponse } from 'common';
import ProductList from './components/products/ProductList';

function App() {
   const [loading, setLoading] = useState<boolean>(false);
   const [products, setProducts] = useState<Product[]>([]);
   const [totalProducts, setTotalProducts] = useState<number>(0);

   useEffect(() => {
      setLoading(true);
      const fetchProducts = async () => {
         const { data } = await API.get<ProductResponse>('/product', {
            params: new URLSearchParams(window.location.search)
         });
         setProducts(data.products);
         setTotalProducts(data.totalProducts);
      };
      fetchProducts().finally(() => setLoading(false));
   }, []);

   return (
      <main className="m-auto py-8 w-10/12">
         <h1 className="font-bold text-4xl">Lamoda</h1>
         <div className="mt-4 grid grid-cols-[2fr_5fr] gap-x-10">
            <Filter totalProducts={totalProducts} />
            {loading ? <Loader /> : <ProductList products={products} />}
         </div>
      </main>
   );
}

export default App;
