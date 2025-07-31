import { Helmet } from 'react-helmet-async';

import { WinningView } from 'src/sections/winning/view';

// ----------------------------------------------------------------------

export default function WinningPage() {
  return (
    <>
      <Helmet>
        <title> Winning Prediction | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <WinningView />
    </>
  );
}
