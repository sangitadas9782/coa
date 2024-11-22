// API endpoint
const apiEndpoint = "https://fedskillstest.coalitiontechnologies.workers.dev";
// Fetch data and render
async function fetchAndRender() {
  try {
    // Fetch patient data
    const response = await fetch(apiEndpoint);
    const data = await response.json();

    // Filter for Jessica Taylor's data
    const patient = data.patients.find(patient => patient.name === "jessica Taylor");

    if (patient) {
      // Populate patient details
      document.querySelector('.patient-name').textContent = patient.name;
      document.querySelector('.patient-age').textContent = `${patient.age} years`;
      
      // Render blood pressure data on the chart
      renderChart(patient.bloodPressure);
    } else {
      console.error("Patient data not found.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render chart dynamically using fetched data
function renderChart(bloodPressureData) {
  const ctx = document.getElementById('bloodPressureChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: bloodPressureData.map(record => record.date),
      datasets: [
        {
          label: 'Systolic',
          data: bloodPressureData.map(record => record.systolic),
          borderColor: '#f29bff',
          backgroundColor: 'rgba(242, 155, 255, 0.2)',
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: '#f29bff',
        },
        {
          label: 'Diastolic',
          data: bloodPressureData.map(record => record.diastolic),
          borderColor: '#9baaf2',
          backgroundColor: 'rgba(155, 170, 242, 0.2)',
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: '#9baaf2',
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMin: 60,
          suggestedMax: 180
        }
      }
    }
  });
}

// Call the function on page load
fetchAndRender("https://fedskillstest.coalitiontechnologies.workers.dev");
