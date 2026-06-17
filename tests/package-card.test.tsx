import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PackagesPage from "@/app/packages/page";

describe("packages page", () => {
  it("renders package boundary language from database", async () => {
    render(await PackagesPage());
    expect(screen.getByText("服务包中心：购买可用结果，而不是购买工具")).toBeInTheDocument();
  });
});
