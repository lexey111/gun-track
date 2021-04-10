import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Gun {
  readonly id: string;
  readonly name: string;
  readonly color?: string;
  readonly dateCreated: string;
  readonly actions?: (Action | null)[];
  constructor(init: ModelInit<Gun>);
  static copyOf(source: Gun, mutator: (draft: MutableModel<Gun>) => MutableModel<Gun> | void): Gun;
}

export declare class Action {
  readonly id: string;
  readonly title?: string;
  readonly comment?: string;
  readonly shots: number;
  readonly date: string;
  readonly expenses?: number;
  readonly currency?: string;
  readonly trainingNotes?: string;
  readonly color?: string;
  readonly gun?: Gun;
  constructor(init: ModelInit<Action>);
  static copyOf(source: Action, mutator: (draft: MutableModel<Action>) => MutableModel<Action> | void): Action;
}