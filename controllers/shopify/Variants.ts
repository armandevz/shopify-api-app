require('dotenv').config({ path: '../../.env' });
import moment from 'moment';
import Shopify from 'shopify-api-node';
import { CONFIG } from '../../config/config';
import StockRules from '../StockRules';
import StockRuleExceptions from '../StockRulesExceptions';
import BaseController from '../BaseController';

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

    try {
      const params = {
        "sku": this.currentDate,
        "option1": "Back copy variant " + Math.floor(Math.random() * 600),
        "price": this.variantPrice,
        "weight": this.variantWeight
      }

      await this.shopify.productVariant.create(this.productId, params);

      // This part of code creats product variant quantity, default is 200
      const productVariants = await this.shopify.productVariant.list(this.productId);
      const lastProductVariant = productVariants[productVariants.length - 1];
      const lastVariantInventoryId = lastProductVariant.inventory_item_id;

      const allLocationList = await this.shopify.location.list();

      const requestedLocation = await allLocationList.find((location) => {
        return location.address1 === CONFIG.variantLocation;
      });

      const requestedLocationId = requestedLocation.id;

      const params2 = {
        "location_id": requestedLocationId,
        "inventory_item_id": lastVariantInventoryId,
        "available": this.variantQuantity
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
    await this.deleteFirstVariant();
    await this.createVariant();
  }
}