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
  actions?: ModelActionConnection,
  _version?: number,
  _deleted?: boolean | null,
  _lastChangedAt?: number,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type ModelActionConnection = {
  __typename: "ModelActionConnection",
  items?:  Array<Action | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Action = {
  __typename: "Action",
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
  owner?: string | null,
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

export type CreateActionInput = {
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

export type ModelActionConditionInput = {
  title?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  shots?: ModelIntInput | null,
  date?: ModelStringInput | null,
  expenses?: ModelFloatInput | null,
  currency?: ModelStringInput | null,
  trainingNotes?: ModelStringInput | null,
  color?: ModelStringInput | null,
  gunID?: ModelIDInput | null,
  and?: Array< ModelActionConditionInput | null > | null,
  or?: Array< ModelActionConditionInput | null > | null,
  not?: ModelActionConditionInput | null,
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

export type UpdateActionInput = {
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

export type DeleteActionInput = {
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

export type ModelActionFilterInput = {
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
  and?: Array< ModelActionFilterInput | null > | null,
  or?: Array< ModelActionFilterInput | null > | null,
  not?: ModelActionFilterInput | null,
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
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
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
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
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
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
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
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateActionMutationVariables = {
  input?: CreateActionInput,
  condition?: ModelActionConditionInput | null,
};

export type CreateActionMutation = {
  createAction?:  {
    __typename: "Action",
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
        __typename: "ModelActionConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateActionMutationVariables = {
  input?: UpdateActionInput,
  condition?: ModelActionConditionInput | null,
};

export type UpdateActionMutation = {
  updateAction?:  {
    __typename: "Action",
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
        __typename: "ModelActionConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteActionMutationVariables = {
  input?: DeleteActionInput,
  condition?: ModelActionConditionInput | null,
};

export type DeleteActionMutation = {
  deleteAction?:  {
    __typename: "Action",
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
        __typename: "ModelActionConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
        __typename: "ModelActionConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
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
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
        __typename: "ModelActionConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncActionsQueryVariables = {
  filter?: ModelActionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncActionsQuery = {
  syncActions?:  {
    __typename: "ModelActionConnection",
    items?:  Array< {
      __typename: "Action",
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
        owner?: string | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetActionQueryVariables = {
  id?: string,
};

export type GetActionQuery = {
  getAction?:  {
    __typename: "Action",
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
        __typename: "ModelActionConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListActionsQueryVariables = {
  filter?: ModelActionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActionsQuery = {
  listActions?:  {
    __typename: "ModelActionConnection",
    items?:  Array< {
      __typename: "Action",
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
        owner?: string | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateGunSubscriptionVariables = {
  owner?: string,
};

export type OnCreateGunSubscription = {
  onCreateGun?:  {
    __typename: "Gun",
    id: string,
    name: string,
    color?: string | null,
    dateCreated: string,
    actions?:  {
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
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
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateGunSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateGunSubscription = {
  onUpdateGun?:  {
    __typename: "Gun",
    id: string,
    name: string,
    color?: string | null,
    dateCreated: string,
    actions?:  {
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
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
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteGunSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteGunSubscription = {
  onDeleteGun?:  {
    __typename: "Gun",
    id: string,
    name: string,
    color?: string | null,
    dateCreated: string,
    actions?:  {
      __typename: "ModelActionConnection",
      items?:  Array< {
        __typename: "Action",
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
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateActionSubscriptionVariables = {
  owner?: string,
};

export type OnCreateActionSubscription = {
  onCreateAction?:  {
    __typename: "Action",
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
        __typename: "ModelActionConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateActionSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateActionSubscription = {
  onUpdateAction?:  {
    __typename: "Action",
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
        __typename: "ModelActionConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteActionSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteActionSubscription = {
  onDeleteAction?:  {
    __typename: "Action",
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
        __typename: "ModelActionConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
