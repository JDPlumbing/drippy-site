// job_builder.js

function generateJobID() {
  const now = new Date();
  return `JOB-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 900 + 100)}`;
}

function createJobFromBooking(formData) {
  const job = {
    job_id: generateJobID(),
    customer: {
      name: formData.get("name") || "",
      phone: formData.get("phone") || "",
      address: formData.get("address") || "",
      on_site_contact: formData.get("on_site_contact") || "unknown",
      valve_status: formData.get("valve_confirm") || "not_confirmed"
    },
    status: "pending",
    assigned_to: null,
    timestamp: new Date().toISOString(),
    checklist: {
      arrived: false,
      valve_checked: false,
      work_started: false,
      job_completed: false
    },
    parts_used: [],
    notes: ""
  };

  return job;
}

function saveJobToLocalStorage(job) {
  const existingJobs = JSON.parse(localStorage.getItem("drippy_jobs") || "[]");
  existingJobs.push(job);
  localStorage.setItem("drippy_jobs", JSON.stringify(existingJobs));
}

function downloadJobFile(job) {
  const blob = new Blob([JSON.stringify(job, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${job.job_id}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
