/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGun = /* GraphQL */ `
  mutation CreateGun(
    $input: CreateGunInput!
    $condition: ModelGunConditionInput
  ) {
    createGun(input: $input, condition: $condition) {
      id
      name
      make
      model
      notes
      caliber
      dateCreated
      photo
      actions {
        items {
          id
          title
          type
          comment
          shots
          date
          expenses
          currency
          trainingNotes
          gunID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateGun = /* GraphQL */ `
  mutation UpdateGun(
    $input: UpdateGunInput!
    $condition: ModelGunConditionInput
  ) {
    updateGun(input: $input, condition: $condition) {
      id
      name
      make
      model
      notes
      caliber
      dateCreated
      photo
      actions {
        items {
          id
          title
          type
          comment
          shots
          date
          expenses
          currency
          trainingNotes
          gunID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteGun = /* GraphQL */ `
  mutation DeleteGun(
    $input: DeleteGunInput!
    $condition: ModelGunConditionInput
  ) {
    deleteGun(input: $input, condition: $condition) {
      id
      name
      make
      model
      notes
      caliber
      dateCreated
      photo
      actions {
        items {
          id
          title
          type
          comment
          shots
          date
          expenses
          currency
          trainingNotes
          gunID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createAction = /* GraphQL */ `
  mutation CreateAction(
    $input: CreateActionInput!
    $condition: ModelActionConditionInput
  ) {
    createAction(input: $input, condition: $condition) {
      id
      title
      type
      comment
      shots
      date
      expenses
      currency
      trainingNotes
      gunID
      gun {
        id
        name
        make
        model
        notes
        caliber
        dateCreated
        photo
        actions {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateAction = /* GraphQL */ `
  mutation UpdateAction(
    $input: UpdateActionInput!
    $condition: ModelActionConditionInput
  ) {
    updateAction(input: $input, condition: $condition) {
      id
      title
      type
      comment
      shots
      date
      expenses
      currency
      trainingNotes
      gunID
      gun {
        id
        name
        make
        model
        notes
        caliber
        dateCreated
        photo
        actions {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteAction = /* GraphQL */ `
  mutation DeleteAction(
    $input: DeleteActionInput!
    $condition: ModelActionConditionInput
  ) {
    deleteAction(input: $input, condition: $condition) {
      id
      title
      type
      comment
      shots
      date
      expenses
      currency
      trainingNotes
      gunID
      gun {
        id
        name
        make
        model
        notes
        caliber
        dateCreated
        photo
        actions {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
