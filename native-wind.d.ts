declare module 'native-wind' {
    export type TWStyle = string | { [key: string]: any };
    export const tw: (classNames: string) => TWStyle;
  }