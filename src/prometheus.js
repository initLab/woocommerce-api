import { collectDefaultMetrics, Gauge } from 'prom-client';
import { getAllProductVariations, getOrdersCount } from './woocommerce/index.js';

export async function initMetrics() {
    collectDefaultMetrics();

    const prefix = 'woocommerce_';

    new Gauge({
        name: prefix + 'orders_total',
        help: 'Total number of orders grouped by order status.',
        labelNames: ['status'],
        async collect() {
            this.reset();

            try {
                const ordersCount = await getOrdersCount();

                for (const [status, count] of Object.entries(ordersCount)) {
                    this.set({
                        status,
                    }, count);
                }
            }
            catch (e) {
                console.error('Total orders', e.message);
            }
        },
    });

    new Gauge({
        name: prefix + 'product_stock',
        help: 'Stock of products',
        labelNames: ['name', 'sku'],
        async collect() {
            this.reset();

            try {
                const stock = await getAllProductVariations();

                for (const {
                    name,
                    sku,
                    stockQuantity,
                } of stock) {
                    this.set({
                        name,
                        sku,
                    }, stockQuantity);
                }
            }
            catch (e) {
                console.error('Product stock', e.message);
            }
        },
    });
}
