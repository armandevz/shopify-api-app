require('dotenv').config({path:'../../.env'});
const Shopify = require('shopify-api-node');
const CONFIG = require('../../config/config');
const BaseController = require('../BaseController');

class Variants extends BaseController {
  shopify = null;
  productId = null;

  constructor(productId) {
    super();
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
    try {
      const products = await this.shopify.productVariant.list(this.productId);
      return products[0];
    } catch (e) {
      this.logError(e, 'Variants', 'getFirstVariantId()');
    }
  }

  // The method create new variant
    async createVariant() {
      try {
        const params = {
          "sku": new Date(),
          "option1": "TEST-DAY-" + Math.floor(Math.random() * 600),
          "price": "17.00",
          "weight": 1.3,
        }
  
        await this.shopify.productVariant.create(this.productId, params);
  
        // This part of code creats product variant quantity, default is 200
        const productVariants = await this.shopify.productVariant.list(this.productId);
        const lastProductVariant = productVariants[productVariants.length - 1];
        const lastVariantInventoryId = lastProductVariant.inventory_item_id;
  
        const allLocationList = await this.shopify.location.list();
  
        const requestedLocation = await allLocationList.find((location) => {
          return location.address1 === '151 Blair Park Road';
        });
  
        const requestedLocationId = requestedLocation.id;
  
        const params2 = {
          "location_id": requestedLocationId,
          "inventory_item_id": lastVariantInventoryId,
          "available": 207
        }
        const inventoryLevel = await this.shopify.inventoryLevel.set(params2);
        console.log('Product variant created');
      } catch (e) {
        this.logError(e, 'Variants', 'createVariant()');
      }
    }

    // The method to delete product variant
    async deleteVariant(variantId) {
      try {
        await this.shopify.productVariant.delete(this.productId, variantId);
      } catch (e) {
        this.logError(e, 'Variants', 'deleteVariant()');
      }
    }

    // The method gets the first varinat ID and deletes it
    async deleteFirstVariant() {
      try {
        const lastVariantId = await this.getFirstVariantId();  
        await this.deleteVariant(lastVariantId.id);
        console.log('The product variant deleted'); 
      } catch (e) {
        this.logError(e, 'Variants', 'deleteFirstVariant()');
      }
  } 

    // The method deletes first varinat, then creates new variant
    async deleteCreateVariant() {
        try {
          await this.deleteFirstVariant();
          await this.createVariant();
        } catch (e) {
          this.logError(e, 'Variants', 'deleteCreateVariant()');
        }
    }
}

module.exports = Variants;
