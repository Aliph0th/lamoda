import { ProductMetadata, ProductResponse } from 'common';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API } from './api';
import Filter from './components/filtration/Filter';
import ProductList from './components/products/ProductList';
import { defaultMetadata, defaultProducts } from './constants';
import { FilterParams } from './types';

function App() {
   const [searchParams, setSearchParams] = useSearchParams();
   const [loading, setLoading] = useState<boolean>(false);
   const [products, setProducts] = useState<ProductResponse>(defaultProducts);
   const [metadata, setMetadata] = useState<ProductMetadata>(defaultMetadata);

   useEffect(() => {
      const fetchMetadata = async () => {
         const { data } = await API.get<ProductMetadata>('/products/metadata');
         setMetadata(data);
      };
      fetchMetadata();
   }, []);
   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const { data } = await API.get<ProductResponse>('/products', {
            params: searchParams
         });
         setProducts(data);
      };
      fetchData().finally(() => setLoading(false));
   }, [searchParams]);

   const handleParamsChange = useCallback((filters: FilterParams) => {
      const originalParams = new URLSearchParams(window.location.search);
      const newParams = new URLSearchParams(originalParams);
      Object.entries(filters).forEach(([key, value]) => {
         const param = value.toString();
         if (originalParams.has(key) && !param) {
            newParams.delete(key);
         } else if (param) {
            newParams.set(key, param);
         }
      });
      setSearchParams(newParams);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <main className="m-auto py-8 w-10/12">
         <h1 className="font-bold text-4xl">Lamoda</h1>
         <div className="mt-4 grid grid-cols-[2fr_5fr] gap-x-10">
            <Filter productsData={products} metadata={metadata} handleParamsChange={handleParamsChange} />
            <ProductList
               loading={loading}
               productsData={products}
               availableSorts={metadata.availableSorts}
               handleParamsChange={handleParamsChange}
            />
         </div>
      </main>
   );
}

export default App;
