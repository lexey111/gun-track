/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGunInput = {
  id?: string | null,
  name: string,
  color?: string | null,
  dateCreated: string,
  _version?: number | null,
};

export type ModelGunConditionInput = {
  name?: ModelStringInput | null,
  color?: ModelStringInput | null,
  dateCreated?: ModelStringInput | null,
  and?: Array< ModelGunConditionInput | null > | null,
  or?: Array< ModelGunConditionInput | null > | null,
  not?: ModelGunConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Gun = {
  __typename: "Gun",
  id?: string,
  name?: string,
  color?: string | null,
  dateCreated?: string,
  actions?: ModelActionsConnection,
  _version?: number,
  _deleted?: boolean | null,
  _lastChangedAt?: number,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelActionsConnection = {
  __typename: "ModelActionsConnection",
  items?:  Array<Actions | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Actions = {
  __typename: "Actions",
  id?: string,
  title?: string | null,
  comment?: string | null,
  shots?: number,
  date?: string,
  expenses?: number | null,
  currency?: string | null,
  trainingNotes?: string | null,
  color?: string | null,
  gunID?: string,
  gun?: Gun,
  _version?: number,
  _deleted?: boolean | null,
  _lastChangedAt?: number,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateGunInput = {
  id: string,
  name?: string | null,
  color?: string | null,
  dateCreated?: string | null,
  _version?: number | null,
};

export type DeleteGunInput = {
  id?: string | null,
  _version?: number | null,
};

export type CreateActionsInput = {
  id?: string | null,
  title?: string | null,
  comment?: string | null,
  shots: number,
  date: string,
  expenses?: number | null,
  currency?: string | null,
  trainingNotes?: string | null,
  color?: string | null,
  gunID: string,
  _version?: number | null,
};

export type ModelActionsConditionInput = {
  title?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  shots?: ModelIntInput | null,
  date?: ModelStringInput | null,
  expenses?: ModelFloatInput | null,
  currency?: ModelStringInput | null,
  trainingNotes?: ModelStringInput | null,
  color?: ModelStringInput | null,
  gunID?: ModelIDInput | null,
  and?: Array< ModelActionsConditionInput | null > | null,
  or?: Array< ModelActionsConditionInput | null > | null,
  not?: ModelActionsConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateActionsInput = {
  id: string,
  title?: string | null,
  comment?: string | null,
  shots?: number | null,
  date?: string | null,
  expenses?: number | null,
  currency?: string | null,
  trainingNotes?: string | null,
  color?: string | null,
  gunID?: string | null,
  _version?: number | null,
};

export type DeleteActionsInput = {
  id?: string | null,
  _version?: number | null,
};

export type ModelGunFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  color?: ModelStringInput | null,
  dateCreated?: ModelStringInput | null,
  and?: Array< ModelGunFilterInput | null > | null,
  or?: Array< ModelGunFilterInput | null > | null,
  not?: ModelGunFilterInput | null,
};

export type ModelGunConnection = {
  __typename: "ModelGunConnection",
  items?:  Array<Gun | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelActionsFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  shots?: ModelIntInput | null,
  date?: ModelStringInput | null,
  expenses?: ModelFloatInput | null,
  currency?: ModelStringInput | null,
  trainingNotes?: ModelStringInput | null,
  color?: ModelStringInput | null,
  gunID?: ModelIDInput | null,
  and?: Array< ModelActionsFilterInput | null > | null,
  or?: Array< ModelActionsFilterInput | null > | null,
  not?: ModelActionsFilterInput | null,
};

export type CreateGunMutationVariables = {
  input?: CreateGunInput,
  condition?: ModelGunConditionInput | null,
};

export type CreateGunMutation = {
  createGun?:  {
    __typename: "Gun",
    id: string,
    name: string,
    color?: string | null,
    dateCreated: string,
    actions?:  {
      __typename: "ModelActionsConnection",
      items?:  Array< {
        __typename: "Actions",
        id: string,
        title?: string | null,
        comment?: string | null,
        shots: number,
        date: string,
        expenses?: number | null,
        currency?: string | null,
        trainingNotes?: string | null,
        color?: string | null,
        gunID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGunMutationVariables = {
  input?: UpdateGunInput,
  condition?: ModelGunConditionInput | null,
};

export type UpdateGunMutation = {
  updateGun?:  {
    __typename: "Gun",
    id: string,
    name: string,
    color?: string | null,
    dateCreated: string,
    actions?:  {
      __typename: "ModelActionsConnection",
      items?:  Array< {
        __typename: "Actions",
        id: string,
        title?: string | null,
        comment?: string | null,
        shots: number,
        date: string,
        expenses?: number | null,
        currency?: string | null,
        trainingNotes?: string | null,
        color?: string | null,
        gunID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGunMutationVariables = {
  input?: DeleteGunInput,
  condition?: ModelGunConditionInput | null,
};

export type DeleteGunMutation = {
  deleteGun?:  {
    __typename: "Gun",
    id: string,
    name: string,
    color?: string | null,
    dateCreated: string,
    actions?:  {
      __typename: "ModelActionsConnection",
      items?:  Array< {
        __typename: "Actions",
        id: string,
        title?: string | null,
        comment?: string | null,
        shots: number,
        date: string,
        expenses?: number | null,
        currency?: string | null,
        trainingNotes?: string | null,
        color?: string | null,
        gunID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateActionsMutationVariables = {
  input?: CreateActionsInput,
  condition?: ModelActionsConditionInput | null,
};

export type CreateActionsMutation = {
  createActions?:  {
    __typename: "Actions",
    id: string,
    title?: string | null,
    comment?: string | null,
    shots: number,
    date: string,
    expenses?: number | null,
    currency?: string | null,
    trainingNotes?: string | null,
    color?: string | null,
    gunID: string,
    gun?:  {
      __typename: "Gun",
      id: string,
      name: string,
      color?: string | null,
      dateCreated: string,
      actions?:  {
        __typename: "ModelActionsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateActionsMutationVariables = {
  input?: UpdateActionsInput,
  condition?: ModelActionsConditionInput | null,
};

export type UpdateActionsMutation = {
  updateActions?:  {
    __typename: "Actions",
    id: string,
    title?: string | null,
    comment?: string | null,
    shots: number,
    date: string,
    expenses?: number | null,
    currency?: string | null,
    trainingNotes?: string | null,
    color?: string | null,
    gunID: string,
    gun?:  {
      __typename: "Gun",
      id: string,
      name: string,
      color?: string | null,
      dateCreated: string,
      actions?:  {
        __typename: "ModelActionsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteActionsMutationVariables = {
  input?: DeleteActionsInput,
  condition?: ModelActionsConditionInput | null,
};

export type DeleteActionsMutation = {
  deleteActions?:  {
    __typename: "Actions",
    id: string,
    title?: string | null,
    comment?: string | null,
    shots: number,
    date: string,
    expenses?: number | null,
    currency?: string | null,
    trainingNotes?: string | null,
    color?: string | null,
    gunID: string,
    gun?:  {
      __typename: "Gun",
      id: string,
      name: string,
      color?: string | null,
      dateCreated: string,
      actions?:  {
        __typename: "ModelActionsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SyncGunsQueryVariables = {
  filter?: ModelGunFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncGunsQuery = {
  syncGuns?:  {
    __typename: "ModelGunConnection",
    items?:  Array< {
      __typename: "Gun",
      id: string,
      name: string,
      color?: string | null,
      dateCreated: string,
      actions?:  {
        __typename: "ModelActionsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetGunQueryVariables = {
  id?: string,
};

export type GetGunQuery = {
  getGun?:  {
    __typename: "Gun",
    id: string,
    name: string,
    color?: string | null,
    dateCreated: string,
    actions?:  {
      __typename: "ModelActionsConnection",
      items?:  Array< {
        __typename: "Actions",
        id: string,
        title?: string | null,
        comment?: string | null,
        shots: number,
        date: string,
        expenses?: number | null,
        currency?: string | null,
        trainingNotes?: string | null,
        color?: string | null,
        gunID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGunsQueryVariables = {
  filter?: ModelGunFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGunsQuery = {
  listGuns?:  {
    __typename: "ModelGunConnection",
    items?:  Array< {
      __typename: "Gun",
      id: string,
      name: string,
      color?: string | null,
      dateCreated: string,
      actions?:  {
        __typename: "ModelActionsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncActionsQueryVariables = {
  filter?: ModelActionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncActionsQuery = {
  syncActions?:  {
    __typename: "ModelActionsConnection",
    items?:  Array< {
      __typename: "Actions",
      id: string,
      title?: string | null,
      comment?: string | null,
      shots: number,
      date: string,
      expenses?: number | null,
      currency?: string | null,
      trainingNotes?: string | null,
      color?: string | null,
      gunID: string,
      gun?:  {
        __typename: "Gun",
        id: string,
        name: string,
        color?: string | null,
        dateCreated: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetActionsQueryVariables = {
  id?: string,
};

export type GetActionsQuery = {
  getActions?:  {
    __typename: "Actions",
    id: string,
    title?: string | null,
    comment?: string | null,
    shots: number,
    date: string,
    expenses?: number | null,
    currency?: string | null,
    trainingNotes?: string | null,
    color?: string | null,
    gunID: string,
    gun?:  {
      __typename: "Gun",
      id: string,
      name: string,
      color?: string | null,
      dateCreated: string,
      actions?:  {
        __typename: "ModelActionsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListActionssQueryVariables = {
  filter?: ModelActionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActionssQuery = {
  listActionss?:  {
    __typename: "ModelActionsConnection",
    items?:  Array< {
      __typename: "Actions",
      id: string,
      title?: string | null,
      comment?: string | null,
      shots: number,
      date: string,
      expenses?: number | null,
      currency?: string | null,
      trainingNotes?: string | null,
      color?: string | null,
      gunID: string,
      gun?:  {
        __typename: "Gun",
        id: string,
        name: string,
        color?: string | null,
        dateCreated: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateGunSubscription = {
  onCreateGun?:  {
    __typename: "Gun",
    id: string,
    name: string,
    color?: string | null,
    dateCreated: string,
    actions?:  {
      __typename: "ModelActionsConnection",
      items?:  Array< {
        __typename: "Actions",
        id: string,
        title?: string | null,
        comment?: string | null,
        shots: number,
        date: string,
        expenses?: number | null,
        currency?: string | null,
        trainingNotes?: string | null,
        color?: string | null,
        gunID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGunSubscription = {
  onUpdateGun?:  {
    __typename: "Gun",
    id: string,
    name: string,
    color?: string | null,
    dateCreated: string,
    actions?:  {
      __typename: "ModelActionsConnection",
      items?:  Array< {
        __typename: "Actions",
        id: string,
        title?: string | null,
        comment?: string | null,
        shots: number,
        date: string,
        expenses?: number | null,
        currency?: string | null,
        trainingNotes?: string | null,
        color?: string | null,
        gunID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGunSubscription = {
  onDeleteGun?:  {
    __typename: "Gun",
    id: string,
    name: string,
    color?: string | null,
    dateCreated: string,
    actions?:  {
      __typename: "ModelActionsConnection",
      items?:  Array< {
        __typename: "Actions",
        id: string,
        title?: string | null,
        comment?: string | null,
        shots: number,
        date: string,
        expenses?: number | null,
        currency?: string | null,
        trainingNotes?: string | null,
        color?: string | null,
        gunID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateActionsSubscription = {
  onCreateActions?:  {
    __typename: "Actions",
    id: string,
    title?: string | null,
    comment?: string | null,
    shots: number,
    date: string,
    expenses?: number | null,
    currency?: string | null,
    trainingNotes?: string | null,
    color?: string | null,
    gunID: string,
    gun?:  {
      __typename: "Gun",
      id: string,
      name: string,
      color?: string | null,
      dateCreated: string,
      actions?:  {
        __typename: "ModelActionsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateActionsSubscription = {
  onUpdateActions?:  {
    __typename: "Actions",
    id: string,
    title?: string | null,
    comment?: string | null,
    shots: number,
    date: string,
    expenses?: number | null,
    currency?: string | null,
    trainingNotes?: string | null,
    color?: string | null,
    gunID: string,
    gun?:  {
      __typename: "Gun",
      id: string,
      name: string,
      color?: string | null,
      dateCreated: string,
      actions?:  {
        __typename: "ModelActionsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteActionsSubscription = {
  onDeleteActions?:  {
    __typename: "Actions",
    id: string,
    title?: string | null,
    comment?: string | null,
    shots: number,
    date: string,
    expenses?: number | null,
    currency?: string | null,
    trainingNotes?: string | null,
    color?: string | null,
    gunID: string,
    gun?:  {
      __typename: "Gun",
      id: string,
      name: string,
      color?: string | null,
      dateCreated: string,
      actions?:  {
        __typename: "ModelActionsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
