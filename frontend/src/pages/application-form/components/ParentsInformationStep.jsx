import React from "react";

const ParentsInformationStep = ({ formData, updateFormData, errors }) => {
  const handleChange = (section, field, value) =>
    updateFormData(section, { ...formData?.[section], [field]: value });

  const handleFatherUnknown = (isUnknown) => {
    updateFormData("fatherInfo", {
      ...formData?.fatherInfo,
      isUnknown,
      ...(isUnknown && {
        fullName: '',
        dateOfBirth: '',
        nationality: '',
        idNumber: '',
        ageAtBirth: '',
        placeOfBirth: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
        occupation: '',
        education: ''
      })
    });
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 bg-light mb-4">
      <div className="card-header bg-secondary text-white rounded-top-4">
        <h4 className="mb-0">Parents Information</h4>
      </div>

      <div className="card-body">
        <h5 className="text-primary mb-3">Mother's Details</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Full Name *</label>
            <input
              type="text"
              className={`form-control ${errors?.motherInfo?.fullName ? "is-invalid" : ""}`}
              placeholder="Mother's full name"
              value={formData?.motherInfo?.fullName || ""}
              onChange={(e) => handleChange("motherInfo", "fullName", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.motherInfo?.fullName}</div>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Date of Birth *</label>
            <input
              type="date"
              className={`form-control ${errors?.motherInfo?.dateOfBirth ? "is-invalid" : ""}`}
              value={formData?.motherInfo?.dateOfBirth || ""}
              onChange={(e) => handleChange("motherInfo", "dateOfBirth", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.motherInfo?.dateOfBirth}</div>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nationality *</label>
            <input
              type="text"
              className={`form-control ${errors?.motherInfo?.nationality ? "is-invalid" : ""}`}
              placeholder="e.g., Indian"
              value={formData?.motherInfo?.nationality || ""}
              onChange={(e) => handleChange("motherInfo", "nationality", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.motherInfo?.nationality}</div>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">ID Number *</label>
            <input
              type="text"
              className={`form-control ${errors?.motherInfo?.idNumber ? "is-invalid" : ""}`}
              placeholder="Government ID number"
              value={formData?.motherInfo?.idNumber || ""}
              onChange={(e) => handleChange("motherInfo", "idNumber", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.motherInfo?.idNumber}</div>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Age at time of birth"
              value={formData?.motherInfo?.ageAtBirth || ""}
              onChange={(e) => handleChange("motherInfo", "ageAtBirth", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Place of Birth</label>
            <input
              type="text"
              className="form-control"
              placeholder="City, Country"
              value={formData?.motherInfo?.placeOfBirth || ""}
              onChange={(e) => handleChange("motherInfo", "placeOfBirth", e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label fw-semibold">Residential Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full address"
              value={formData?.motherInfo?.address || ""}
              onChange={(e) => handleChange("motherInfo", "address", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">City</label>
            <input
              type="text"
              className="form-control"
              placeholder="City"
              value={formData?.motherInfo?.city || ""}
              onChange={(e) => handleChange("motherInfo", "city", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">State</label>
            <input
              type="text"
              className="form-control"
              placeholder="State"
              value={formData?.motherInfo?.state || ""}
              onChange={(e) => handleChange("motherInfo", "state", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">ZIP Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="ZIP"
              value={formData?.motherInfo?.zipCode || ""}
              onChange={(e) => handleChange("motherInfo", "zipCode", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Phone number"
              value={formData?.motherInfo?.phone || ""}
              onChange={(e) => handleChange("motherInfo", "phone", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              value={formData?.motherInfo?.email || ""}
              onChange={(e) => handleChange("motherInfo", "email", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Occupation</label>
            <input
              type="text"
              className="form-control"
              placeholder="Occupation"
              value={formData?.motherInfo?.occupation || ""}
              onChange={(e) => handleChange("motherInfo", "occupation", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Education</label>
            <input
              type="text"
              className="form-control"
              placeholder="Education level"
              value={formData?.motherInfo?.education || ""}
              onChange={(e) => handleChange("motherInfo", "education", e.target.value)}
            />
          </div>
        </div>

        <h5 className="text-primary mb-3">Father's Details</h5>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="fatherUnknown"
              checked={formData?.fatherInfo?.isUnknown || false}
              onChange={(e) => handleFatherUnknown(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="fatherUnknown">
              Father is unknown
            </label>
          </div>
        </div>

        {!formData?.fatherInfo?.isUnknown && (
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Full Name *</label>
              <input
                type="text"
                className={`form-control ${errors?.fatherInfo?.fullName ? "is-invalid" : ""}`}
                placeholder="Father's full name"
                value={formData?.fatherInfo?.fullName || ""}
                onChange={(e) => handleChange("fatherInfo", "fullName", e.target.value)}
              />
              <div className="invalid-feedback">{errors?.fatherInfo?.fullName}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Date of Birth *</label>
              <input
                type="date"
                className={`form-control ${errors?.fatherInfo?.dateOfBirth ? "is-invalid" : ""}`}
                value={formData?.fatherInfo?.dateOfBirth || ""}
                onChange={(e) => handleChange("fatherInfo", "dateOfBirth", e.target.value)}
              />
              <div className="invalid-feedback">{errors?.fatherInfo?.dateOfBirth}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Nationality *</label>
              <input
                type="text"
                className={`form-control ${errors?.fatherInfo?.nationality ? "is-invalid" : ""}`}
                placeholder="e.g., Indian"
                value={formData?.fatherInfo?.nationality || ""}
                onChange={(e) => handleChange("fatherInfo", "nationality", e.target.value)}
              />
              <div className="invalid-feedback">{errors?.fatherInfo?.nationality}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">ID Number *</label>
              <input
                type="text"
                className={`form-control ${errors?.fatherInfo?.idNumber ? "is-invalid" : ""}`}
                placeholder="Government ID number"
                value={formData?.fatherInfo?.idNumber || ""}
                onChange={(e) => handleChange("fatherInfo", "idNumber", e.target.value)}
              />
              <div className="invalid-feedback">{errors?.fatherInfo?.idNumber}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Age at Birth</label>
              <input
                type="number"
                className="form-control"
                placeholder="Age at time of birth"
                value={formData?.fatherInfo?.ageAtBirth || ""}
                onChange={(e) => handleChange("fatherInfo", "ageAtBirth", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Place of Birth</label>
              <input
                type="text"
                className="form-control"
                placeholder="City, Country"
                value={formData?.fatherInfo?.placeOfBirth || ""}
                onChange={(e) => handleChange("fatherInfo", "placeOfBirth", e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Residential Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full address"
                value={formData?.fatherInfo?.address || ""}
                onChange={(e) => handleChange("fatherInfo", "address", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">City</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                value={formData?.fatherInfo?.city || ""}
                onChange={(e) => handleChange("fatherInfo", "city", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">State</label>
              <input
                type="text"
                className="form-control"
                placeholder="State"
                value={formData?.fatherInfo?.state || ""}
                onChange={(e) => handleChange("fatherInfo", "state", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">ZIP Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="ZIP"
                value={formData?.fatherInfo?.zipCode || ""}
                onChange={(e) => handleChange("fatherInfo", "zipCode", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Phone</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Phone number"
                value={formData?.fatherInfo?.phone || ""}
                onChange={(e) => handleChange("fatherInfo", "phone", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={formData?.fatherInfo?.email || ""}
                onChange={(e) => handleChange("fatherInfo", "email", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Occupation</label>
              <input
                type="text"
                className="form-control"
                placeholder="Occupation"
                value={formData?.fatherInfo?.occupation || ""}
                onChange={(e) => handleChange("fatherInfo", "occupation", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Education</label>
              <input
                type="text"
                className="form-control"
                placeholder="Education level"
                value={formData?.fatherInfo?.education || ""}
                onChange={(e) => handleChange("fatherInfo", "education", e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentsInformationStep;
