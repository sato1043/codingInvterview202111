import { AxiosError } from 'axios';
import _ from 'lodash';
import React, { PropsWithChildren } from 'react';
import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithoutInitialState } from 'typescript-fsa-reducers';

import { user1 } from '../__tests__/fixtures';

import { APP_NAME } from './constants';
import { User } from './domain';

/**
 * store
 */

type CorePayload = {
  user: User | undefined;
  otherExample: string;
};

class ApiStatus {
  loading: boolean;
  messages: (string | never)[];
  error: AxiosError | undefined;
  constructor(params?: Partial<ApiStatus>) {
    this.loading = params?.loading || false;
    this.messages = params?.messages || [];
    this.error = params?.error || undefined;
  }
}

type Store = CorePayload & { apiStatusMap: Map<keyof CorePayload, ApiStatus> };

const initialStore: Store = {
  user: undefined,
  otherExample: '',
  apiStatusMap: new Map<keyof CorePayload, ApiStatus>(),
};

const StoreContext = React.createContext<{
  store: Store;
  dispatch: React.Dispatch<ActionType> | undefined;
}>({
  store: _.cloneDeep(initialStore),
  dispatch: undefined,
});

export const StoreProvider: React.VFC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [store, dispatch] = React.useReducer(
    reducer,
    _.cloneDeep(initialStore),
  );
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

/**
 * actions
 */

const AC = actionCreatorFactory(APP_NAME);
const actionCreators = {
  storeReset: AC('STORE_RESET'),
  userReset: AC('USER_RESET'),
  userFetching: AC('USER_FETCHING'),
  userFetchOK: AC<Pick<CorePayload, 'user'>>('USER_FETCH_OK'),
  userFetchNG: AC<{ apiStatus: ApiStatus }>('USER_FETCH_NG'),
};
type ActionCreatorsType = typeof actionCreators[keyof typeof actionCreators];
type ActionType = ReturnType<ActionCreatorsType>;
type ReducerType = React.Reducer<Store, ActionType>;
type DispatchersType = {
  [K in keyof typeof actionCreators]: (
    payload: Parameters<typeof actionCreators[K]>[0],
  ) => void;
};

const reducer: ReducerType = reducerWithoutInitialState<Store>()
  .case(actionCreators.storeReset, () => _.cloneDeep(initialStore))

  .case(actionCreators.userFetching, (st) => {
    if (!st.apiStatusMap.get('user')?.loading)
      st.apiStatusMap.set('user', new ApiStatus({ loading: true }));
    return st;
  })
  .case(actionCreators.userReset, (st) => {
    st.apiStatusMap.delete('user');
    return { ...st, user: _.cloneDeep(initialStore.user) };
  })
  .case(actionCreators.userFetchOK, (st, { user }) => {
    st.apiStatusMap.delete('user');
    if (!user) return st;
    if (_.isEqual(st.user, user)) return st;
    return { ...st, user };
  })
  .case(actionCreators.userFetchNG, (st, { apiStatus }) => {
    st.apiStatusMap.set('user', new ApiStatus(apiStatus));
    return st; // user value will stay current
  })

  // .cases<any>(_.map(actionCreators), (st, pl) => {
  //   return ({...st, ...pl}); // bug: このハンドラがあると他のハンドラが処理できないので注意
  // })
  .default((st) => st);

/**
 * action methods
 */
type StoreResetType = () => void;
type UserResetType = () => void;
type UserFetchType = () => Promise<CorePayload['user'] | undefined>;

interface Methods {
  ready: boolean;
  apiStatus: (forWhat: keyof CorePayload) => ApiStatus | undefined;
  storeReset: StoreResetType;
  userReset: UserResetType;
  userFetch: UserFetchType;
}

type MethodDeps = {
  store: Store;
  dispatchers: DispatchersType | undefined;
};

type UseStore = Store & Methods;

export default function useStore(): UseStore {
  const { store, dispatch } = React.useContext(StoreContext);

  const dispatchers: DispatchersType | undefined = React.useMemo(
    () =>
      !dispatch
        ? undefined
        : {
            storeReset: () => dispatch(actionCreators.storeReset()),
            userReset: () => dispatch(actionCreators.userReset()),
            userFetching: () => dispatch(actionCreators.userFetching()),
            userFetchOK: ({ user }) =>
              dispatch(actionCreators.userFetchOK({ user })),
            userFetchNG: ({ apiStatus }) =>
              dispatch(actionCreators.userFetchNG({ apiStatus })),
          },
    [dispatch],
  );

  const deps: MethodDeps = React.useMemo(
    () => ({
      store,
      dispatchers,
      // or more dependencies here to hand over to a implementation method
    }),
    [store, dispatchers],
  );

  return {
    ...store,
    ready: !!dispatch,
    apiStatus: (forWhat: keyof CorePayload) => store.apiStatusMap.get(forWhat),
    storeReset: React.useCallback<StoreResetType>(
      () => storeResetImpl(deps),
      [deps],
    ),
    userReset: React.useCallback<UserResetType>(
      () => userResetImpl(deps),
      [deps],
    ),
    userFetch: React.useCallback<UserFetchType>(
      () => userFetchImpl(deps),
      [deps],
    ),
  };
}

function storeResetImpl({ dispatchers }: MethodDeps) {
  if (!dispatchers) return;
  dispatchers.storeReset();
}

function userResetImpl({ dispatchers }: MethodDeps) {
  if (!dispatchers) return;
  dispatchers.userReset();
}

async function userFetchImpl({ dispatchers }: MethodDeps) {
  if (!dispatchers) return;
  try {
    dispatchers.userFetching();
    // const user = await fetchOrSo(...) // TODO here API fetch or something
    const user = await new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve(user1);
      }, 1000);
    });
    if (!user) {
      // throw new Error() with apiStatus
    }
    dispatchers.userFetchOK({ user });
    return user;
  } catch (e) {
    dispatchers.userFetchNG({
      apiStatus: new ApiStatus({
        // apiStatus: ... // extract api status from api response or so.
      }),
    });
  }
}
