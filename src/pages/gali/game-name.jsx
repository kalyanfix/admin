import { Helmet } from 'react-helmet-async';

import { GaliGameNameView } from 'src/sections/gali/game-name/view';

// ----------------------------------------------------------------------

export default function StarlineGameNamePage() {
  return (
    <>
      <Helmet>
        <title> Gali-Di-Sawar Game Name | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <GaliGameNameView />
    </>
  );
}
