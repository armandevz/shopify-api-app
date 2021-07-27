import moment from 'moment';
import Shopify from 'shopify-api-node';
import { CONFIG } from '../../config/config';
import StockRules from '../StockRules';
import StockRuleExceptions from '../StockRulesExceptions';
import BaseController from '../BaseController';

require('dotenv').config({ path: '../../.env' });

export default class Variants extends BaseController {
  shopify = null;

  productId = null;

  stockRules = null;

  currentDate = null;

  stockRulesExceptions = null;

  // Variant variables
  variantPrice = null;

  variantWeight = null;

  variantQuantity = null;

  constructor(productId) {
    super();
    this.productId = productId;
    this.stockRules = new StockRules();
    this.stockRulesExceptions = new StockRuleExceptions();
    this.currentDate = new Date();

    this.shopify = new Shopify({
      shopName: CONFIG.shopName,
      apiKey: CONFIG.apiKey,
      password: CONFIG.apiPassword,
    });
  }

  // The methods gets all variants
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
    const currentDateFormat = moment(this.currentDate.date).format('YYYY-MM-DD');
    const stockRules = await this.stockRules.getStockRules(this.currentDate.getDay());
    const stockRulesExceptions = await this.stockRulesExceptions.getStockRulesExceptions(currentDateFormat);

    if (stockRulesExceptions) {
      this.variantPrice = stockRulesExceptions.price;
      this.variantWeight = stockRulesExceptions.weight;
      this.variantQuantity = stockRulesExceptions.inventory_quantity;
    } else {
      this.variantPrice = stockRules.price;
      this.variantWeight = stockRules.weight;
      this.variantQuantity = stockRules.inventory_quantity;
    }

    // This part planning to use if client wants to create a variant for day back
    // const yesterdaysDate = moment(this.currentDate.date).subtract(1, 'days');

    const skuFormatDate = moment(this.currentDate.date).format('[BC-]MM-DD-YYYY');

    // this part should be used for proper variant title
    // const skuFormatDateTitle = moment(yesterdaysDate).format('DD-MM-YYYY');

    try {
      const params = {
        sku: skuFormatDate,
        option1: `Back Copy: ${Math.floor(Math.random() * 600)}`,
        price: this.variantPrice,
        weight: this.variantWeight,
      };

      await this.shopify.productVariant.create(this.productId, params);

      // This part of code creats product variant quantity, default is 200
      const productVariants = await this.shopify.productVariant.list(this.productId);
      const lastProductVariant = productVariants[productVariants.length - 1];
      const lastVariantInventoryId = lastProductVariant.inventory_item_id;

      const allLocationList = await this.shopify.location.list();

      const requestedLocation = await allLocationList.find((location) => location.address1 === CONFIG.variantLocation);

      const params2 = {
        location_id: requestedLocation.id,
        inventory_item_id: lastVariantInventoryId,
        available: this.variantQuantity,
      };
      await this.shopify.inventoryLevel.set(params2);
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

  // The method gets the first variant ID and deletes it
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
    await this.deleteFirstVariant();
    await this.createVariant();
  }
}
