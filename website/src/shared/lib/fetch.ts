import type { QueryClient } from "@tanstack/react-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { radEventListeners } from "rad-event-listeners";
import { up } from "up-fetch";

export interface PrefetchContext {
  queryClient: QueryClient;
  signal?: AbortSignal;
}

export const upfetch = up(fetch);

export const preloadImage = createIsomorphicFn()
  .client((src: string) => {
    const { promise, resolve, reject } = Promise.withResolvers<void>();
    const image = new Image();
    const unsub = radEventListeners(
      image,
      {
        load: () => resolve(),
        error: (event) => reject((event as ErrorEvent).error),
      },
      { once: true },
    );
    image.src = src;
    return promise.finally(unsub);
  })
  .server(() => Promise.resolve());

export const preloadImages = (sources: Iterable<string>) =>
  Promise.all(Array.from(sources, preloadImage));
