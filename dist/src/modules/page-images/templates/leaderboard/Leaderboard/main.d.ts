import { PrizeCurrency } from './components/row';
export declare const main: (rows: Array<{
    place: string;
    userName: string;
    totalPoints: string;
    prizeCurrency?: PrizeCurrency;
    prizeAmountOrTangible: string | number;
    isUser: boolean;
}>) => string;
