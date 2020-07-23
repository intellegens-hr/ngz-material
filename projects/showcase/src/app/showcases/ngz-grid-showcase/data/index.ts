// <ngz-grid-showcase /> example data
// ----------------------------------------------------------------------------

// Dummy data used in examples
const seed = [
  { id: 1,  firstName: 'Sophie',  lastName: 'Myers',    salary: 2000, nested: { test: '1Abc...' }, dateOfBirth: '1990-07-24T00:00:00.000Z' },
  { id: 2,  firstName: 'Judy',    lastName: 'Herbert',  salary: 1500, nested: { test: '2Abc...' }, dateOfBirth: '1992-06-20T00:00:00.000Z' },
  { id: 3,  firstName: 'Mike',    lastName: 'Stewart',  salary: 2400, nested: { test: '3Abc...' }, dateOfBirth: '1980-11-25T00:00:00.000Z' },
  { id: 4,  firstName: 'Judy',    lastName: 'Brown',    salary: 2400, nested: { test: '4Abc...' }, dateOfBirth: '1982-17-02T00:00:00.000Z' },
  { id: 5,  firstName: 'Bob',     lastName: 'Melon',    salary: 1100, nested: { test: '5Abc...' }, dateOfBirth: '1991-07-20T00:00:00.000Z' },
  { id: 6,  firstName: 'Sophie',  lastName: 'Myers',    salary: 2000, nested: { test: '6Abc...' }, dateOfBirth: '1981-02-10T00:00:00.000Z' },
  { id: 7,  firstName: 'Judy',    lastName: 'Herbert',  salary: 1500, nested: { test: '7Abc...' }, dateOfBirth: '1990-07-20T00:00:00.000Z' },
  { id: 8,  firstName: 'Mike',    lastName: 'Stewart',  salary: 3753, nested: { test: '8Abc...' }, dateOfBirth: '1986-11-21T00:00:00.000Z' },
  { id: 9,  firstName: 'Judy',    lastName: 'Brown',    salary: 1700, nested: { test: '9Abc...' }, dateOfBirth: '1986-03-05T00:00:00.000Z' }
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
