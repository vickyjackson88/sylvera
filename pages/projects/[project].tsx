import { Project as ProjectType } from "../../types/projects";
import styles from "../../styles/Project.module.css";
import Link from "next/link";

interface ProjectProps {
  project: ProjectType;
}

const getFeedItems = (feed: any) => {
  const feedItems = [
    {
      label: "Device ID",
      data: feed.device_id,
    },
    {
      label: "Latitude",
      data: feed.gps_lat,
    },
    {
      label: "Longitude",
      data: feed.gps_lon,
    },
    {
      label: "Time of entry",
      data: `at ${new Date(feed.timestamp).toLocaleTimeString()} on ${new Date(
        feed.timestamp
      ).toLocaleDateString()}`,
    },
  ];

  return feedItems.map((feedItem) => {
    return (
      <div key={feedItem.label} className={styles.feedItemContent}>
        <span>{feedItem.label}</span>
        <span className={styles.data}>{feedItem.data}</span>
      </div>
    );
  });
};

export const Project = ({ project }: ProjectProps) => {
  const url = new URL(window.location.href);
  const projectName = url.pathname.split("/")[2];
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Link href={"/projects/all"} className={styles.link}>
          ←
        </Link>
        <h1 className={styles.title}>{projectName}</h1>
      </div>
      <div>{`Number of feeds: ${project.num_of_records}`}</div>
      <div>{`Source: ${project.source}`}</div>
      <div>{`Version: ${project.version}`}</div>
      {project.num_of_records >= 10 && (
        <div className={styles.feed}>
          <h2 className={styles.subtitle}>Top 10 feeds:</h2>
          {project.feeds.map((feed, index) => {
            return (
              index < 10 && (
                <div
                  className={styles.feedItem}
                  data-testid="feed-item"
                  key={feed.device_id}
                >
                  {getFeedItems(feed)}
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ query, res }: any) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=60'
  )
  const response = await fetch(
    `https://pm25.lass-net.org/API-1.0.0/project/${query.project}/latest/`
  );
  const project = await response.json();
  return {
    props: { project }, // will be passed to the component as props
  };
};

export default Project;
