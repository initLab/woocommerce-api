import { listAllOrders, listAllProducts, listAllProductVariations, pager } from './api.js';

export async function getAllProductVariations() {
    const options = {
        status: 'publish',
    };

    let result = [];
    const products = await pager(listAllProducts, options);

    for (const product of products) {
        if (product.manage_stock) {
            result.push({
                id: product.id,
                productName: product.name,
                variationName: '',
                name: product.name,
                sku: product.sku,
                stockQuantity: product.stock_quantity,
                price: parseFloat(product.price),
            });
        }
        else {
            const variations = await pager(listAllProductVariations, options, product.id);

            for (const variation of variations) {
                if (!variation.manage_stock) {
                    continue;
                }

                result.push({
                    id: variation.id,
                    productName: product.name,
                    variationName: variation.name,
                    name: `${product.name} - ${variation.name}`,
                    sku: variation.sku,
                    stockQuantity: variation.stock_quantity,
                    price: parseFloat(variation.price),
                });
            }
        }
    }

    return result;
}

export async function getOrdersCount() {
    const orders = await pager(listAllOrders);

    return orders.reduce((prev, curr) => ({
        ...prev,
        [curr.status]: (prev?.[curr.status] ?? 0) + 1,
    }), {});
}
