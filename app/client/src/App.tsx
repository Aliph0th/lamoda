import { ProductMetadata, ProductResponse } from 'common';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API } from './api';
import Filter from './components/filtration/Filter';
import ProductList from './components/products/ProductList';
import Loader from './components/ui/Loader';
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

   const handleParamsChange = useCallback(
      (filters: FilterParams) => {
         const params = new URLSearchParams(searchParams);
         Object.entries(filters).forEach(([key, value]) => {
            const param = value.toString();
            if (searchParams.has(key) && !param) {
               params.delete(key);
            } else if (param) {
               params.set(key, param);
            }
         });
         setSearchParams(params);
      },
      [searchParams, setSearchParams]
   );

   return (
      <main className="m-auto py-8 w-10/12">
         <h1 className="font-bold text-4xl">Lamoda</h1>
         <div className="mt-4 grid grid-cols-[2fr_5fr] gap-x-10">
            <Filter
               loading={loading}
               totalProducts={products.totalProducts}
               highestPrice={metadata.highestPrice}
               lowestPrice={metadata.lowestPrice}
               availableColors={metadata.availableColors}
               handleParamsChange={handleParamsChange}
            />
            {loading ? (
               <Loader />
            ) : (
               <ProductList
                  productsData={products}
                  availableSorts={metadata.availableSorts}
                  handleParamsChange={handleParamsChange}
               />
            )}
         </div>
      </main>
   );
}

export default App;
