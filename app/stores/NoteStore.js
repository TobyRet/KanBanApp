import uuid from "uuid";

export default class NotesStore {
  constructor() {
    this.notes = [
      {
        id: uuid.v4(),
        task: 'Learn React'
      },
      {
        id: uuid.v4(),
        task: ' Do laundry'
      }
    ]
  }
}
