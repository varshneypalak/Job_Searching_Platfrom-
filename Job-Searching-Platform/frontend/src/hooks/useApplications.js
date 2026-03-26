import { useEffect, useState } from "react";
import * as api from "../api";

export const useApplications = (role) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!role) { setLoading(false); return; }
    const fetcher = role === "Employer" ? api.getEmployerApplications : api.getJobSeekerApplications;
    fetcher()
      .then((res) => setApplications(res.data.applications || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [role]);

  const remove = async (id) => {
    try {
      await api.deleteApplication(id);
      setApplications((prev) => prev.filter((a) => a._id !== id));
    } catch (e) { /* silent */ }
  };

  return { applications, loading, remove };
};
