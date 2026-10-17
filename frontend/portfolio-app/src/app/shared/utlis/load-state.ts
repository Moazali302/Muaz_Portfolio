import { HttpErrorResponse } from '@angular/common/http';
import { Observable, OperatorFunction, catchError, map, of, startWith } from 'rxjs';

export type LoadState<T> =
  | { readonly status: 'loading' }
  | { readonly status: 'ready'; readonly data: T }
  | { readonly status: 'error'; readonly notFound: boolean };

/** Maps an HTTP stream to a `LoadState` so views render loading / ready / error uniformly. */
export function toLoadState<T>(): OperatorFunction<T, LoadState<T>> {
  return (source: Observable<T>) =>
    source.pipe(
      map((data): LoadState<T> => ({ status: 'ready', data })),
      startWith<LoadState<T>>({ status: 'loading' }),
      catchError((error: unknown) =>
        of<LoadState<T>>({
          status: 'error',
          notFound: error instanceof HttpErrorResponse && error.status === 404,
        }),
      ),
    );
}