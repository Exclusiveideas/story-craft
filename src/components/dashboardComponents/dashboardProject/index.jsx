import Image from "next/image";
import "./dashboardProject.css";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const DashboardProject = ({ projectInfo }) => {
  return (
    <Link href={`/project/${projectInfo?.id}`} className="dP_wrapper">
      <div className="dp_imageWrapper">
        <Image
          src={`/images/writing.png`}
          width={500}
          height={500}
          alt="project Image"
          className="dp_image"
        />
      </div>
      <div className="dp_infoContainer">
        <h3 className="projectName">{projectInfo?.title}</h3>
        <div className="dp_description">
          <Badge className="badge">{projectInfo?.storytellingStyle}</Badge>
        </div>
        <div className="dp_tags">
          {projectInfo?.tags?.map((info, i) => (
            <Badge className="badge tag" key={i}>{info}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default DashboardProject;
