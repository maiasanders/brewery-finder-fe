

async function login(endpt, username, password) {

    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify({username, password});

    return await genericFetch(endpt, 'POST', headers, body);

}

async function fetchGet(endpoint, bearerToken) {

    const headers = bearerToken ? {'Authorization': `Bearer ${bearerToken}`} : null;

    return await genericFetch(endpoint, 'GET', headers);
    
}

// async function onDomLoaded() {
//     try {
//         const response = await fetch('http://localhost:8080/breweries/1');
//         const brewery = await response.json();
//         console.log(brewery)
//     } catch(error) {
//         // TODO error response
// }


async function genericFetch(endptUrl, method, headers, body) {
    if (!endptUrl || !method) {
        console.error(`endpoint URL (${endptUrl}) or method (${method}) not defined`);
        return false;
    }

    const options = {method};

    if (headers) {
        options.headers = headers;
    }

    if (body) {
        options.body = body;
    }

    try {
        const response = await fetch(endptUrl, options);

        const contentLength = response.headers.get('Content-Length');
        const contentType = response.headers.get('Content-Type');

        const isValidBodyLength = contentLength ? contentLength > 0 : false;
        const isValidBodyContentType = contentType?.includes('application/json') ?? false;
        const isJsonBodyAvailable = isValidBodyLength || isValidBodyContentType;

        const responseBody = isJsonBodyAvailable && !response.bodyUsed ? await response.json() : null;

        return {
            statusCode: response.status,
            statusDescription: response.statusText,
            body: responseBody
        };
    } catch(error) {
        console.error('error ', error)
    }
}

export {
    login, fetchGet
}