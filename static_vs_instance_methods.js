/**
 * This short script demonstrates the differences between static and instance
 * methods (functions). This is an important topic in object oriented
 * programming.
 */

class Person {

  name;
  age;
  partner;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  /** example instance method that enables an INSTANCE (record) of a person to
   * say "Hi!" to another instance of class Person.
   *
   * @param {object} other_person - Another instance (record) of class person
   * to say "Hi!" to.
   *
   * @return null
   */
  say_hi(other_person) {
    // instance methods can access the record itself using `this`:
    console.log(`${this.name} says "Hi!" to ${other_person.name}`);
  }

  /** example static method that marries two people, setting their respective
   * 'partner' attributes to the betrothed argument.
   *
   * @param {object} - partner_a 
   * @param {object} - partner_b
   *
   * @return null
   */
  static marry_two_people(partner_a, partner_b) {
    // class methods do NOT have access to an existing record via `this`
    partner_a.partner = partner_b;
    partner_b.partner = partner_a;
  }
}

p1 = new Person("Hugo", 24);
p2 = new Person("Cassandra", 28);
// How to invoke an instance method:
p1.say_hi(p2);
// How to invoke a Class method:
Person.marry_two_people(p1, p2);
console.log(`p1 is married to? ${p1.partner.name} and p2 is married to? ${p2.partner.name}`);

