import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

export const rootDir = dirname(__filename);

/**
 * @description Express application for customer management and feedback
 * @since 2024-12-16
 */
