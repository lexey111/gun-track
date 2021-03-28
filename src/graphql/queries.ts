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
      nextToken
      startedAt
    }
  }
`;
export const syncActions = /* GraphQL */ `
  query SyncActions(
    $filter: ModelActionsFilterInput
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
        comment
        shots
        date
        expenses
        currency
        gunID
        gun {
          id
          name
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
      nextToken
      startedAt
    }
  }
`;
export const getActions = /* GraphQL */ `
  query GetActions($id: ID!) {
    getActions(id: $id) {
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
export const listActionss = /* GraphQL */ `
  query ListActionss(
    $filter: ModelActionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActionss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
