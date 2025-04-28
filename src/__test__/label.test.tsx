import { Label } from "@/components/ui/label";
import { render, screen } from "@testing-library/react";

describe("Label component", () => {
  it("renders the label text", () => {
    render(<Label htmlFor="username">Username</Label>);
    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "username");
  });

  it("applies additional classes", () => {
    render(<Label className="text-red-500">Test</Label>);
    const label = screen.getByText("Test");
    expect(label).toHaveClass("text-red-500");
  });

  it("has default styling classes", () => {
    render(<Label>Label</Label>);
    const label = screen.getByText("Label");
    expect(label.className).toMatch(/text-sm/);
  });
});
