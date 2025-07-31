import { Helmet } from 'react-helmet-async';

import { SliderView } from 'src/sections/slider/view';

// ----------------------------------------------------------------------

export default function UserQueryPage() {
  return (
    <>
      <Helmet>
        <title> Notice | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <SliderView />
    </>
  );
}
