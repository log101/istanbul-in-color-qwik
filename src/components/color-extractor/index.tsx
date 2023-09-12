/* eslint-disable qwik/jsx-img */
import type { QwikChangeEvent, Signal } from '@builder.io/qwik';
import { component$, useSignal } from '@builder.io/qwik';

import { extractColors } from 'extract-colors'

const handleOnChange$ = (event: QwikChangeEvent<HTMLInputElement>, colorList: Signal<any[]>) => {
    console.log('neredeyim')
    const file = event.target.files![0];

    const reader = new FileReader();
    const image = document.getElementById('uploadedFile');

    if (image) {
        reader.onload = function (e) {
            switch (typeof e.target?.result) {
                case 'string':
                    image.setAttribute('src', e.target.result);

                    extractColors(e.target.result)
                        .then(arr => {
                            // start with the area covering a bigger portion of the image
                            colorList.value = arr
                            console.log(arr)
                        })
                        .catch(console.error)
                    break;
            }
        };
        reader.readAsDataURL(file);
    }
}

export default component$(() => {
    const colorList = useSignal<any[]>([])

    return <div class="p-4 flex flex-col gap-4 container mx-auto">
        <h1 class="text-3xl font-bold text-black">Istanbul in Color</h1>

        <input id="uploadInput" type="file" onChange$={(event) => handleOnChange$(event, colorList)} />

        <div id="fileContainer">
            <img id="uploadedFile" style="max-width: 300px; max-height: 300px" />
        </div>

        <ul class="flex flex-wrap gap-2 justify-left">
            {colorList.value.map(v => {
                return <li class="leading-[0]" key={v.hex}>
                    <span class="block border border-black border-opacity-20 h-6 rounded-xl w-6" style={{ backgroundColor: v.hex }}></span>
                </li>
            })}

        </ul>
    </div>
});
