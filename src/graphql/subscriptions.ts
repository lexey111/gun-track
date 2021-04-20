/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGun = /* GraphQL */ `
  subscription OnCreateGun($owner: String!) {
    onCreateGun(owner: $owner) {
      id
      name
      make
      model
      notes
      caliber
      dateCreated
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
export const onUpdateGun = /* GraphQL */ `
  subscription OnUpdateGun($owner: String!) {
    onUpdateGun(owner: $owner) {
      id
      name
      make
      model
      notes
      caliber
      dateCreated
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
export const onDeleteGun = /* GraphQL */ `
  subscription OnDeleteGun($owner: String!) {
    onDeleteGun(owner: $owner) {
      id
      name
      make
      model
      notes
      caliber
      dateCreated
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
export const onCreateAction = /* GraphQL */ `
  subscription OnCreateAction($owner: String!) {
    onCreateAction(owner: $owner) {
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
export const onUpdateAction = /* GraphQL */ `
  subscription OnUpdateAction($owner: String!) {
    onUpdateAction(owner: $owner) {
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
export const onDeleteAction = /* GraphQL */ `
  subscription OnDeleteAction($owner: String!) {
    onDeleteAction(owner: $owner) {
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
