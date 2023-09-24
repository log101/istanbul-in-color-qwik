import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import ColorExtractor from '~/components/color-extractor'
import { Pagination } from "~/components/pagination/pagination";

export default component$(() => {
  const pageCount = useSignal<number>(10)

  return (
    <>
      <ColorExtractor />
      <Pagination pageCount={pageCount} />
    </>
  );
});

export const head: DocumentHead = {
  title: "Istanbul in Color",
  meta: [
    {
      name: "description",
      content: "Explore the colors of Istanbul",
    },
  ],
};
