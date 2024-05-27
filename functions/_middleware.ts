import sentryPlugin from "@cloudflare/pages-plugin-sentry";
import { PagesFunction } from '@cloudflare/workers-types'

export const onRequest: PagesFunction = sentryPlugin({
  dsn: "https://e3c9401dfca4e1d3843648447aa667b4@o4507329699577856.ingest.de.sentry.io/4507329703051344",
});
