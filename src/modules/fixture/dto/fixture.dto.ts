export interface FixtureDto {
  id: string;
  name: string;
  competition: string;
  startTime: Date;
  state: string;
  currentPeriod: string;
  active: boolean | string;
}
