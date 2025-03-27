// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Ensure that the matchers are properly extended
import { expect } from '@jest/globals';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Jest's expect with all the matchers from testing-library
expect.extend(matchers);
