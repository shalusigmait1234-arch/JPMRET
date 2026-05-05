import React from 'react';

const Downloads = () => {
  const docs = [
    { name: "Organisation's Profile", icon: "fas fa-building text-primary", path: "/PDF/Orgn-Profile.pdf" },
    { name: "Code of Conduct", icon: "fas fa-scale-balanced text-success", path: "/PDF/Code-of-Conduct.pdf" },
    { name: "HR Policy / Manual", icon: "fas fa-users text-danger", path: "/PDF/HR-Manual.pdf" },
    { name: "Financial & Accounting Manual", icon: "fas fa-file-invoice-dollar text-warning", path: "/PDF/Financial-Policy.pdf" },
    { name: "Gender Policy", icon: "fas fa-venus-mars text-info", path: "#" },
    { name: "Conflict of Interest Policy", icon: "fas fa-handshake text-dark", path: "/PDF/Conflict-of-Interes-Policy.pdf" }
  ];

  return (
    <div className="downloads-page">
      <style>{`
        .download-card {
          border-radius: 12px;
          transition: all 0.3s ease;
          background: #fff;
          border: 1px solid #cfdae4;
          box-shadow: rgb(1 59 109 / 19%) 3px 3px !important;
        }
        .download-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.1);
        }
      `}</style>

      <div className="page-title-area title-bg-one">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="title-item">
                <h2>Reports</h2>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><span>Reports</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="downloads py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5 pt-100">
            <h2 className="fw-bold text-3xl md:text-4xl">Downloads</h2>
            <p className="text-muted">Access important policies and documents</p>
          </div>

          <div className="row g-4 pb-100">
            {docs.map((doc, i) => (
              <div key={i} className="col-md-4">
                <div className="download-card p-4 shadow-sm h-100 text-center">
                  <i className={`${doc.icon} fa-2x mb-3`}></i>
                  <h6 className="font-bold text-lg mb-3">{doc.name}</h6>
                  <a href={doc.path} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm mt-2">
                    <i className="fas fa-download"></i> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;
