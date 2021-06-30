
class BaseController {
  logError(error, className, methodName) {
    console.log(`${className} :: ${methodName} :: error`, error);
    throw new Error(error);
  }
}

module.exports = BaseController;
