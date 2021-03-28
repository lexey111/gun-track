import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Gun {
  readonly id: string;
  readonly name: string;
  readonly actions?: (Actions | null)[];
  constructor(init: ModelInit<Gun>);
  static copyOf(source: Gun, mutator: (draft: MutableModel<Gun>) => MutableModel<Gun> | void): Gun;
}

export declare class Actions {
  readonly id: string;
  readonly title?: string;
  readonly comment?: string;
  readonly shots: number;
  readonly date: string;
  readonly expenses?: number;
  readonly currency?: string;
  readonly gun?: Gun;
  constructor(init: ModelInit<Actions>);
  static copyOf(source: Actions, mutator: (draft: MutableModel<Actions>) => MutableModel<Actions> | void): Actions;
}