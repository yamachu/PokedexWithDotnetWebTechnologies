import { TypedEventTarget } from "./TypedEventTarget";

// NOTE: Internal use, we don't subscribe this event
// For useSyncExternalStore
type MapEventDetail<K, V> =
  | {
      type: "delete";
      key: K;
    }
  | {
      type: "set";
      key: K;
      value: V;
    };

type CustomMapEvent<K, V> = CustomEvent<MapEventDetail<K, V>>;

export class EventEmitMap<
  K extends string | number = string,
  V = any
> extends TypedEventTarget<MapEventDetail<K, V>["type"], CustomMapEvent<K, V>> {
  private _map: Map<K, V>;
  constructor(args?: ConstructorParameters<typeof Map<K, V>>) {
    super();
    if (args === undefined || args === null) {
      this._map = new Map();
    } else {
      this._map = new Map<K, V>(args[0]);
    }
  }

  delete(key: K): boolean {
    const result = this._map.delete(key);
    this.dispatchEvent(
      new CustomEvent<MapEventDetail<K, V>>("delete", {
        detail: {
          type: "delete",
          key,
        },
      })
    );
    return result;
  }

  get(key: K): V | undefined {
    return this._map.get(key);
  }

  set(key: K, value: V): this {
    this._map.set(key, value);
    this.dispatchEvent(
      new CustomEvent<MapEventDetail<K, V>>("set", {
        detail: {
          type: "set",
          key,
          value,
        },
      })
    );
    return this;
  }

  get size(): number {
    return this._map.size;
  }
}
