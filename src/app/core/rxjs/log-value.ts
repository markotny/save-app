import {OperatorFunction} from 'rxjs';
import {tap} from 'rxjs/operators';

export function logValue<T>(message?: string): OperatorFunction<T, T> {
  return tap({
    next: value => console.log(message, value),
    error: value => console.log(message, value),
    complete: () => console.log(`${message}: complete`)
  });
}
