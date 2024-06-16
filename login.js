document.addEventListener('DOMContentLoaded', () => {
    fetchOrganizations();

    async function fetchOrganizations(page = 1, limit = 10) {
        try {
            const response = await fetch(`http://localhost:5000/api/org/all?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (response.ok) {
                const select = document.getElementById('organizationSelect');
                data.orgs.forEach(org => {
                    const option = document.createElement('option');
                    option.value = org.orgId;  // Assuming the organization ID is _id
                    option.textContent = org.name;  // Assuming the organization name is name
                    select.appendChild(option);
                });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});