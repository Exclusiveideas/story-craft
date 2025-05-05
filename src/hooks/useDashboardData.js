// hooks/useDashboardData.js
import { fetchUserProjects } from "@/apiCalls/projectAPI";
import useDashboardStore from "@/store/useDashboardStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export function useDashboardData() {
  const [searchData, setSearchData] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userProjects, updateUserProjects } = useDashboardStore();

  useEffect(() => {
    if (!searchData.trim()) {
      setFilteredProjects(userProjects);
      return;
    }

    const filtered = userProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchData.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchData.toLowerCase())
        )
    );

    setFilteredProjects(filtered);
  }, [searchData, userProjects]);

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    setLoading(true);
    try {
      const fetchResponse = await fetchUserProjects();

      if (fetchResponse?.error) {
        toast.error("Error fetching your project(s).", {
          description: fetchResponse?.error,
          style: { border: "none", color: "red" },
        });
      } else {
        updateUserProjects([...fetchResponse?.projects]);
      }
    } catch (error) {
      toast.error("Error fetching your project(s).");
    }
    setLoading(false);
  };

  return {
    searchData,
    setSearchData,
    loading,
    filteredProjects,
  };
}
