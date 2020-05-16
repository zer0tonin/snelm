import { RequestResponseInterface } from "../../frameworks/interface.ts";

interface HidePoweredByOptions {
  setTo?: string;
}

export default function hidePoweredBy(requestResponse: RequestResponseInterface, options?: HidePoweredByOptions) {
  const { setTo = null } = options || {};

  if (setTo) {
    requestResponse.setResponseHeader('X-Powered-By', setTo);
  } else {
    requestResponse.removeResponseHeader('X-Powered-By');
  }
}
