/* eslint-disable qwik/jsx-img */

import { component$, useSignal } from '@builder.io/qwik';
import { extractColors } from 'extract-colors'
import ColorExtractedImage from './ColorExtractedImage'

import type { QwikChangeEvent, Signal } from '@builder.io/qwik';
import type { FinalColor } from 'extract-colors/lib/types/Color';

interface ImageInfoList {
    src: string;
    color: FinalColor[];
}

const handleOnChange$ = (event: QwikChangeEvent<HTMLInputElement>, imageList: Signal<ImageInfoList[]>) => {
    function createColorExtractedImage(e: ProgressEvent<FileReader>) {
        const source = e.target?.result

        if (typeof source === 'string') {
            extractColors(source)
                .then(arr => {
                    // start with the area covering a bigger portion of the image
                    imageList.value = imageList.value.concat({ src: source, color: arr })
                })
                .catch(console.error)
        }
    }

    const files = event.target.files
    imageList.value = []

    if (files) {
        for (const file of files) {
            const reader = new FileReader()
            reader.onload = createColorExtractedImage
            reader.readAsDataURL(file)
        }
    }

}

export default component$(() => {
    const imageList = useSignal<ImageInfoList[]>([])

    return <div class="p-4 flex flex-col gap-4 container mx-auto">
        <h1 class="text-3xl font-bold text-black">Istanbul in Color</h1>

        <input id="uploadInput" type="file" onChange$={(event) => handleOnChange$(event, imageList)} multiple />

        <div id='images-container' class='flex flex-wrap gap-2'>
            {imageList.value.map(i => <ColorExtractedImage key={i.src} src={i.src} colors={i.color} />)}
        </div>
    </div>
});
