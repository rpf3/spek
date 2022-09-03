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
					'button-secondary-hover': withOpacity('--color-button-secondary-hover')
				}
			},
			borderColor: {
				skin: {
					'button-secondary': withOpacity('--color-button-secondary')
				}
			}
		}
	}
});
