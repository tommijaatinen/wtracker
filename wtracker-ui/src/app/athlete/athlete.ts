export class Athlete {
    id: String;
    firstName: String;
    lastName: String;
    dateOfBirth: Date;
    age: Number;
    weight: Number;
    gender: String;
    filterableProperties = ['firstName', 'lastName', 'gender', 'age', 'weight'];
}
