/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGun = /* GraphQL */ `
  subscription OnCreateGun($owner: String!) {
    onCreateGun(owner: $owner) {
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
export const onUpdateGun = /* GraphQL */ `
  subscription OnUpdateGun($owner: String!) {
    onUpdateGun(owner: $owner) {
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
export const onDeleteGun = /* GraphQL */ `
  subscription OnDeleteGun($owner: String!) {
    onDeleteGun(owner: $owner) {
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
export const onCreateActions = /* GraphQL */ `
  subscription OnCreateActions($owner: String!) {
    onCreateActions(owner: $owner) {
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
export const onUpdateActions = /* GraphQL */ `
  subscription OnUpdateActions($owner: String!) {
    onUpdateActions(owner: $owner) {
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
export const onDeleteActions = /* GraphQL */ `
  subscription OnDeleteActions($owner: String!) {
    onDeleteActions(owner: $owner) {
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
