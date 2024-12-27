import {Dropzone} from 'dropzone'

Dropzone.options.imagen = {
    dictDefaultMessage: 'Sube tus imágenes aquí',
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    paralleUploads: 1,
    autoProcessQueue: false, // Deshabilita la opción por defecto. Esta enviaba la foto una vez la dropeaba en la zona, ahora espera al submit del botón. 
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'El límite es un archivo'
}