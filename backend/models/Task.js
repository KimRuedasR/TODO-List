class Task {
  constructor(title, description) {
    this.id = Task.incrementId();
    this.title = title;
    this.description = description;
    this.completed = false;
  }

  // Incrementar el ID de las tareas
  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

module.exports = Task;
