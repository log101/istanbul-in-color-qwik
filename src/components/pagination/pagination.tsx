import type { Signal } from '@builder.io/qwik';
import { component$, useSignal } from '@builder.io/qwik';

export interface PaginationProps {
  pageCount: Signal<number>
}

export const Pagination = component$<PaginationProps>(({pageCount}) => {
  const currentPage = useSignal<number>(1)

  return (
    <div class="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div class="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
        <PreviousButton currentPage={currentPage} />
        <PageList currentPage={currentPage} pageCount={pageCount} />
        <NextButton currentPage={currentPage} />
      </div>
    </div>
  );
});

interface ButtonProps {
  currentPage: Signal<number>
}

interface PageListProps {
  pageCount: Signal<number>
  currentPage: Signal<number>

}

const PageList = component$<PageListProps>(({ pageCount, currentPage }) => {
  const Pages = () => {
    const pageList = Array.from(Array(pageCount.value).keys())
    return <>
      {pageList.map(val => {
        return <p key={val} onClick$={() => currentPage.value = val+1} class={`text-sm font-medium leading-none cursor-pointer pt-3 mr-4 px-2 ${val + 1 === currentPage.value ? 'text-indigo-700 border-t border-indigo-400' : 'text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400'}`}>{val + 1}</p>
      })}
    </>;
  }

  return <div class="sm:flex hidden">
    <Pages />
  </div>

})

const PreviousButton = component$<ButtonProps>(({ currentPage }) => {
  return <div class="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer" onClick$={() => currentPage.value--}>
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <p class="text-sm ml-3 font-medium leading-none">Beriki</p>
  </div>;
})

const NextButton = component$<ButtonProps>(({ currentPage }) => {
  return <div class="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer" onClick$={() => currentPage.value++}>
    <p class="text-sm font-medium leading-none mr-3">Öteki</p>
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  </div>;
})

