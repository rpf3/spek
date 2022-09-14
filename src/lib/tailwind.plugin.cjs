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
					primary: withOpacity('--color-primary'),
					accent: withOpacity('--color-accent')
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
