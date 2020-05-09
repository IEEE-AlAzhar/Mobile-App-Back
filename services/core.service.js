class CoreService {
  constructor() {
    this.listRecords = this.listRecords.bind(this);
    this.createRecord = this.createRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  initialize(Model, name) {
    this.db = Model;
    this.name = name;
  }

  listRecords(req, res) {
    this.db
      .find({})
      .then((records) => res.json(records))
      .catch(() =>
        res.status(500).json({
          msg: "An error occurred, please try again later!",
        })
      );
  }

  createRecord(req, res) {
    this.db
      .create({
        ...req.body,
      })
      .then((newRecord) => res.json(newRecord))
      .catch(() =>
        res.status(500).json({
          msg: "An error occurred, please try again later!",
        })
      );
  }

  updateRecord(req, res) {
    const { id } = req.params;

    this.db
      .findByIdAndUpdate(id, { ...req.body }, { new: true })
      .then((updatedRecord) => {
        res.json(updatedRecord);
      })
      .catch(() =>
        res.status(500).json({
          msg: "An error occurred, please try again later!",
        })
      );
  }

  deleteRecord(req, res) {
    const { id } = req.params;

    this.db
      .findByIdAndRemove(id)
      .then(() => {
        res.json({
          msg: `${this.name} has been deleted successfully!`,
        });
      })
      .catch(() =>
        res.status(500).json({
          msg: "An error occurred, please try again later!",
        })
      );
  }
}

module.exports = CoreService;
