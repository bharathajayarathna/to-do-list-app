export class Task {
  constructor(public id: Number,
              public description: String,
              public date: String,
              public status: 'COMPLETED' | "NOT_COMPLETED") {
  }
}
