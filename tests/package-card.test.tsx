import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PackagesPage from "@/app/packages/page";

describe("packages page", () => {
  it("renders package boundary language from database", async () => {
    render(await PackagesPage());
    expect(screen.getByText("先锁定边界，再启动交付")).toBeInTheDocument();
  });
});
