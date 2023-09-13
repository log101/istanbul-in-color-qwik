/* eslint-disable qwik/jsx-img */
import { component$ } from "@builder.io/qwik";
import type { FinalColor } from "extract-colors/lib/types/Color";

interface ComponentProps {
    src: string
    colors: FinalColor[]
}

export default component$((props: ComponentProps) => {
    return <div class='flex flex-col gap-2'>
        <img style="max-width: 300px; max-height: 300px" src={props.src} />

        <ul class="flex flex-wrap gap-2 justify-left">
            {props.colors.map(v => {
                return <li class="leading-[0]" key={v.hex}>
                    <span class="block border border-black border-opacity-20 h-6 rounded-xl w-6" style={{ backgroundColor: v.hex }}></span>
                </li>
            })}
        </ul>

    </div>
});
