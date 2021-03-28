// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Gun, Actions } = initSchema(schema);

export {
  Gun,
  Actions
};