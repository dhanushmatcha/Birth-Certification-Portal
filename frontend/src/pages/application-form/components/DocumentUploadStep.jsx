import React, { useState } from "react";

const DocumentUploadStep = ({ formData, updateFormData, errors, applicationId }) => {
  const [dragging, setDragging] = useState(false);

  const handleFile = (file, id) => {
    if (!file) return;

    const newDoc = {
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      file: file // Store the actual file object
    };
    updateFormData("documents", {
      ...formData?.documents,
      [id]: newDoc,
    });
  };

  const removeFile = (id) => {
    const updatedDocs = { ...formData?.documents };
    delete updatedDocs[id];
    updateFormData("documents", updatedDocs);
  };

  const requiredDocs = [
    { id: 'hospital_record', label: 'Hospital Birth Record', description: 'Official hospital record of birth' },
    { id: 'parent_id_mother', label: "Mother's Identification", description: 'Government ID or passport' },
    { id: 'parent_id_father', label: "Father's Identification", description: 'Government ID or passport (if applicable)' }
  ];

  const optionalDocs = [
    { id: 'marriage_certificate', label: 'Marriage Certificate', description: 'If parents are married' },
    { id: 'medical_records', label: 'Additional Medical Records', description: 'Any additional medical documentation' }
  ];

  const FileUploadArea = ({ docId, label, description, required = false }) => {
    const hasFile = formData?.documents?.[docId];
    const hasError = errors?.documents?.[docId];

    return (
      <div className="col-md-6 mb-4">
        <div className={`card h-100 border-2 ${hasError ? 'border-danger' : hasFile ? 'border-success' : 'border-secondary'} ${dragging === docId ? 'border-primary bg-light' : ''}`}>
          <div className="card-body text-center">
            <h6 className="card-title fw-semibold">
              {label} {required && <span className="text-danger">*</span>}
            </h6>
            <p className="card-text text-muted small mb-3">{description}</p>

            {hasFile ? (
              <div className="mb-3">
                <div className="alert alert-success py-2">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <strong>{hasFile.name}</strong>
                  <br />
                  <small className="text-muted">Size: {(hasFile.size / 1024).toFixed(1)} KB</small>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFile(docId)}
                >
                  <i className="bi bi-trash me-1"></i>Remove
                </button>
              </div>
            ) : (
              <div
                className="border border-2 border-dashed rounded p-4 mb-3"
                style={{ cursor: 'pointer', minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(docId);
                }}
                onDragLeave={() => setDragging(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(null);
                  const file = e.dataTransfer.files[0];
                  if (file) handleFile(file, docId);
                }}
                onClick={() => document.getElementById(`file-upload-${docId}`).click()}
              >
                <i className="bi bi-cloud-upload fs-2 text-primary mb-2"></i>
                <p className="mb-1 fw-semibold">Click to upload or drag and drop</p>
                <p className="text-muted small mb-0">PDF, JPG, PNG up to 5MB</p>
                <input
                  type="file"
                  id={`file-upload-${docId}`}
                  hidden
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFile(e.target.files[0], docId)}
                />
              </div>
            )}

            {hasError && (
              <div className="text-danger small mt-2">
                <i className="bi bi-exclamation-triangle-fill me-1"></i>
                {hasError}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 bg-light mb-4">
      <div className="card-header bg-info text-white rounded-top-4">
        <h4 className="mb-0">Upload Required Documents</h4>
        <p className="mb-0 mt-1 small opacity-75">Please upload clear, legible copies of all required documents</p>
      </div>
      <div className="card-body">
        <div className="alert alert-info">
          <i className="bi bi-info-circle-fill me-2"></i>
          <strong>Required Documents:</strong> All documents marked with * are mandatory for your application.
        </div>

        <h5 className="text-primary mb-3">Required Documents</h5>
        <div className="row">
          {requiredDocs.map(doc => (
            <FileUploadArea
              key={doc.id}
              docId={doc.id}
              label={doc.label}
              description={doc.description}
              required={true}
            />
          ))}
        </div>

        <h5 className="text-secondary mb-3">Optional Documents</h5>
        <div className="row">
          {optionalDocs.map(doc => (
            <FileUploadArea
              key={doc.id}
              docId={doc.id}
              label={doc.label}
              description={doc.description}
              required={false}
            />
          ))}
        </div>

        <div className="mt-4 p-3 bg-light rounded">
          <h6 className="text-muted mb-2">Document Guidelines:</h6>
          <ul className="text-muted small mb-0">
            <li>Acceptable formats: PDF, JPG, PNG</li>
            <li>Maximum file size: 5MB per document</li>
            <li>Ensure documents are clear and readable</li>
            <li>All text should be visible without zooming</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadStep;
