import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as api from "../api";

export const useApplications = (role) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!role) return;
    const fetcher = role === "Employer" ? api.getEmployerApplications : api.getJobSeekerApplications;
    fetcher()
      .then((res) => setApplications(res.data.applications))
      .catch((error) => toast.error(error.response.data.message));
  }, [role]);

  const remove = (id) => {
    api.deleteApplication(id)
      .then((res) => {
        toast.success(res.data.message);
        setApplications((prev) => prev.filter((a) => a._id !== id));
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  return { applications, remove };
};
