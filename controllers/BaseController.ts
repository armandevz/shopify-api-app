export default abstract class BaseController {
  protected logError(error, className, methodName): void {
    console.log(`${className} :: ${methodName} :: error`, error);
    throw new Error(error);
  }
}