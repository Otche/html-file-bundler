import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',

  // this enables us to use tsconfig-paths with jest
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/test/**',
    '!src/index.ts',
    '!src/**/*.mock.ts',
  ],
  testMatch: ["**/?(*.)+(spec|test).ts"],
  //testMatch: ["**/src/lib/html-transform/test/index.spec.ts"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
}
export default config





