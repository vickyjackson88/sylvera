import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import Project from "../pages/projects/[project]";
import { Project as ProjectType } from "../types/projects";

let mockProject: ProjectType = {
  source: "test source",
  version: "2022-11-26T19:46:11Z",
  num_of_records: 99,
  descriptions: {
    URL: "",
  },
  feeds: [
    {
      device_id: "test device id",
      s_t0: 1,
      s_h0: 2,
      s_d0: 3,
      gps_lat: 4,
      gps_lon: 5,
      timestamp: "2022-11-26T23:12:22Z",
    },
  ],
};

describe("Snapshot tests: projects/all", () => {
  it("renders Project DOM unchanged", () => {
    const { container } = render(<Project project={mockProject} />);
    expect(container).toMatchSnapshot();
  });
});

describe("Component tests: projects/[project]", () => {
  it("renders no feeds if there are less than 10", () => {
    const mockProjectWithUnder10Feeds = {
      ...mockProject,
      num_of_records: 9,
    };
    render(<Project project={mockProjectWithUnder10Feeds} />);
    const feedItem = screen.queryByTestId("feed-item");
    expect(feedItem).not.toBeInTheDocument();
  });

  it("renders feeds if there are 10", async () => {
    const mockProjectWith10Feeds = {
      ...mockProject,
      num_of_records: 10,
    };
    render(<Project project={mockProjectWith10Feeds} />);
    const feedItem = await screen.findByTestId("feed-item");
    expect(feedItem).toBeInTheDocument();
  });

  it("renders feeds if there are more than 10", async () => {
    const mockProjectWith10Feeds = {
      ...mockProject,
      num_of_records: 11,
    };
    render(<Project project={mockProjectWith10Feeds} />);
    const feedItem = await screen.findByTestId("feed-item");
    expect(feedItem).toBeInTheDocument();
  });
});
