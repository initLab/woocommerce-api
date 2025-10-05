async function request(path = '/', query = {}, data = null) {
    const queryStr = new URLSearchParams(query).toString();
    const url = `${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3${path}${queryStr.length > 0 ? `?${queryStr}` : ''}`;
    const method = data === null ? 'GET' : 'POST';
    const authorization = `Basic ${btoa(`${process.env.WOOCOMMERCE_KEY}:${process.env.WOOCOMMERCE_SECRET}`)}`;
    const headers = {
        Authorization: authorization,
        ...(data === null ? {} : {
            'Content-Type': 'application/json',
        }),
    };
    const body = data === null ? undefined : JSON.stringify(data);
    //console.log('fetch', {method, url, headers, body});
    const request = fetch(url, {
        method,
        headers,
        body,
    });
    const response = await request;
    return await response.json();
}

export async function listAllProducts(query = {}){
    return await request('/products', query);
}

export async function listAllProductVariations(productId, query = {}){
    return await request(`/products/${productId}/variations`, query);
}

export async function listAllOrders(query = {}) {
    return await request('/orders', query);
}
