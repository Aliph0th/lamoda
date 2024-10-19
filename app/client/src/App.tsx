import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Loader from './components/ui/Loader';
import { API } from './api';
import { MetadataResponse, Product, ProductResponse } from 'common';
import ProductList from './components/products/ProductList';

function App() {
   const [loading, setLoading] = useState<boolean>(false);
   const [products, setProducts] = useState<Product[]>([]);
   const [totalProducts, setTotalProducts] = useState<number>(0);
   const [priceLimits, setPriceLimits] = useState<MetadataResponse['priceLimits']>([-1, -1]);

   useEffect(() => {
      setLoading(true);
      const fetchProducts = async () => {
         const [productResponse, metadataResponse] = await Promise.all([
            API.get<ProductResponse>('/product', {
               params: new URLSearchParams(window.location.search)
            }),
            API.get<MetadataResponse>('/metadata')
         ]);
         setProducts(productResponse.data.products);
         setTotalProducts(productResponse.data.totalProducts);
         setPriceLimits(metadataResponse.data.priceLimits);
      };
      fetchProducts().finally(() => setLoading(false));
   }, []);

   return (
      <main className="m-auto py-8 w-10/12">
         <h1 className="font-bold text-4xl">Lamoda</h1>
         <div className="mt-4 grid grid-cols-[2fr_5fr] gap-x-10">
            <Filter loading={loading} totalProducts={totalProducts} priceLimits={priceLimits} />
            {loading ? <Loader /> : <ProductList products={products} />}
         </div>
      </main>
   );
}

export default App;
