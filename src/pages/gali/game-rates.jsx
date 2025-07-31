import { Helmet } from 'react-helmet-async';

import { GameRatesView } from 'src/sections/gali/game-rates';

// ----------------------------------------------------------------------

export default function GameRatesPage() {
  return (
    <>
      <Helmet>
        <title> Game Rates | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <GameRatesView />
    </>
  );
}
