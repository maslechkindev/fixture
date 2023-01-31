import { Knex } from 'modules/integrations/knex';
import { KnexTransaction } from 'interfaces/db/knexTransaction.interface';
declare const _default: (knex: Knex) => Promise<KnexTransaction>;
export default _default;
