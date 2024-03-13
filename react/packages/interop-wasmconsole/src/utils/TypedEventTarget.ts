interface TypedEventListener<T extends Event = Event> {
  (evt: T): void;
}
interface TypedEventListenerObject<T extends Event = Event> {
  handleEvent(object: T): void;
}
type TypedEventListenerOrEventListenerObject<T extends Event = Event> =
  | TypedEventListener<T>
  | TypedEventListenerObject<T>;

export class TypedEventTarget<
  EventType extends string = string,
  T extends Event = Event
> extends EventTarget {
  addEventListener(
    type: EventType,
    callback: TypedEventListenerOrEventListenerObject<T> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    // FIXME
    // @ts-ignore
    super.addEventListener(type, callback, options);
  }

  dispatchEvent(event: T): boolean {
    return super.dispatchEvent(event);
  }

  removeEventListener(
    type: EventType,
    callback: TypedEventListenerOrEventListenerObject<T> | null,
    options?: boolean | EventListenerOptions | undefined
  ): void {
    // FIXME
    // @ts-ignore
    super.removeEventListener(type, callback, options);
  }
}
