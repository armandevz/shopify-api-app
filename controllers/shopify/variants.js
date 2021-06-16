require('dotenv').config({path:'../../.env'});
const Shopify = require('shopify-api-node');

const productId = 6667291459782;

class Variants {
  shopify = null;
  constructor() {
     this.shopify = new Shopify({
      shopName: process.env.STOREFRONT_DOMAIN,
      apiKey: process.env.SHOPIFY_API_KEY,
      password: process.env.SHOPIFY_API_PASSWORD,      
    });
  }

  // The methos gets all variants 
    async getVariant() {
    const products = await this.shopify.productVariant.list(productId);
    return products[0];
  }

  // The method create new variant
    async createVariant() {
      const params = {
        "option1": "TEST-DAY-" + Math.floor(Math.random() * 600),
        "price": "17.00"
      }
      await this.shopify.productVariant.create(productId, params);
      console.log('Product variant created');
    }

    // The method to delete product variant
    async deleteVariant(variantId) {
      try {
        await this.shopify.productVariant.delete(productId, variantId);
      } catch (error) {
        console.log(e, 'Something went wrong => deleteVariant()');
      }
    }

    // The method gets the first varinat ID and deletes it
    async deleteLast() {
      try {
        const lastVariantId = await this.getVariant();  
        await this.deleteVariant(lastVariantId.id);
        console.log('The product variant deleted'); 
      } catch (e) {
        console.log(e, 'Something went wrong => deleteLast()');
      }
 
  } 

    // The method deletes first varinat, then creates new variant
    async deleteCreateVariant() {
        try {
          await this.deleteLast();
          await this.createVariant();
        } catch (e) {
          console.log(e, 'Something went wrong');
        }
    }
}

module.exports = Variants;
