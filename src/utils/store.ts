type Subscriber<T> = (value: T) => void;
type Updater<T> = Partial<T> | ((store: T) => Partial<T>);
type Unsubscribe = () => void;

export interface Store<T> {
  getState: () => T;
  subscribe: (fn: Subscriber<T>) => Unsubscribe;
  update: (fnOrObj: Updater<T>) => void;
}

type Constructor<T = {}> = new (...args: any[]) => T;

interface CustomElement<T> {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  stateChanged(state: T): void;
}

const IdFactory = () => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
};

/**
 * ```js
 * const UserStore = createStore({ name: 'Joshua' });
 * const unsubscribe = UserStore.subscribe({ name } => MyComponent.name = name)
 * unsubscribe()
 * ```
 */
export const createStore = <T extends Record<string, any>>(
  initialState: T
): Store<T> => {
  const store = { ...initialState } as T;
  const Id = IdFactory();
  const subscribers: Record<string, Subscriber<T>> = {};

  Object.keys(store).forEach(key => {
    let val = store[key];
    Object.defineProperty(store, key, {
      get() {
        return val;
      },
      set(newVal) {
        val = newVal;
        Object.values(subscribers).forEach(notify => notify({ ...store }));
      },
    });
  });

  return {
    getState: () => ({ ...store }),
    subscribe: fn => {
      const id = Id();
      subscribers[id] = fn;
      return () => {
        delete subscribers[id];
      };
    },
    update: fnOrObj => {
      const newState =
        typeof fnOrObj === 'function' ? fnOrObj({ ...store }) : fnOrObj;
      Object.entries(newState).forEach(([key, value]) => {
        store[key as keyof T] = value;
      });
    },
  };
};

export const createConnect =
  <T>(store: Store<T>) =>
  <U extends Constructor<CustomElement<T>>>(superclass: U) =>
    class extends superclass {
      private unsubscribe: Unsubscribe = () => {};

      connectedCallback(): void {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.unsubscribe = store.subscribe(this.stateChanged.bind(this));
        this.stateChanged(store.getState());
      }

      disconnectedCallback(): void {
        this.unsubscribe();

        if (super.disconnectedCallback) {
          super.disconnectedCallback();
        }
      }
    };
