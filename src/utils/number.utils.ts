export abstract class NumberUtils {
  public static hasOnlyNumbers = (str: string) => {
    return /^\d+$/.test(str);
  };
}
