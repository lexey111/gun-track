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
      color
      dateCreated
      actions {
        items {
          id
          title
          comment
          shots
          date
          expenses
          currency
          trainingNotes
          color
          gunID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      color
      dateCreated
      actions {
        items {
          id
          title
          comment
          shots
          date
          expenses
          currency
          trainingNotes
          color
          gunID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      color
      dateCreated
      actions {
        items {
          id
          title
          comment
          shots
          date
          expenses
          currency
          trainingNotes
          color
          gunID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createActions = /* GraphQL */ `
  mutation CreateActions(
    $input: CreateActionsInput!
    $condition: ModelActionsConditionInput
  ) {
    createActions(input: $input, condition: $condition) {
      id
      title
      comment
      shots
      date
      expenses
      currency
      trainingNotes
      color
      gunID
      gun {
        id
        name
        color
        dateCreated
        actions {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateActions = /* GraphQL */ `
  mutation UpdateActions(
    $input: UpdateActionsInput!
    $condition: ModelActionsConditionInput
  ) {
    updateActions(input: $input, condition: $condition) {
      id
      title
      comment
      shots
      date
      expenses
      currency
      trainingNotes
      color
      gunID
      gun {
        id
        name
        color
        dateCreated
        actions {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteActions = /* GraphQL */ `
  mutation DeleteActions(
    $input: DeleteActionsInput!
    $condition: ModelActionsConditionInput
  ) {
    deleteActions(input: $input, condition: $condition) {
      id
      title
      comment
      shots
      date
      expenses
      currency
      trainingNotes
      color
      gunID
      gun {
        id
        name
        color
        dateCreated
        actions {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
