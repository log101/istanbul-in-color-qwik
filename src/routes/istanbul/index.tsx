import type { QwikChangeEvent } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

import { extractColors } from 'extract-colors'

const handleOnChange$ = (event: QwikChangeEvent<HTMLInputElement>) =>{
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
                            //colorList.value = arr
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
    return <div class="p-4 flex flex-col gap-4">
        <h1 class="text-3xl font-bold underline">Istanbul in Color</h1>

        <input id="uploadInput" type="file" onChange$={(event) => handleOnChange$(event)} />

        <div id="fileContainer">
            <img id="uploadedFile" style="max-width: 300px; max-height: 300px" width={600} height={300}/>
        </div>
    </div>
});
