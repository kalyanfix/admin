import { Helmet } from 'react-helmet-async';

import { AppSettingsView } from 'src/sections/app-settings';

// ----------------------------------------------------------------------

export default function AppSettingsPage() {
  return (
    <>
      <Helmet>
        <title> App Settings | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <AppSettingsView />
    </>
  );
}
