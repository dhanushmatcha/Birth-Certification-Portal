const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Application = require('../models/Application');
const User = require('../models/User');

// @route   POST api/applications
// @desc    Submit a new birth certificate application
// @access  Private (Parents only)
router.post('/', auth, async (req, res) => {
  const {
    childName,
    childDOB,
    placeOfBirth,
    gender,
    weight,
    cityOfBirth,
    stateOfBirth,
    countryOfBirth,
    motherName,
    motherDOB,
    motherNationality,
    motherIDNumber,
    fatherName,
    fatherDOB,
    fatherNationality,
    fatherIDNumber,
    contactEmail,
    phoneNumber,
    residentialAddress,
    documents,
  } = req.body;

  try {
    const newApplication = new Application({
      childName,
      childDOB,
      placeOfBirth,
      gender,
      weight,
      cityOfBirth,
      stateOfBirth,
      countryOfBirth,
      motherName,
      motherDOB,
      motherNationality,
      motherIDNumber,
      fatherName,
      fatherDOB,
      fatherNationality,
      fatherIDNumber,
      contactEmail,
      phoneNumber,
      residentialAddress,
      parent: req.user.id,
      documents: documents || [],
    });

    const application = await newApplication.save();
    res.json({ msg: 'Application submitted successfully', application });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/applications/all
// @desc    Get all applications (for Admin)
// @access  Private (Admins only)
router.get('/all', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized to view all applications' });
  }

  try {
    const applications = await Application.find().sort({ appliedAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/applications/my
// @desc    Get all applications for the logged-in parent
// @access  Private (Parents only)
router.get('/my', auth, async (req, res) => {
  if (req.user.role !== 'parent') {
    return res.status(403).json({ msg: 'Not authorized to view these applications' });
  }

  try {
    const applications = await Application.find({ parent: req.user.id }).sort({ appliedAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/applications/:id
// @desc    Get application by ID
// @access  Private (Parent, Admin)
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    // Check if user is authorized to view this application
    if (
      application.parent.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(application);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   PUT api/applications/verify/:id
// @desc    Verify an application
// @access  Private (Admin only)
router.put('/verify/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized to verify applications' });
  }

  const { status, reviewNotes, digitalSignature } = req.body;

  try {
    let application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    if (application.status === 'verified' || application.status === 'approved') {
      return res.status(400).json({ msg: 'Application already processed or approved' });
    }

    application.status = status; // Set status from request body
    application.reviewNotes = reviewNotes || ''; // Add review notes
    if (status === 'verified') {
      application.verifiedBy = req.user.id;
      application.digitalSignature = digitalSignature || '';
      application.verificationDate = Date.now();
    }

    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   PUT api/applications/approve/:id
// @desc    Approve an application
// @access  Private (Admins only)
router.put('/approve/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized to approve applications' });
  }

  try {
    let application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    if (application.status !== 'verified') {
      return res.status(400).json({ msg: 'Application must be verified before approval' });
    }

    const certificateId = `DBC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    application.status = 'approved';
    application.certificateId = certificateId;
    application.dateOfIssue = Date.now();

    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   PUT api/applications/reject/:id
// @desc    Reject an application
// @access  Private (Admins only)
router.put('/reject/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized to reject applications' });
  }

  const { reviewNotes } = req.body;

  try {
    let application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    if (application.status === 'approved') {
      return res.status(400).json({ msg: 'Approved applications cannot be rejected' });
    }

    application.status = 'rejected';
    application.reviewNotes = reviewNotes || '';
    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/admin/stats
// @desc    Get analytics statistics for the admin dashboard
// @access  Private (Admins only)
router.get('/admin/stats', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized to view admin stats' });
  }

  try {
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: 'pending' });
    const approvedApplications = await Application.countDocuments({ status: 'approved' });
    const rejectedApplications = await Application.countDocuments({ status: 'rejected' });
    const totalCertificatesIssued = await Application.countDocuments({ status: 'approved', certificateId: { $ne: null } });

    // Removed doctor stats - only admin and parent dashboards

    const applicationsOverTime = [
      { name: 'Jan', applications: 10, approved: 8, pending: 2 },
      { name: 'Feb', applications: 15, approved: 12, pending: 3 },
      { name: 'Mar', applications: 20, approved: 15, pending: 5 },
      { name: 'Apr', applications: 25, approved: 20, pending: 5 },
      { name: 'May', applications: 30, approved: 25, pending: 5 },
    ];

    res.json({
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications,
      totalCertificatesIssued,
      applicationsOverTime,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/admin/reports/csv
// @desc    Generate and download CSV report of applications
// @access  Private (Admins only)
router.get('/admin/reports/csv', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized to generate reports' });
  }

  try {
    const applications = await Application.find().lean();

    if (applications.length === 0) {
      return res.status(404).json({ msg: 'No applications found to generate report.' });
    }

    const csvRows = [];
    csvRows.push(['Application ID', 'Child Name', 'Date of Birth', 'Status', 'Submission Date', 'Certificate ID', 'Mother Name', 'Father Name', 'Contact Email', 'Review Notes'].join(','));

    applications.forEach(app => {
      csvRows.push([
        app._id,
        `"${app.childName}"`,
        app.childDOB ? app.childDOB.toISOString().split('T')[0] : '',
        app.status,
        app.appliedAt ? app.appliedAt.toISOString().split('T')[0] : '',
        app.certificateId || '',
        `"${app.motherName}"`,
        `"${app.fatherName || 'N/A'}"`,
        app.contactEmail || '',
        `"${app.reviewNotes || ''}"`,
      ].join(','));
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="applications_report.csv"');
    res.send(csvRows.join('\n'));

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/admin/reports/pdf
// @desc    Generate and download PDF report of applications
// @access  Private (Admins only)
router.get('/admin/reports/pdf', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized to generate reports' });
  }

  try {
    const applications = await Application.find().lean();

    if (applications.length === 0) {
      return res.status(404).json({ msg: 'No applications found to generate report.' });
    }

    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();
    let filename = 'applications_report.pdf';
    filename = encodeURIComponent(filename);

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Application Report', { align: 'center' });
    doc.moveDown();

    applications.forEach((app, index) => {
      doc.fontSize(14).text(`Application ID: ${app._id}`);
      doc.fontSize(12).text(`Child Name: ${app.childName}`);
      doc.text(`Date of Birth: ${app.childDOB ? app.childDOB.toISOString().split('T')[0] : 'N/A'}`);
      doc.text(`Status: ${app.status}`);
      doc.text(`Submission Date: ${app.appliedAt ? app.appliedAt.toISOString().split('T')[0] : 'N/A'}`);
      doc.text(`Certificate ID: ${app.certificateId || 'N/A'}`);
      doc.text(`Mother Name: ${app.motherName}`);
      doc.text(`Father Name: ${app.fatherName || 'N/A'}`);
      doc.text(`Contact Email: ${app.contactEmail || 'N/A'}`);
      doc.text(`Review Notes: ${app.reviewNotes || 'N/A'}`);
      doc.moveDown();

      if (index < applications.length - 1) {
        doc.addPage();
      }
    });

    doc.end();

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
