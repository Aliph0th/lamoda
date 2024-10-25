import { FilterRequest, ProductMetadata, ProductResponse } from 'common';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API } from './api';
import Filter from './components/filtration/Filter';
import ProductList from './components/products/ProductList';
import Loader from './components/ui/Loader';

function App() {
   const [searchParams, setSearchParams] = useSearchParams();
   const [loading, setLoading] = useState<boolean>(false);
   const [products, setProducts] = useState<ProductResponse>();
   const [metadata, setMetadata] = useState<ProductMetadata>();

   useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
         const [productResponse, metadataResponse] = await Promise.all([
            API.get<ProductResponse>('/products', {
               params: searchParams
            }),
            API.get<ProductMetadata>('/products/metadata')
         ]);
         setProducts(productResponse.data);
         setMetadata(metadataResponse.data);
      };
      fetchData().finally(() => setLoading(false));
   }, [searchParams]);

   const handleParamsChange = (filters: FilterRequest) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(filters).forEach(([key, value]) => {
         params.set(key, value);
      });
      setSearchParams(params);
   };

   return (
      <main className="m-auto py-8 w-10/12">
         <h1 className="font-bold text-4xl">Lamoda</h1>
         <div className="mt-4 grid grid-cols-[2fr_5fr] gap-x-10">
            <Filter
               loading={loading || !products}
               totalProducts={products?.totalProducts}
               priceLimits={metadata?.priceRange}
               availableColors={metadata?.availableColors}
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
