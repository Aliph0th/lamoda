import { ProductMetadata, ProductResponse } from 'common';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API } from './api';
import Filter from './components/filtration/Filter';
import ProductList from './components/products/ProductList';
import Loader from './components/ui/Loader';
import { FilterParams } from './types';

function App() {
   const [searchParams, setSearchParams] = useSearchParams();
   const [loading, setLoading] = useState<boolean>(false);
   const [products, setProducts] = useState<ProductResponse>();
   const [metadata, setMetadata] = useState<ProductMetadata>();

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const productResponse = await API.get<ProductResponse>('/products', {
            params: searchParams
         });
         setProducts(productResponse.data);
         if (!metadata) {
            const { data } = await API.get<ProductMetadata>('/products/metadata');
            setMetadata(data);
         }
      };
      fetchData().finally(() => setLoading(false));
   }, [metadata, searchParams]);

   const handleParamsChange = useCallback(
      (filters: FilterParams) => {
         const params = new URLSearchParams(searchParams);
         Object.entries(filters).forEach(([key, value]) => {
            const param = value.toString();
            if (param) {
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
               loading={loading || !products}
               totalProducts={products?.totalProducts}
               highestPrice={metadata?.highestPrice}
               lowestPrice={metadata?.lowestPrice}
               availableColors={metadata?.availableColors}
               handleParamsChange={handleParamsChange}
            />
            {loading || !products || !metadata?.availableSorts ? (
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
