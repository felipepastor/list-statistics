import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowLeftShort = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    fill="currentColor"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
  </svg>
);
export default SvgArrowLeftShort;
