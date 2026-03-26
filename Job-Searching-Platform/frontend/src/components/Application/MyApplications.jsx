import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useApplications } from "../../hooks/useApplications";
import { Button, Modal, SectionTitle } from "../../ui";
import "./MyApplications.css";

const MyApplications = () => {
  const { isAuthorized, user } = useAuth();
  const { applications, remove } = useApplications(user?.role);
  const [resumeUrl, setResumeUrl] = useState(null);
  const navigateTo = useNavigate();

  if (!isAuthorized) { navigateTo("/"); return null; }

  const isEmployer = user?.role === "Employer";

  return (
    <section className="my-apps">
      <div className="ma-inner">
        <SectionTitle>{isEmployer ? "Applications From Job Seekers" : "My Applications"}</SectionTitle>
        {applications.length === 0 ? (
          <p className="ma-empty">No Applications Found</p>
        ) : (
          applications.map((el) => (
            <div className="ma-card" key={el._id}>
              <div className="ma-detail">
                <p><span>Name:</span> {el.name}</p>
                <p><span>Email:</span> {el.email}</p>
                <p><span>Phone:</span> {el.phone}</p>
                <p><span>Address:</span> {el.address}</p>
                <p><span>Cover Letter:</span> {el.coverLetter}</p>
              </div>
              <div className="ma-resume" onClick={() => setResumeUrl(el.resume.url)}>
                <img src={el.resume.url} alt="resume" />
              </div>
              {!isEmployer && (
                <div className="ma-btn-area">
                  <Button variant="danger" onClick={() => remove(el._id)}>Delete</Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {resumeUrl && (
        <Modal onClose={() => setResumeUrl(null)}>
          <img src={resumeUrl} alt="resume" style={{ maxWidth: "500px", height: "auto" }} />
        </Modal>
      )}
    </section>
  );
};

export default MyApplications;
