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
						600: withOpacity('--color-primary-600'),
						700: withOpacity('--color-primary-700')
					},
					accent: {
						600: withOpacity('--color-accent-600'),
						700: withOpacity('--color-accent-700')
					}
				}
			},
			backgroundColor: {
				spek: {
					facade: withOpacity('--color-facade')
				}
			},
			textColor: {
				spek: {
					base: withOpacity('--color-text-base'),
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
