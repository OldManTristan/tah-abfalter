import terser from '@rollup/plugin-terser'
import multi from '@rollup/plugin-multi-entry'

export default [
    {
        input: {
            include: [
                'scripts/*.js'
            ],
            exclude: [
                'scripts/tah-abfalter.min.js',
                'scripts/foundry.js'
            ]
        },
        output: {
            format: 'esm',
            file: 'scripts/tah-abfalter.min.js',
            sourcemap: true
        },
        plugins: [
            terser({ keep_classnames: true, keep_fnames: true }),
            multi()
        ]
    }
]