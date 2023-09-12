import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import ColorExtractor from '~/components/color-extractor'

export default component$(() => {
  return (
    <>
      <ColorExtractor />
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
