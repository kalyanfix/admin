import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
