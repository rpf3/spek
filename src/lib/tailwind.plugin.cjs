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
			textColor: {
				skin: {
					base: withOpacity('--color-text-base'),
					inverted: withOpacity('--color-text-inverted')
				}
			},
			backgroundColor: {
				skin: {
					'button-primary': withOpacity('--color-button-primary'),
					'button-accent': withOpacity('--color-button-accent'),
					'button-ring-hover': withOpacity('--color-button-ring-hover')
				}
			},
			borderColor: {
				skin: {
					'button-primary': withOpacity('--color-button-primary'),
					'button-accent': withOpacity('--color-button-accent')
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
