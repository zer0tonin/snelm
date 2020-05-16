import { RequestResponseInterface } from "../../frameworks/interface.ts";

interface DnsPrefetchControlOptions {
  allow?: boolean;
}

function getHeaderValueFromOptions(options?: DnsPrefetchControlOptions): 'on' | 'off' {
  if (options && options.allow) {
    return 'on';
  } else {
    return 'off';
  }
}

export default function dnsPrefetchControl (requestResponse: RequestResponseInterface, options?: DnsPrefetchControlOptions) {
  const headerValue = getHeaderValueFromOptions(options);

  requestResponse.setResponseHeader('X-DNS-Prefetch-Control', headerValue);
}
