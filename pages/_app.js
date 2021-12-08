import { PeopleProvider } from "../context/PeopleProvider";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

function MyApp({ Component, pageProps }) {
  config.autoAddCss = false; /* eslint-disable import/first */
  return (
    <PeopleProvider>
      <Component {...pageProps} />
    </PeopleProvider>
  );
}

export default MyApp;
