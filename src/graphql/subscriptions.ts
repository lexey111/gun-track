/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGun = /* GraphQL */ `
  subscription OnCreateGun {
    onCreateGun {
      id
      name
      actions {
        items {
          id
          title
          comment
          shots
          date
          expenses
          currency
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
export const onUpdateGun = /* GraphQL */ `
  subscription OnUpdateGun {
    onUpdateGun {
      id
      name
      actions {
        items {
          id
          title
          comment
          shots
          date
          expenses
          currency
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
export const onDeleteGun = /* GraphQL */ `
  subscription OnDeleteGun {
    onDeleteGun {
      id
      name
      actions {
        items {
          id
          title
          comment
          shots
          date
          expenses
          currency
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
export const onCreateActions = /* GraphQL */ `
  subscription OnCreateActions {
    onCreateActions {
      id
      title
      comment
      shots
      date
      expenses
      currency
      gunID
      gun {
        id
        name
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
export const onUpdateActions = /* GraphQL */ `
  subscription OnUpdateActions {
    onUpdateActions {
      id
      title
      comment
      shots
      date
      expenses
      currency
      gunID
      gun {
        id
        name
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
export const onDeleteActions = /* GraphQL */ `
  subscription OnDeleteActions {
    onDeleteActions {
      id
      title
      comment
      shots
      date
      expenses
      currency
      gunID
      gun {
        id
        name
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
