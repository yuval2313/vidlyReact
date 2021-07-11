import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  //   Sentry.init({
  //     dsn: "https://583772c1f09347ef881c2aae0e4a9249@o914583.ingest.sentry.io/5854060",
  //     integrations: [new Integrations.BrowserTracing()],
  //     // Set tracesSampleRate to 1.0 to capture 100%
  //     // of transactions for performance monitoring.
  //     // We recommend adjusting this value in production
  //     tracesSampleRate: 1.0,
  //   });
}

function log(error) {
  //   Sentry.captureException(error); // decided not use sentry yet
  console.error(error); // logging on console instead of using sentry
}

const logger = {
  init,
  log,
};

export default logger;
