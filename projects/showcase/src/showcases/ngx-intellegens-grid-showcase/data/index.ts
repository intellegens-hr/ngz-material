// <ngx-intellegens-grid-showcase /> example data
// ----------------------------------------------------------------------------

// Dummy data used in examples
export const data = [
  { id: 1,  firstName: 'Sophie',  lastName: 'Myers',    salary: 2000 },
  { id: 2,  firstName: 'Judy',    lastName: 'Herbert',  salary: 1500 },
  { id: 3,  firstName: 'Mike',    lastName: 'Stewart',  salary: 2400 },
  { id: 4,  firstName: 'Judy',    lastName: 'Brown',    salary: 2400 },
  { id: 5,  firstName: 'Bob',     lastName: 'Melon',    salary: 1100 },
  { id: 6,  firstName: 'Sophie',  lastName: 'Myers',    salary: 2000 },
  { id: 7,  firstName: 'Judy',    lastName: 'Herbert',  salary: 1500 },
  { id: 8,  firstName: 'Mike',    lastName: 'Stewart',  salary: 3753 },
  { id: 9,  firstName: 'Judy',    lastName: 'Brown',    salary: 1700 },
  { id: 10, firstName: 'Bob',     lastName: 'Melon',    salary: 1100 },
  { id: 11, firstName: 'Sophie',  lastName: 'Myers',    salary: 2000 },
  { id: 12, firstName: 'Judy',    lastName: 'Herbert',  salary: 1500 },
  { id: 13, firstName: 'Mike',    lastName: 'Stewart',  salary: 3753 },
  { id: 14, firstName: 'Judy',    lastName: 'Brown',    salary: 1500 },
  { id: 15, firstName: 'Bob',     lastName: 'Melon',    salary: 1100 },
  { id: 16, firstName: 'Sophie',  lastName: 'Myers',    salary: 2000 },
  { id: 17, firstName: 'Judy',    lastName: 'Herbert',  salary: 1500 },
  { id: 18, firstName: 'Mike',    lastName: 'Stewart',  salary: 3753 },
  { id: 19, firstName: 'Judy',    lastName: 'Brown',    salary: 1900 },
  { id: 20, firstName: 'Bob',     lastName: 'Melon',    salary: 1100 },
  { id: 21, firstName: 'Sophie',  lastName: 'Myers',    salary: 2000 },
  { id: 22, firstName: 'Judy',    lastName: 'Herbert',  salary: 1500 },
  { id: 23, firstName: 'Mike',    lastName: 'Stewart',  salary: 3753 },
  { id: 24, firstName: 'Judy',    lastName: 'Brown',    salary: 1200 },
  { id: 25, firstName: 'Bob',     lastName: 'Melon',    salary: 1100 },
  { id: 26, firstName: 'Sophie',  lastName: 'Myers',    salary: 2000 },
  { id: 27, firstName: 'Judy',    lastName: 'Herbert',  salary: 1500 },
  { id: 28, firstName: 'Mike',    lastName: 'Stewart',  salary: 3753 },
  { id: 29, firstName: 'Judy',    lastName: 'Brown',    salary: 1100 },
  { id: 30, firstName: 'Bob',     lastName: 'Melon',    salary: 1100 },
  { id: 31, firstName: 'Mike',    lastName: 'Stewart',  salary: 3753 },
  { id: 32, firstName: 'Judy',    lastName: 'Brown',    salary: 2600 },
  { id: 33, firstName: 'Bob',     lastName: 'Melon',    salary: 1100 }
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
