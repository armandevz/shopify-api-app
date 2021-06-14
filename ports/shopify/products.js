const Shopify = require('shopify-api-node');

const shopify = new Shopify({
    shopName: 'nytstore-stg.myshopify.com',
    apiKey: 'ec0bed4d02bad8e931e0f5ac1eb1f395',
    password: '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'
});

// Pulls out all product variants
(async () => {
    const productId = 6667291459782;
    const products = await shopify.productVariant.list(productId);

    console.log(products);

})().catch(console.error);