import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./JobApplicationForm.css";

const JobApplicationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const position = watch("position");
  const isDeveloperOrDesigner =
    position === "Developer" || position === "Designer";
  const isDesigner = position === "Designer";
  const isManager = position === "Manager";

  const onSubmit = (data) => {
    setSubmittedData(data);
    console.log(data);
  };

  return (
    <div className="form-container">
      <h2>Job Application Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && <p>{errors.fullName.message}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="number"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <div className="form-group">
          <label>Applying for Position</label>
          <select
            {...register("position", { required: "Position is required" })}
          >
            <option value="">Select...</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && <p>{errors.position.message}</p>}
        </div>

        {isDeveloperOrDesigner && (
          <div className="form-group">
            <label>Relevant Experience (Years)</label>
            <input
              type="number"
              {...register("experience", {
                required: "Relevant experience is required",
                min: { value: 1, message: "Must be greater than 0" },
              })}
            />
            {errors.experience && <p>{errors.experience.message}</p>}
          </div>
        )}

        {isDesigner && (
          <div className="form-group">
            <label>Portfolio URL</label>
            <input
              type="url"
              {...register("portfolio", {
                required: "Portfolio URL is required",
                pattern: {
                  value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                  message: "Invalid URL",
                },
              })}
            />
            {errors.portfolio && <p>{errors.portfolio.message}</p>}
          </div>
        )}

        {isManager && (
          <div className="form-group">
            <label>Management Experience</label>
            <input
              {...register("managementExperience", {
                required: "Management experience is required",
              })}
            />
            {errors.managementExperience && (
              <p>{errors.managementExperience.message}</p>
            )}
          </div>
        )}

        <div className="form-group">
          <label>Additional Skills</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                {...register("skills", {
                  required: "At least one skill is required",
                })}
                value="JavaScript"
              />{" "}
              JavaScript
            </label>
            <label>
              <input type="checkbox" {...register("skills")} value="CSS" /> CSS
            </label>
            <label>
              <input type="checkbox" {...register("skills")} value="Python" />{" "}
              Python
            </label>
            {errors.skills && <p>{errors.skills.message}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Preferred Interview Time</label>
          <input
            type="datetime-local"
            {...register("interviewTime", {
              required: "Preferred interview time is required",
            })}
          />
          {errors.interviewTime && <p>{errors.interviewTime.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="summary">
          <h3>Application Summary</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
