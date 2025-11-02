import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });

  const supportTabs = [
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle', description: 'Frequently asked questions' },
    { id: 'contact', label: 'Contact Us', icon: 'MessageCircle', description: 'Get in touch' },
    { id: 'guides', label: 'Guides', icon: 'BookOpen', description: 'How-to guides' },
    { id: 'status', label: 'System Status', icon: 'Activity', description: 'Service status' }
  ];

  const faqData = [
    {
      category: 'General',
      questions: [
        {
          id: 1,
          question: 'How do I apply for a birth certificate?',
          answer: 'To apply for a birth certificate, navigate to the "Apply" section, fill out the application form with required information, upload necessary documents, and submit. You\'ll receive updates on your application status.'
        },
        {
          id: 2,
          question: 'How long does it take to process an application?',
          answer: 'Standard processing time is 3-5 business days. Emergency applications can be processed within 24-48 hours for an additional fee.'
        },
        {
          id: 3,
          question: 'What documents do I need to upload?',
          answer: 'You need: Birth notification from hospital, Parent identification documents, Marriage certificate (if applicable), and Proof of residence.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          id: 4,
          question: 'Why can\'t I download my certificate?',
          answer: 'Ensure your browser allows downloads and pop-ups from our site. Try clearing your browser cache or using a different browser. Contact support if the issue persists.'
        },
        {
          id: 5,
          question: 'Is my data secure?',
          answer: 'Yes, we use bank-level encryption and comply with all data protection regulations. Your personal information is never shared with unauthorized parties.'
        },
        {
          id: 6,
          question: 'Can I access the portal on mobile?',
          answer: 'Yes, our portal is fully responsive and optimized for mobile devices, tablets, and desktop computers.'
        }
      ]
    },
    {
      category: 'Certificates',
      questions: [
        {
          id: 7,
          question: 'How do I verify my certificate authenticity?',
          answer: 'Each certificate contains a unique QR code and verification number. Use our verification tool or visit any government office to confirm authenticity.'
        },
        {
          id: 8,
          question: 'Can I get multiple copies?',
          answer: 'Yes, you can download unlimited digital copies. Additional official certified copies can be requested for a fee.'
        }
      ]
    }
  ];

  const quickActions = [
    { title: 'Call Support', icon: 'Phone', action: 'tel:+1-800-BIRTH-01', description: 'Available 24/7' },
    { title: 'Live Chat', icon: 'MessageCircle', action: '#chat', description: 'Mon-Fri 9AM-6PM' },
    { title: 'Email Support', icon: 'Mail', action: 'mailto:support@digitalbirth.gov', description: 'Response within 24hrs' },
    { title: 'Video Call', icon: 'Video', action: '#video', description: 'By appointment' }
  ];

  const systemServices = [
    { name: 'Application Processing', status: 'operational', uptime: '99.9%' },
    { name: 'Certificate Generation', status: 'operational', uptime: '99.8%' },
    { name: 'Document Upload', status: 'operational', uptime: '99.7%' },
    { name: 'Email Notifications', status: 'operational', uptime: '99.5%' },
    { name: 'Payment Processing', status: 'maintenance', uptime: '98.2%' }
  ];

  const handleContactSubmit = (e) => {
    e?.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Handle form submission
    alert('Your message has been sent! We\'ll respond within 24 hours.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      category: 'general',
      message: '',
      priority: 'medium'
    });
  };

  const renderFAQ = () => (
    <div className="space-y-6">
      {faqData?.map((category) => (
        <div key={category?.category} className="bg-card border border-border rounded-lg shadow-elevation-1">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">{category?.category}</h3>
          </div>
          <div className="divide-y divide-border">
            {category?.questions?.map((faq) => (
              <div key={faq?.id} className="p-6">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq?.id ? null : faq?.id)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-base font-medium text-foreground">{faq?.question}</span>
                  <Icon
                    name={expandedFaq === faq?.id ? 'ChevronUp' : 'ChevronDown'}
                    size={20}
                    className="text-muted-foreground flex-shrink-0 ml-4"
                  />
                </button>
                {expandedFaq === faq?.id && (
                  <div className="mt-4 text-muted-foreground">
                    {faq?.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContact = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Quick Actions */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions?.map((action, index) => (
              <a
                key={index}
                href={action?.action}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <Icon name={action?.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{action?.title}</h4>
                    <p className="text-sm text-muted-foreground">{action?.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={18} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">+1 (800) BIRTH-01</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={18} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">support@digitalbirth.gov</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={18} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Business Hours</p>
                <p className="text-sm text-muted-foreground">Mon-Fri: 8AM-8PM EST<br />Sat-Sun: 9AM-5PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-6">Send us a Message</h3>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={contactForm?.name}
              onChange={(e) => setContactForm(prev => ({ ...prev, name: e?.target?.value }))}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={contactForm?.email}
              onChange={(e) => setContactForm(prev => ({ ...prev, email: e?.target?.value }))}
              required
            />
          </div>

          <Input
            label="Subject"
            value={contactForm?.subject}
            onChange={(e) => setContactForm(prev => ({ ...prev, subject: e?.target?.value }))}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <select
                value={contactForm?.category}
                onChange={(e) => setContactForm(prev => ({ ...prev, category: e?.target?.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="application">Application Help</option>
                <option value="certificate">Certificate Issues</option>
                <option value="billing">Billing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
              <select
                value={contactForm?.priority}
                onChange={(e) => setContactForm(prev => ({ ...prev, priority: e?.target?.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Message</label>
            <textarea
              rows={6}
              value={contactForm?.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e?.target?.value }))}
              placeholder="Please describe your issue or question..."
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <Button type="submit" variant="default" fullWidth iconName="Send" iconPosition="left">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );

  const renderGuides = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: 'How to Apply', icon: 'FileText', steps: 5, time: '10 min' },
        { title: 'Document Upload', icon: 'Upload', steps: 3, time: '5 min' },
        { title: 'Certificate Download', icon: 'Download', steps: 4, time: '3 min' },
        { title: 'Account Management', icon: 'User', steps: 6, time: '8 min' },
        { title: 'Payment Process', icon: 'CreditCard', steps: 4, time: '5 min' },
        { title: 'Verification Guide', icon: 'Shield', steps: 3, time: '4 min' }
      ]?.map((guide, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={guide?.icon} size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{guide?.title}</h3>
              <p className="text-sm text-muted-foreground">{guide?.steps} steps · {guide?.time}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" fullWidth iconName="ArrowRight" iconPosition="right">
            View Guide
          </Button>
        </div>
      ))}
    </div>
  );

  const renderStatus = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">System Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-success">All Systems Operational</span>
          </div>
        </div>

        <div className="space-y-4">
          {systemServices?.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                service?.status === 'operational' ? 'bg-success' :
                service?.status === 'maintenance' ? 'bg-warning' : 'bg-error'
              }`}></div>
              <span className="font-medium text-foreground">{service?.name}</span>
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${
                  service?.status === 'operational' ? 'text-success' :
                  service?.status === 'maintenance' ? 'text-warning' : 'text-error'
                }`}>
                  {service?.status === 'operational' ? 'Operational' :
                   service?.status === 'maintenance' ? 'Maintenance' : 'Down'}
                </span>
                <span className="text-sm text-muted-foreground">{service?.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident History */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Incidents</h3>
        <div className="space-y-4">
          <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Scheduled Maintenance</span>
              <span className="text-xs text-muted-foreground">Oct 2, 2024</span>
            </div>
            <p className="text-sm text-muted-foreground">Payment processing will be unavailable for 2 hours during system upgrades.</p>
          </div>

          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Resolved</span>
              <span className="text-xs text-muted-foreground">Sep 28, 2024</span>
            </div>
            <p className="text-sm text-muted-foreground">Brief service disruption in certificate generation has been resolved.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'faq':
        return renderFAQ();
      case 'contact':
        return renderContact();
      case 'guides':
        return renderGuides();
      case 'status':
        return renderStatus();
      default:
        return renderFAQ();
    }
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/admin-dashboard" className="hover:text-foreground transition-smooth">
            Dashboard
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground">Support Center</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Support Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get help with your applications, certificates, and account management.
            Our support team is here to assist you 24/7.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 bg-muted p-2 rounded-lg mb-8 max-w-2xl mx-auto">
          {supportTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {renderContent()}
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <Icon name="Phone" size={24} className="text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Emergency Support</h3>
          <p className="text-muted-foreground mb-4">
            For urgent issues requiring immediate assistance, call our emergency hotline.
          </p>
          <Button variant="outline" iconName="Phone" iconPosition="left">
            Call Emergency: +1 (800) 911-CERT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
