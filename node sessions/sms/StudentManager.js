import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import Student, {
  DELIMETER,
  studentFromLine,
  containsDelimeter,
} from "./Student";

const DATA_DIR = "data";
const DATA_FILE = path(DATA_DIR, "students.txt");
const BACKUP_DIR = "backups";

class StudentManager {
  constructor() {
    this.students = [];
    this.nextId = 1;
  }

  init() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR);
    }

    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "");
    }

    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR);
    }
  }

  async load() {
    const content = await fsp.readFile(DATA_FILE, "utf-8");
    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    this.students = lines.map((line) => studentFromLine(line));

    if (this.students.length === 0) {
      this.nextId = 1;
    } else {
      var maxi = 0;
      for (const s of this.students) {
        if (s.id > maxi) maxi = s.id;
      }
      this.nextId = maxi + 1;
    }
  }

  async backup() {
    const existing = await fsp.readFile(DATA_FILE, "utf-8").catch(() => "");
    if (!existing) return;
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(BACKUP_DIR, "students_" + stamp + ".txt");
    await fsp.writeFile(backupPath, existing);
  }

  async create(name, course, fee, marks) {
    if (!name || !course || fee === undefined || marks === undefined) {
      throw new Error("Missing required fields : name, course, fee, marks");
    }
    if (Student.containsDelimeter(name) || Student.containsDelimeter(course)) {
      throw new Error("Fields value cannot contain the delimeter");
    }

    const student = new Student(this.nextId, name, course, fee, marks);

    this.students.push(student);
    this.nextId = this.nextId + 1;
    await this.save();
    return student;
  }

  readAll() {
    return this.students;
  }

  readOne(id) {
    const student = this.students.find((s) => s.id === Number(id));
    if (!student) {
      throw new Error("Student not found (id : " + id + ")");
    }

    return student;
  }
}
