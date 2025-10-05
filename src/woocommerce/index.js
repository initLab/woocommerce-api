import { listAllOrders, listAllProducts, listAllProductVariations } from './api.js';

export async function getAllProductVariations() {
    const options = {
        status: 'publish',
        per_page: 100,
    };

    let result = [];
    const products = await listAllProducts(options);

    for (const product of products) {
        if (product.manage_stock) {
            result.push({
                name: product.name,
                sku: product.sku,
                stockQuantity: product.stock_quantity,
            });
        }
        else {
            const variations = await listAllProductVariations(product.id, options);

            for (const variation of variations) {
                if (!variation.manage_stock) {
                    continue;
                }

                result.push({
                    name: `${product.name} - ${variation.name}`,
                    sku: variation.sku,
                    stockQuantity: variation.stock_quantity,
                });
            }
        }
    }

    return result;
}

export async function getOrdersCount() {
    const options = {
        per_page: 100,
    };

    const orders = await listAllOrders(options);

    return orders.reduce((prev, curr) => ({
        ...prev,
        [curr.status]: (prev?.[curr.status] ?? 0) + 1,
    }), {});
}
