document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
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
    
        document.getElementById('login').addEventListener('click', async () => {
            const value = document.getElementById('organizationSelect').value;
            const uname = document.getElementById('uname').value;
            const pass = document.getElementById('pass').value;
            
            const res = await fetch(`http://localhost:5000/api/user/login/${value}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ username: uname, password: pass })
            });
            const data = await res.json();
            // console.log(JSON.stringify(data.token));
            // alert(JSON.stringify(data.token));
    
            if (data.token !== undefined) {
                localStorage.setItem('token', data.token);
                window.location.href = './popup.html';
            }
        })

    } else {
        window.location.href = './popup.html';
    }

});