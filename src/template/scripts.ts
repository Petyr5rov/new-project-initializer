export const scriptsJSON = {
    'build': 'npm run clean & tsc --project .',
    'build-w': 'npm run clean & tsc --project . -w',
    'clean': 'rimraf ./dist',
    'start': 'ts-node --project tsconfig.json ./src/main.ts',
    'deploy': 'npm run build && npm i -g .',
    'test': 'jasmine-ts',
    'lint': 'tslint --format stylish -p .',
    'lint:fix': 'tslint --fix -p .'
};
