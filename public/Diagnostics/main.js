const userRole = "customer"; // Change to 'tech' or 'admin' as needed

document.addEventListener("DOMContentLoaded", () => {
  let codeRules = { rules: [] }; // Global fallback if not loaded

fetch("codebook.json")
  .then(res => res.json())
  .then(json => {
    codeRules = json;
    console.log("Code rules loaded:", codeRules);
  })
  .catch(err => {
    console.error("Failed to load codebook.json:", err);
  });

  const selector = document.getElementById("testSelector");
  const stepContainer = document.getElementById("testSteps");
  const stepResponses = {}; // { stepId: [answers] }

  // Watch for response input
  document.addEventListener("change", e => {
    if (e.target.tagName === "SELECT" && e.target.dataset.stepId) {
      const { stepId, questionIndex } = e.target.dataset;
      const idx = parseInt(questionIndex);
      const value = e.target.value;

      if (!stepResponses[stepId]) {
        stepResponses[stepId] = [];
      }
      stepResponses[stepId][idx] = value;

      console.log("Updated responses:", stepResponses);
    }
  });
  function evaluateTest(test) {
    let escalated = false;
    const violations = [];
  
    test.steps.forEach(step => {
      const responses = stepResponses[step.id] || [];
  
      // 1. Escalation based on answers
      responses.forEach(answer => {
        if ((step.escalateIf || []).includes(answer)) {
          escalated = true;
        }
      });
  
      // 2. Compliance checks from codebook.json
      codeRules.rules.forEach(rule => {
        const applies = rule.appliesTo;
  
        const systemMatch = applies.system === step.system;
        const fixtureMatch = !applies.fixture || applies.fixture.includes(step.fixtureType);
        const componentMatch = applies.component === step.component;
  
        if (systemMatch && fixtureMatch && componentMatch) {
          rule.complianceChecks.forEach(check => {
            const val = step[check.property];
  
            if (check.mustNotInclude && check.mustNotInclude.includes(val)) {
              violations.push(`⚠️ Step ${step.title}: ${rule.violationMessage} (${rule.codeId})`);
              escalated = true;
            }
            if (check.mustBeAtLeast !== undefined && val < check.mustBeAtLeast) {
              violations.push(`⚠️ Step ${step.title}: ${rule.violationMessage} (${rule.codeId})`);
              escalated = true;
            }
            if (check.mustBeAtMost !== undefined && val > check.mustBeAtMost) {
              violations.push(`⚠️ Step ${step.title}: ${rule.violationMessage} (${rule.codeId})`);
              escalated = true;
            }
            if (check.mustBeBetween && (val < check.mustBeBetween[0] || val > check.mustBeBetween[1])) {
              violations.push(`⚠️ Step ${step.title}: ${rule.violationMessage} (${rule.codeId})`);
              escalated = true;
            }
          });
        }
      });
    });
  
    // 3. Show summary
    const resultDiv = document.createElement("div");
    resultDiv.className = "test-result";
    resultDiv.style.marginTop = "2em";
    resultDiv.style.padding = "1em";
    resultDiv.style.borderTop = "2px solid #ccc";
  
    if (escalated) {
      resultDiv.innerHTML = `
        <h3>⚠️ Recommended Service</h3>
        <p>${test.onFailure?.message || "Issues were detected in this diagnostic."}</p>
        ${violations.length ? `<ul>${violations.map(v => `<li>${v}</li>`).join("")}</ul>` : ""}
      `;
    } else {
      resultDiv.innerHTML = `
  <h3>⚠️ Recommended Service</h3>
  <p>${test.onFailure?.message || "Issues were detected in this diagnostic."}</p>
  ${violations.length ? `<ul>${violations.map(v => `<li>${v}</li>`).join("")}</ul>` : ""}
  <div style="margin-top:1em;">
    <button onclick="window.location.href='/views/booking.html?testId=${test.testId}'" style="padding: 0.75em 1.5em; font-size: 1rem;">
      📅 Book a Technician
    </button>
  </div>
`;

    }
  
    stepContainer.appendChild(resultDiv);
  }
  
  
  // Load the diagnostic index and build the selector
  fetch("diagnostic_index_updated.json")
    .then(res => res.json())
    .then(index => {
      index.forEach(test => {
        if (!isRoleEligible(test.minRole)) return;

        const option = document.createElement("option");
        option.value = test.file;
        option.textContent = test.title;
        selector.appendChild(option);
      });
    });

  // When a test is selected, fetch and render its steps
  selector.addEventListener("change", () => {
    const selectedFile = selector.value;
    if (!selectedFile) return;

    fetch(selectedFile)
      .then(res => res.json())
      .then(renderSteps)
      .catch(err => {
        console.error("Error loading test file:", err);
        stepContainer.innerHTML = "<p>Error loading test. Please try again.</p>";
      });
  });

  // Render test steps with checks
  function renderSteps(test) {
    console.log("Loaded test object:", test);
    stepContainer.innerHTML = `<h2>${test.title || "Untitled Test"}</h2>`;
  
    const isValveTest = test.testId === "valveTest";
  
    // Add pretest warning if it's the valve test
    if(isValveTest) {
      const safety = document.createElement("div");
      safety.className = "pretest-instructions";
      safety.innerHTML = `
        <p><strong>Pretest Instructions:</strong></p>
        <ul>
          <li>Visually inspect your valve before touching it. Look for corrosion, leaking, or signs of damage.</li>
          <li><strong>Do not use any tools</strong>—only hand pressure should be applied.</li>
          <li>If the valve looks questionable or stuck, <strong>do not force it.</strong></li>
          <li>Instead, consider booking a professional technician to inspect or replace the valve.</li>
        </ul>
      `;
      stepContainer.appendChild(safety);
    }
  
    if (!Array.isArray(test.steps)) {
      console.error("❌ This test has no valid steps:", test);
      return;
    }
  
    test.steps.forEach((step, i) => {
      const allowStep = isValveTest || isStepVisible(step.skillLevel);
      if (!allowStep) return;
  
      const div = document.createElement("div");
      div.classList.add("step");
  
      const title = document.createElement("h3");
      title.textContent = `Step ${i + 1}: ${step.title || "Untitled Step"}`;
  
      const description = document.createElement("p");
      description.textContent = step.description || "No description provided.";
      div.appendChild(title);
      div.appendChild(description);
  
      if (!isValveTest && isStepWarned(step.skillLevel)) {
        const warning = document.createElement("div");
        warning.className = "tooltip";
        warning.textContent = `⚠️ Requires ${step.skillLevel} skill`;
        div.appendChild(warning);
      }
  
      // Render checks
      const checkList = document.createElement("ul");
      step.checks?.forEach((question, qIdx) => {
        const li = document.createElement("li");
  
        const label = document.createElement("label");
        label.textContent = question;
  
        const select = document.createElement("select");
        ["", "yes", "no", "notsure"].forEach(val => {
          const opt = document.createElement("option");
          opt.value = val;
          opt.textContent = val === "" ? "-- Select --" : val;
          select.appendChild(opt);
        });
  
        select.dataset.stepId = step.id;
        select.dataset.questionIndex = qIdx;
  
        li.appendChild(label);
        li.appendChild(document.createElement("br"));
        li.appendChild(select);
        checkList.appendChild(li);
      });
  
      div.appendChild(checkList);
      stepContainer.appendChild(div);
    });
  
    // Add "Book Now" button if valve test
    if(isValveTest) {
      const bookDiv = document.createElement("div");
      bookDiv.className = "book-button";
      bookDiv.innerHTML = `
        <p><strong>Concerned about your valve?</strong></p>
        <button onclick="alert('Booking logic coming soon!')">📅 Book Now</button>
      `;
      stepContainer.appendChild(bookDiv);
    }
      
  const finishBtn = document.createElement("button");
  finishBtn.textContent = "✅ Finish Diagnostic";
  finishBtn.style.marginTop = "2em";
  finishBtn.onclick = () => evaluateTest(test);
  
  stepContainer.appendChild(finishBtn);
  }

  function isRoleEligible(minRole) {
    const ranks = ["customer", "tech", "admin"];
    return ranks.indexOf(userRole) >= ranks.indexOf(minRole || "customer");
  }

  function isStepVisible(level) {
    const ranks = ["basic", "advanced", "pro"];
    const userRoles = ["customer", "tech", "admin"];

    if (!userRoles.includes(userRole)) {
      console.error(`Invalid userRole: "${userRole}"`);
      return false;
    }

    const roleMap = {
      customer: "basic",
      tech: "advanced",
      admin: "pro"
    };

    const userSkillLevel = roleMap[userRole] || "basic";
    const userIndex = ranks.indexOf(userSkillLevel);
    const requiredIndex = ranks.indexOf(level || "basic");

    console.log(`Evaluating step: userSkill=${userSkillLevel}, stepLevel=${level}, userIndex=${userIndex}, requiredIndex=${requiredIndex}`);

    return userIndex >= requiredIndex;
  }

  function isStepWarned(level) {
    const ranks = ["basic", "advanced", "pro"];
    const roleMap = {
      customer: "basic",
      tech: "advanced",
      admin: "pro"
    };
    const userSkillLevel = roleMap[userRole] || "basic";
    return ranks.indexOf(userSkillLevel) < ranks.indexOf(level || "basic");
  }


});
