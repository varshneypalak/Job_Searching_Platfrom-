import { useEffect, useState } from "react";
import * as api from "../api";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllJobs()
      .then((res) => setJobs(res.data.jobs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { jobs, loading };
};

export const useJobDetail = (id) => {
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.getJobById(id)
      .then((res) => setJob(res.data.job))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  return { job, loading, error };
};

export const useMyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMyJobs()
      .then(({ data }) => setMyJobs(data.myJobs || []))
      .catch(() => setMyJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const updateJobLocal = (jobId, field, value) => {
    setMyJobs((prev) => prev.map((j) => (j._id === jobId ? { ...j, [field]: value } : j)));
  };

  const saveJob = async (jobId) => {
    const job = myJobs.find((j) => j._id === jobId);
    const { data } = await api.updateJob(jobId, job);
    return data;
  };

  const removeJob = async (jobId) => {
    const { data } = await api.deleteJob(jobId);
    setMyJobs((prev) => prev.filter((j) => j._id !== jobId));
    return data;
  };

  return { myJobs, loading, updateJobLocal, saveJob, removeJob };
};
