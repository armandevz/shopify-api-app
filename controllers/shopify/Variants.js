require('dotenv').config({path:'../../.env'});
const Shopify = require('shopify-api-node');
const CONFIG = require('../../config/config');

class Variants {
  shopify = null;
  productId = null;

  constructor(productId) {
    this.productId = productId;

     this.shopify = new Shopify({
      // shopName: process.env.SHOPIFY_STOREFRONT_DOMAIN,
      // apiKey: process.env.SHOPIFY_API_KEY,
      // password: process.env.SHOPIFY_API_PASSWORD,  
      shopName: CONFIG.shopName,
      apiKey: CONFIG.apiKey,
      password: CONFIG.apiPassword,    
    });
   
  }

  // The methos gets all variants 
    async getFirstVariantId() {
    const products = await this.shopify.productVariant.list(this.productId);
    return products[0];
  }

  // The method create new variant
    async createVariant() {
      const params = {
        "sku": new Date(),
        "option1": "TEST-DAY-" + Math.floor(Math.random() * 600),
        "price": "17.00",
        "weight": 1.3,
      }

      await this.shopify.productVariant.create(this.productId, params);
      console.log('Product variant created');
    }

    // The method to delete product variant
    async deleteVariant(variantId) {
      try {
        await this.shopify.productVariant.delete(this.productId, variantId);
      } catch (e) {
        console.log(e, 'Something went wrong => deleteVariant()');
      }
    }

    // The method gets the first varinat ID and deletes it
    async deleteFirstVariant() {
      try {
        const lastVariantId = await this.getFirstVariantId();  
        await this.deleteVariant(lastVariantId.id);
        console.log('The product variant deleted'); 
      } catch (e) {
        console.log(e, 'Something went wrong => deleteFirstVariant()');
      }
  } 

    // The method deletes first varinat, then creates new variant
    async deleteCreateVariant() {
        try {
          await this.deleteFirstVariant();
          await this.createVariant();
        } catch (e) {
          console.log(e, 'Something went wrong');
        }
    }
}

module.exports = Variants;
