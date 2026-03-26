import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useMyJobs } from "../../hooks/useJobs";
import { JOB_CATEGORIES } from "../../constants";
import { Button, SectionTitle } from "../../ui";
import "./MyJobs.css";

const MyJobs = () => {
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useAuth();
  const { myJobs, loading, updateJobLocal, saveJob, removeJob } = useMyJobs();

  if (!isAuthorized || (user && user.role !== "Employer")) {
    return <Navigate to="/" />;
  }

  const handleSave = async (id) => {
    try {
      await saveJob(id);
      toast.success("Job Updated!");
      setEditingMode(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeJob(id);
      toast.success("Job Deleted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="my-jobs">
      <div className="mj-inner">
        <SectionTitle>Your Posted Jobs</SectionTitle>
        {loading ? (
          <div className="mj-loading">
            <div className="spinner" />
            <p>Loading your jobs...</p>
          </div>
        ) : myJobs.length === 0 ? (
          <div className="mj-empty-state">
            <p className="mj-empty-icon">💼</p>
            <h3>No Jobs Posted Yet</h3>
            <p>Start by posting your first job listing.</p>
          </div>
        ) : (
          <div className="mj-list">
            {myJobs.map((el) => (
              <div className="mj-card" key={el._id}>
                <div className="mj-fields">
                  <div className="mj-short">
                    <div>
                      <span className="mj-field-label">Title</span>
                      <input type="text" disabled={editingMode !== el._id} value={el.title} onChange={(e) => updateJobLocal(el._id, "title", e.target.value)} />
                    </div>
                    <div>
                      <span className="mj-field-label">Country</span>
                      <input type="text" disabled={editingMode !== el._id} value={el.country} onChange={(e) => updateJobLocal(el._id, "country", e.target.value)} />
                    </div>
                    <div>
                      <span className="mj-field-label">City</span>
                      <input type="text" disabled={editingMode !== el._id} value={el.city} onChange={(e) => updateJobLocal(el._id, "city", e.target.value)} />
                    </div>
                    <div>
                      <span className="mj-field-label">Category</span>
                      <select value={el.category} disabled={editingMode !== el._id} onChange={(e) => updateJobLocal(el._id, "category", e.target.value)}>
                        <option value="">Select Category</option>
                        {JOB_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <span className="mj-field-label">Salary</span>
                      {el.fixedSalary ? (
                        <input type="number" disabled={editingMode !== el._id} value={el.fixedSalary} onChange={(e) => updateJobLocal(el._id, "fixedSalary", e.target.value)} />
                      ) : (
                        <>
                          <input type="number" disabled={editingMode !== el._id} value={el.salaryFrom} onChange={(e) => updateJobLocal(el._id, "salaryFrom", e.target.value)} />
                          <input type="number" disabled={editingMode !== el._id} value={el.salaryTo} onChange={(e) => updateJobLocal(el._id, "salaryTo", e.target.value)} />
                        </>
                      )}
                    </div>
                    <div>
                      <span className="mj-field-label">Expired</span>
                      <select value={el.expired} disabled={editingMode !== el._id} onChange={(e) => updateJobLocal(el._id, "expired", e.target.value)}>
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </div>
                  </div>
                  <div className="mj-long">
                    <div>
                      <span className="mj-field-label">Description</span>
                      <textarea rows={4} disabled={editingMode !== el._id} value={el.description} onChange={(e) => updateJobLocal(el._id, "description", e.target.value)} />
                    </div>
                    <div>
                      <span className="mj-field-label">Location</span>
                      <textarea rows={3} disabled={editingMode !== el._id} value={el.location} onChange={(e) => updateJobLocal(el._id, "location", e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="mj-actions">
                  {editingMode === el._id ? (
                    <div className="mj-edit-row">
                      <Button variant="accent" onClick={() => handleSave(el._id)}><FaCheck /></Button>
                      <Button variant="ghost" onClick={() => setEditingMode(null)}><RxCross2 /></Button>
                    </div>
                  ) : (
                    <Button variant="secondary" onClick={() => setEditingMode(el._id)}>Edit</Button>
                  )}
                  <Button variant="danger" onClick={() => handleDelete(el._id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
