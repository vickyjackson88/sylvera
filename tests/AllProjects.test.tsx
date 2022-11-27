import { render } from "@testing-library/react";

import AllProjects from "../pages/projects/all";

const mockProjects = ["project1", "project2", "project3"];

describe("Snapshot tests: projects/all", () => {
  it("renders AllProjects DOM unchanged", () => {
    const { container } = render(<AllProjects projects={mockProjects} />);
    expect(container).toMatchSnapshot();
  });
});
