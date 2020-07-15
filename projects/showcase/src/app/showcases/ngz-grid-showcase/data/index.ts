// <ngz-grid-showcase /> example data
// ----------------------------------------------------------------------------

// Dummy data used in examples
const seed = [
  { id: 1,  firstName: 'Sophie',  lastName: 'Myers',    salary: 2000, nested: { test: '1Abc...' } },
  { id: 2,  firstName: 'Judy',    lastName: 'Herbert',  salary: 1500, nested: { test: '2Abc...' } },
  { id: 3,  firstName: 'Mike',    lastName: 'Stewart',  salary: 2400, nested: { test: '3Abc...' } },
  { id: 4,  firstName: 'Judy',    lastName: 'Brown',    salary: 2400, nested: { test: '4Abc...' } },
  { id: 5,  firstName: 'Bob',     lastName: 'Melon',    salary: 1100, nested: { test: '5Abc...' } },
  { id: 6,  firstName: 'Sophie',  lastName: 'Myers',    salary: 2000, nested: { test: '6Abc...' } },
  { id: 7,  firstName: 'Judy',    lastName: 'Herbert',  salary: 1500, nested: { test: '7Abc...' } },
  { id: 8,  firstName: 'Mike',    lastName: 'Stewart',  salary: 3753, nested: { test: '8Abc...' } },
  { id: 9,  firstName: 'Judy',    lastName: 'Brown',    salary: 1700, nested: { test: '9Abc...' } }
];
export const data = [...Array(500)].map((x, i) => ({ ...seed[i % 10], id: (i + 1) }));

/**
 * Updates dummy data based on a seed value
 * @param data Data array to update
 * @param seed Seed value to use
 * @returns Updated data array
 */
export function updateData (data, seed) {
  return data.map(row => {
    return {
      id:         row.id,
      firstName:  row.firstName,
      lastName:   row.lastName,
      salary:     (row.salary * seed) % 5000
    };
  });
}
