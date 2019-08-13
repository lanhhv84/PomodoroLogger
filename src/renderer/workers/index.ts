/**
 * Define All Web Workers
 *
 * Because this project uses worker-loader, which can only run in the renderer process,
 * it's thus under the renderer directory.
 */

import { KnnWorker } from './knnWorker';

export const workers = {
    knn: new KnnWorker()
};