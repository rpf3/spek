/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {}
	},
	plugins: [require('./src/lib/tailwind.plugin.cjs')]
};
