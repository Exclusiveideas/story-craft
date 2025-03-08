import Image from "next/image";
import "./dashboardProject.css";
import Link from "next/link";

const DashboardProject = ({ projectInfo }) => {
  return (
    <Link href={`/project/${projectInfo?.uuid}`} className="dP_wrapper">
      <div className="dp_imageWrapper">
        <Image
          src={`/images/auth_one.jpg`}
          width={600}
          height={600}
          alt="project Image"
          className="dp_image"
        />
      </div>
      <div className="dp_infoContainer">
        <h3 className="projectName">{projectInfo?.title}</h3>
        <p className="dp_description">
          Style: <span>{projectInfo?.style}</span>
        </p>
        <p className="dp_tags">
          Tags: <span>{projectInfo?.tags?.join(", ")}</span>
        </p>
      </div>
    </Link>
  );
};

export default DashboardProject;
