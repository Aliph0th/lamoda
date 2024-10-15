import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Loader from './components/ui/Loader';
import { API } from './api';

function App() {
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      setLoading(true);
      const fetchProducts = async () => {
         await API.get('/product');
      };
      fetchProducts().finally(() => setLoading(false));
   }, []);

   return (
      <main className="m-auto py-8 w-10/12">
         <h1 className="font-bold text-4xl">Lamoda</h1>
         <div className="mt-4 grid grid-cols-[2fr_5fr]">
            <Filter />
            {loading ? <Loader /> : <>data</>}
         </div>
      </main>
   );
}

export default App;
