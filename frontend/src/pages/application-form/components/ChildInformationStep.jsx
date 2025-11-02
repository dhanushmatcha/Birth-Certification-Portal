import React from "react";
import Select from "../../../components/ui/Select";

const ChildInformationStep = ({ formData, updateFormData, errors }) => {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const hospitals = [
    { value: "City General Hospital", label: "City General Hospital" },
    { value: "Community Health Clinic", label: "Community Health Clinic" },
    { value: "St. Jude's Hospital", label: "St. Jude's Hospital" },
  ];

  const doctors = [
    { value: "Dr. Emily White", label: "Dr. Emily White" },
    { value: "Dr. Michael Johnson", label: "Dr. Michael Johnson" },
    { value: "Dr. Sarah Davis", label: "Dr. Sarah Davis" },
  ];

  const handleChange = (field, value) => {
    updateFormData("childInfo", { ...formData?.childInfo, [field]: value });
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 bg-light mb-4">
      <div className="card-header bg-primary text-white rounded-top-4">
        <h4 className="mb-0">Child Information</h4>
      </div>

      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Full Name *</label>
            <input
              type="text"
              className={`form-control ${errors?.childInfo?.fullName ? "is-invalid" : ""}`}
              placeholder="Enter child's full name"
              value={formData?.childInfo?.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.childInfo?.fullName}</div>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Date of Birth *</label>
            <input
              type="date"
              className={`form-control ${errors?.childInfo?.dateOfBirth ? "is-invalid" : ""}`}
              value={formData?.childInfo?.dateOfBirth || ""}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.childInfo?.dateOfBirth}</div>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Time of Birth</label>
            <input
              type="time"
              className="form-control"
              value={formData?.childInfo?.timeOfBirth || ""}
              onChange={(e) => handleChange("timeOfBirth", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Gender *</label>
            <Select
              options={genderOptions}
              value={formData?.childInfo?.gender || ""}
              onChange={(value) => handleChange("gender", value)}
              className={errors?.childInfo?.gender ? "is-invalid" : ""}
            />
            {errors?.childInfo?.gender && <div className="invalid-feedback d-block">{errors?.childInfo?.gender}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Weight (lbs)</label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              placeholder="e.g., 7.2"
              value={formData?.childInfo?.weight || ""}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Place of Birth *</label>
            <input
              type="text"
              className={`form-control ${errors?.childInfo?.placeOfBirth ? "is-invalid" : ""}`}
              placeholder="e.g., City General Hospital"
              value={formData?.childInfo?.placeOfBirth || ""}
              onChange={(e) => handleChange("placeOfBirth", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.childInfo?.placeOfBirth}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">City of Birth *</label>
            <input
              type="text"
              className={`form-control ${errors?.childInfo?.cityOfBirth ? "is-invalid" : ""}`}
              placeholder="e.g., New York"
              value={formData?.childInfo?.cityOfBirth || ""}
              onChange={(e) => handleChange("cityOfBirth", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.childInfo?.cityOfBirth}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">State of Birth *</label>
            <input
              type="text"
              className={`form-control ${errors?.childInfo?.stateOfBirth ? "is-invalid" : ""}`}
              placeholder="e.g., New York"
              value={formData?.childInfo?.stateOfBirth || ""}
              onChange={(e) => handleChange("stateOfBirth", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.childInfo?.stateOfBirth}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Country of Birth *</label>
            <input
              type="text"
              className={`form-control ${errors?.childInfo?.countryOfBirth ? "is-invalid" : ""}`}
              placeholder="e.g., United States"
              value={formData?.childInfo?.countryOfBirth || ""}
              onChange={(e) => handleChange("countryOfBirth", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.childInfo?.countryOfBirth}</div>
          </div>

          <div className="col-md-6">
            <Select
              label="Attending Doctor"
              options={doctors}
              value={formData?.childInfo?.attendingDoctor || ""}
              onChange={(value) => handleChange("attendingDoctor", value)}
            />
          </div>

          <div className="col-md-6">
            <Select
              label="Birth Hospital *"
              options={hospitals}
              value={formData?.childInfo?.attendingHospital || ""}
              onChange={(value) => handleChange("attendingHospital", value)}
            />
            {(!formData?.childInfo?.attendingDoctor && !formData?.childInfo?.attendingHospital) && errors?.childInfo?.attendingDoctor && (
              <div className="invalid-feedback d-block">{errors?.childInfo?.attendingDoctor}</div>
            )}
          </div>
        </div>
      </div>

      <div className="card-footer bg-light border-0">
        <small className="text-muted">
          ⚠️ Ensure details match hospital records exactly. * Required fields
        </small>
      </div>
    </div>
  );
};

export default ChildInformationStep;
