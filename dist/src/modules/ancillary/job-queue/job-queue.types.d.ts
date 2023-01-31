import PgBoss from 'pg-boss';
export declare type QueueName = string;
export declare type Handler = (data: PgBoss.Job) => void;
export declare type HandlersMap = {
    [key: QueueName]: Handler;
};
