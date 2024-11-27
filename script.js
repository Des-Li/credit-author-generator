const creditRoles = [
  { name: "Conceptualization", description: "Ideas; formulation or evolution of overarching research goals and aims" },
  { name: "Methodology", description: "Development or design of methodology; creation of models" },
  { name: "Software", description: "Programming, software development; designing computer programs; implementation of the computer code and supporting algorithms; testing of existing code components" },
  { name: "Validation", description: "Verification, whether as a part of the activity or separate, of the overall replication/ reproducibility of results/experiments and other research outputs" },
  { name: "Formal Analysis", description: "Application of statistical, mathematical, computational, or other formal techniques to analyze or synthesize study data" },
  { name: "Investigation", description: "Conducting a research and investigation process, specifically performing the experiments, or data/evidence collection" },
  { name: "Resources", description: "Provision of study materials, reagents, materials, patients, laboratory samples, animals, instrumentation, computing resources, or other analysis tools" },
  { name: "Data Curation", description: "Management activities to annotate (produce metadata), scrub data and maintain research data (including software code, where it is necessary for interpreting the data itself) for initial use and later reuse" },
  { name: "Writing - Original Draft", description: "Preparation, creation and/or presentation of the published work, specifically writing the initial draft (including substantive translation)" },
  { name: "Writing - Review & Editing", description: "Preparation, creation and/or presentation of the published work by those from the original research group, specifically critical review, commentary or revision – including pre-or postpublication stages" },
  { name: "Visualization", description: "Preparation, creation and/or presentation of the published work, specifically visualization/ data presentation" },
  { name: "Supervision", description: "Oversight and leadership responsibility for the research activity planning and execution, including mentorship external to the core team" },
  { name: "Project Administration", description: "Management and coordination responsibility for the research activity planning and execution" },
  { name: "Funding Acquisition", description: "Acquisition of the financial support for the project leading to this publication" }
];

let authorCount = 1;

function initTable() {
  const tbody = document.querySelector('#credit-table tbody');
  creditRoles.forEach(role => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${role.name}</td>
      <td>${role.description}</td>
    `;
    tbody.appendChild(row);
  });
}

function addAuthor() {
  authorCount++;
  const headerRow = document.querySelector('#credit-table thead tr');
  
  // Create a new header cell with an input field for the author's name
  const newHeaderCell = document.createElement('th');
  const newAuthorInput = document.createElement('input');
  newAuthorInput.type = 'text';
  newAuthorInput.placeholder = `Author ${authorCount}`;
  newHeaderCell.appendChild(newAuthorInput);
  headerRow.appendChild(newHeaderCell);

  // Add a checkbox column for each CRediT role for the new author
  const rows = document.querySelectorAll('#credit-table tbody tr');
  rows.forEach(row => {
    const cell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    cell.appendChild(checkbox);
    row.appendChild(cell);
  });
}

function generateStatement() {
  const authors = [];
  const rows = document.querySelectorAll('#credit-table tbody tr');

  const authorNames = [];
  const headerCells = document.querySelectorAll('#credit-table thead th');
  
  // Extract the author names from the input fields
  for (let i = 2; i < headerCells.length; i++) {
    const authorName = headerCells[i].querySelector('input').value || `Author ${i - 1}`;
    authorNames.push(authorName);
  }

  authorNames.forEach((authorName, authorIndex) => {
    const roles = [];
    rows.forEach((row, index) => {
      const checkbox = row.querySelectorAll('input[type="checkbox"]')[authorIndex];
      if (checkbox.checked) {
        roles.push(`${creditRoles[index].name}`);
      }
    });

    if (roles.length > 0) {
      // Add bold author's name and colon
      authors.push(`<strong>${authorName}:</strong> ${roles.join(', ')}`);
    }
  });

  // Generate output
  const output = document.getElementById('output');
  if (authors.length) {
    output.innerHTML = `<h3>Generated CRediT Author Statement:</h3><p>${authors.join('<br>')}</p>`;
  } else {
    output.innerHTML = `<p>Please enter names and select contributions for at least one author.</p>`;
  }
}

// Initialize the table with default roles
initTable();
