import { ProductResponse } from 'common';
import { useEffect, useMemo, useState } from 'react';
import { API } from './api';
import Filter from './components/Filter';
import ProductList from './components/products/ProductList';
import Loader from './components/ui/Loader';

function App() {
   const [loading, setLoading] = useState<boolean>(false);
   const [products, setProducts] = useState<ProductResponse>();

   useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
         const { data } = await API.get<ProductResponse>('/product', {
            params: new URLSearchParams(window.location.search)
         });
         setProducts(data);
      };
      fetchData().finally(() => setLoading(false));
   }, []);

   const priceLimits: [number, number] = useMemo(() => {
      if (!products) return [-1, -1];
      const sortedProducts = products.products.toSorted((a, b) => a.price - b.price);
      const min = sortedProducts[0]?.price || -1;
      return [min, sortedProducts.at(-1)?.price || min];
   }, [products]);

   return (
      <main className="m-auto py-8 w-10/12">
         <h1 className="font-bold text-4xl">Lamoda</h1>
         <div className="mt-4 grid grid-cols-[2fr_5fr] gap-x-10">
            <Filter loading={loading || !products} totalProducts={products?.totalProducts} priceLimits={priceLimits} />
            {loading || !products ? <Loader /> : <ProductList productsData={products} />}
         </div>
      </main>
   );
}

export default App;
