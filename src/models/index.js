// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Gun, Action } = initSchema(schema);

export {
  Gun,
  Action
};