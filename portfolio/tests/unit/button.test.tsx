import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders button text", () => {
    const html = renderToStaticMarkup(<Button>Click me</Button>);

    expect(html).toContain("Click me");
    expect(html).toContain("button");
  });
});
