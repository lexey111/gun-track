/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncGuns = /* GraphQL */ `
  query SyncGuns(
    $filter: ModelGunFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGuns(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getGun = /* GraphQL */ `
  query GetGun($id: ID!) {
    getGun(id: $id) {
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
export const listGuns = /* GraphQL */ `
  query ListGuns(
    $filter: ModelGunFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGuns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncActions = /* GraphQL */ `
  query SyncActions(
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncActions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        gun {
          id
          name
          make
          model
          notes
          caliber
          dateCreated
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
      nextToken
      startedAt
    }
  }
`;
export const getAction = /* GraphQL */ `
  query GetAction($id: ID!) {
    getAction(id: $id) {
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
export const listActions = /* GraphQL */ `
  query ListActions(
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        gun {
          id
          name
          make
          model
          notes
          caliber
          dateCreated
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
      nextToken
      startedAt
    }
  }
`;
