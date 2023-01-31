export default interface CustomFreeBetInterface {
  title: string;
  info: string;
  durationMin: number;
  betLimit: number;
  notifyInSec: number;
  lockOdds: boolean;
  markets: Array<string>;
}
