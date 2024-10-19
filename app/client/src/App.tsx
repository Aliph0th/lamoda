import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Loader from './components/ui/Loader';
import { API } from './api';
import { MetadataResponse, ProductResponse } from 'common';
import ProductList from './components/products/ProductList';

function App() {
   const [loading, setLoading] = useState<boolean>(false);
   const [products, setProducts] = useState<ProductResponse>();
   const [priceLimits, setPriceLimits] = useState<MetadataResponse['priceLimits']>([-1, -1]);

   useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
         const [productResponse, metadataResponse] = await Promise.all([
            API.get<ProductResponse>('/product', {
               params: new URLSearchParams(window.location.search)
            }),
            API.get<MetadataResponse>('/metadata')
         ]);
         setProducts(productResponse.data);
         setPriceLimits(metadataResponse.data.priceLimits);
      };
      fetchData().finally(() => setLoading(false));
   }, []);

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
