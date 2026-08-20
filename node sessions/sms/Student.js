const DELIMETER = "|";

class Student {
  constructor(id, name, course, fee, marks) {
    this.id = Number(id);
    this.name = name;
    this.course = course;
    this.fee = Number(fee);
    this.marks = Number(marks);
  }

  toLine() {
    return [this.id, this.name, this.course, this.fee, this.marks].join(
      DELIMETER
    );
  }
}

function containsDelimeter(value) {
  return String(value).includes(DELIMETER);
}

function studentFromLine(line) {
  const parts = line.split(DELIMETER);
  const id = parts[0];
  const name = parts[1];
  const course = parts[2];
  const fee = parts[3];
  const marks = parts[4];

  return new Student(id, name, course, fee, marks);
}

export default Student;

export { DELIMETER, containsDelimeter, studentFromLine };
