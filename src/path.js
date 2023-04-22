import {fileURLToPath} from 'url' // obtengo la url de mi archivo
import { dirname } from 'path' // obtengo el nombre de mi directorio

export const __filename = fileURLToPath(import.meta.url) // devuelve el nombre de mi archivo
export const __dirname = dirname(__filename) // devuelve la carpeta donde se encuentra mi directorio actual
