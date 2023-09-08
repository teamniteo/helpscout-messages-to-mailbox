
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = 'https://api.helpscout.net/v2/conversations'; // Help Scout API endpoint
    const json = await request.json(); // Parse the received JSON
    const { searchParams } = new URL(request.url); // Get the query parameters from the request URL
    const mailboxId = searchParams.get('mailboxId'); // Get the mailboxId parameter from the query parameters
    const name = searchParams.get('name'); // Get the name parameter from the query parameters

    if (json.message && json.message.name === name && mailboxId) {
        const tokenUrl = 'https://api.helpscout.net/v2/oauth2/token';
        const tokenPayload = {
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        };
        const tokenResponse = await fetch(tokenUrl, {
            method: 'POST',
            body: JSON.stringify(tokenPayload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const tokenJson = await tokenResponse.json();
        const accessToken = tokenJson.access_token;

        const payload = {
            "subject": json.message.name,
            "customer": {
                "id": json._embedded.customer.id
            },
            "mailboxId": mailboxId,
            "type": "email",
            "status": "active",
            "threads": [{
                "type": "customer",
                "customer": {
                    "id": json._embedded.customer.id
                },
                "text": json.response.comment
            }],
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return response;
    } else {
        return new Response('Message error', { status: 400 });
    }
}
