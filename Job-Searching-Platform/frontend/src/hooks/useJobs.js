import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as api from "../api";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllJobs()
      .then((res) => setJobs(res.data.jobs || []))
      .catch((err) => console.log(err))
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

  useEffect(() => {
    api.getMyJobs()
      .then(({ data }) => setMyJobs(data.myJobs))
      .catch((error) => {
        toast.error(error.response.data.message);
        setMyJobs([]);
      });
  }, []);

  const updateJobLocal = (jobId, field, value) => {
    setMyJobs((prev) => prev.map((j) => (j._id === jobId ? { ...j, [field]: value } : j)));
  };

  const saveJob = async (jobId) => {
    const job = myJobs.find((j) => j._id === jobId);
    const { data } = await api.updateJob(jobId, job);
    toast.success(data.message);
  };

  const removeJob = async (jobId) => {
    const { data } = await api.deleteJob(jobId);
    toast.success(data.message);
    setMyJobs((prev) => prev.filter((j) => j._id !== jobId));
  };

  return { myJobs, updateJobLocal, saveJob, removeJob };
};
