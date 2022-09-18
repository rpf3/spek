const plugin = require('tailwindcss/plugin');

function withOpacity(variableName) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variableName}))`;
		}

		return `rgba(var(${variableName}, ${opacityValue}))`;
	};
}

module.exports = plugin(() => {}, {
	theme: {
		extend: {
			colors: {
				spek: {
					primary: {
						50: withOpacity('--color-primary-50'),
						100: withOpacity('--color-primary-100'),
						200: withOpacity('--color-primary-200'),
						300: withOpacity('--color-primary-300'),
						400: withOpacity('--color-primary-400'),
						500: withOpacity('--color-primary-500'),
						600: withOpacity('--color-primary-600'),
						700: withOpacity('--color-primary-700'),
						800: withOpacity('--color-primary-800'),
						900: withOpacity('--color-primary-900')
					},
					accent: {
						50: withOpacity('--color-accent-50'),
						100: withOpacity('--color-accent-100'),
						200: withOpacity('--color-accent-200'),
						300: withOpacity('--color-accent-300'),
						400: withOpacity('--color-accent-400'),
						500: withOpacity('--color-accent-500'),
						600: withOpacity('--color-accent-600'),
						700: withOpacity('--color-accent-700'),
						800: withOpacity('--color-accent-800'),
						900: withOpacity('--color-accent-900')
					},
					facade: {
						50: withOpacity('--color-facade-50'),
						100: withOpacity('--color-facade-100'),
						200: withOpacity('--color-facade-200'),
						300: withOpacity('--color-facade-300'),
						400: withOpacity('--color-facade-400'),
						500: withOpacity('--color-facade-500'),
						600: withOpacity('--color-facade-600'),
						700: withOpacity('--color-facade-700'),
						800: withOpacity('--color-facade-800'),
						900: withOpacity('--color-facade-900')
					}
				}
			},
			textColor: {
				spek: {
					inverted: withOpacity('--color-text-inverted')
				}
			}
		}
	},
	safelist: [
		{
			pattern: /grid-cols-*/
		},
		{
			pattern: /col-span-*/
		}
	]
});
