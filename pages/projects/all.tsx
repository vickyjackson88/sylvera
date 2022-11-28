import Link from "next/link";

import styles from "../../styles/AllProjects.module.css";

interface ProjectsProps {
  projects: string[];
}

export const AllProjects = ({ projects }: ProjectsProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Live Projects</h1>
      {projects.map((project) => (
        <div key={project} className={styles.card}>
          <Link
            data-testid={`${project}-link`}
            href={`/projects/${project}`}
            className={styles.link}
          >
            <span>{project.replace("_", " ")}</span>
            <span>→</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

// Using server-side rendering with cache control headers
// instead of static rendering because the response changes
export const getServerSideProps = async ({ res }: any) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=60'
  )
  const response = await fetch("https://pm25.lass-net.org/API-1.0.0/project/all/");
  const responseText = await response.text();
  const projects = responseText.split(/\r?\n/).filter((project) => project);
  return {
    props: { projects }, // will be passed to the page component as props
  };
};

export default AllProjects;
