// <ngz-grid-showcase /> example data
// ----------------------------------------------------------------------------

// Dummy data used in examples
export const data = [
  { id: 1,  firstName: 'Sophie',  lastName: 'Myers',    salary: 2000, nested: { test: '1Abc...' } },
  { id: 2,  firstName: 'Judy',    lastName: 'Herbert',  salary: 1500, nested: { test: '2Abc...' } },
  { id: 3,  firstName: 'Mike',    lastName: 'Stewart',  salary: 2400, nested: { test: '3Abc...' } },
  { id: 4,  firstName: 'Judy',    lastName: 'Brown',    salary: 2400, nested: { test: '4Abc...' } },
  { id: 5,  firstName: 'Bob',     lastName: 'Melon',    salary: 1100, nested: { test: '5Abc...' } },
  { id: 6,  firstName: 'Sophie',  lastName: 'Myers',    salary: 2000, nested: { test: '6Abc...' } },
  { id: 7,  firstName: 'Judy',    lastName: 'Herbert',  salary: 1500, nested: { test: '7Abc...' } },
  { id: 8,  firstName: 'Mike',    lastName: 'Stewart',  salary: 3753, nested: { test: '8Abc...' } },
  { id: 9,  firstName: 'Judy',    lastName: 'Brown',    salary: 1700, nested: { test: '9Abc...' } },
  { id: 10, firstName: 'Bob',     lastName: 'Melon',    salary: 1100, nested: { test: '0Abc...' } },
  { id: 11, firstName: 'Sophie',  lastName: 'Myers',    salary: 2000, nested: { test: '1Abc...' } },
  { id: 12, firstName: 'Judy',    lastName: 'Herbert',  salary: 1500, nested: { test: '2Abc...' } },
  { id: 13, firstName: 'Mike',    lastName: 'Stewart',  salary: 3753, nested: { test: '3Abc...' } },
  { id: 14, firstName: 'Judy',    lastName: 'Brown',    salary: 1500, nested: { test: '4Abc...' } },
  { id: 15, firstName: 'Bob',     lastName: 'Melon',    salary: 1100, nested: { test: '5Abc...' } },
  { id: 16, firstName: 'Sophie',  lastName: 'Myers',    salary: 2000, nested: { test: '6Abc...' } },
  { id: 17, firstName: 'Judy',    lastName: 'Herbert',  salary: 1500, nested: { test: '7Abc...' } },
  { id: 18, firstName: 'Mike',    lastName: 'Stewart',  salary: 3753, nested: { test: '8Abc...' } },
  { id: 19, firstName: 'Judy',    lastName: 'Brown',    salary: 1900, nested: { test: '9Abc...' } },
  { id: 20, firstName: 'Bob',     lastName: 'Melon',    salary: 1100, nested: { test: '0Abc...' } },
  { id: 21, firstName: 'Sophie',  lastName: 'Myers',    salary: 2000, nested: { test: '1Abc...' } },
  { id: 22, firstName: 'Judy',    lastName: 'Herbert',  salary: 1500, nested: { test: '2Abc...' } },
  { id: 23, firstName: 'Mike',    lastName: 'Stewart',  salary: 3753, nested: { test: '3Abc...' } },
  { id: 24, firstName: 'Judy',    lastName: 'Brown',    salary: 1200, nested: { test: '4Abc...' } },
  { id: 25, firstName: 'Bob',     lastName: 'Melon',    salary: 1100, nested: { test: '5Abc...' } },
  { id: 26, firstName: 'Sophie',  lastName: 'Myers',    salary: 2000, nested: { test: '6Abc...' } },
  { id: 27, firstName: 'Judy',    lastName: 'Herbert',  salary: 1500, nested: { test: '7Abc...' } },
  { id: 28, firstName: 'Mike',    lastName: 'Stewart',  salary: 3753, nested: { test: '8Abc...' } },
  { id: 29, firstName: 'Judy',    lastName: 'Brown',    salary: 1100, nested: { test: '9Abc...' } },
  { id: 30, firstName: 'Bob',     lastName: 'Melon',    salary: 1100, nested: { test: '0Abc...' } },
  { id: 31, firstName: 'Mike',    lastName: 'Stewart',  salary: 3753, nested: { test: '1Abc...' } },
  { id: 32, firstName: 'Judy',    lastName: 'Brown',    salary: 2600, nested: { test: '2Abc...' } },
  { id: 33, firstName: 'Bob',     lastName: 'Melon',    salary: 1100, nested: { test: '3Abc...' } }
];

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
