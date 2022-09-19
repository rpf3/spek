import { faker } from '@faker-js/faker';

const rowCount = 500;

function generateTableData() {
	const data = [];

	for (let i = 0; i < rowCount; i++) {
		data.push({
			name: faker.name.fullName(),
			email: faker.internet.email(),
			birthdate: faker.date.birthdate(),
			bio: faker.lorem.sentences()
		});
	}

	return data;
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const tableData = generateTableData();

	return {
		data: tableData
	};
}
