async function loadChart() {
    const response = await fetch("http://localhost:3000/leads");
    const json = await response.json();

    const leads = json.data;

    const statusCounts = {};
    leads.forEach(l => {
        const s = l.Lead_Status || "Unknown";
        statusCounts[s] = (statusCounts[s] || 0) + 1;
    });

    new Chart(document.getElementById("chart"), {
        type: "pie",
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts)
            }]
        }
    });
}

loadChart();