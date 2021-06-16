let async = require("async");
let Client = require("./client");
let ClientFile = require("./clientfile");
let Note = require("./note");
let Appointment = require("./appointment");
let mongoose = require("mongoose");
const client = require("./client");

const mongoDB =
  "mongodb+srv://root:967845oDRAUDE@cluster0.cq5me.mongodb.net/ficha-clientes?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connnecting mongoDB"));

let clients = [];
let clientFiles = [];
let notes = [];
let appointments = [];

function clientCreate(name, birthdate, phone_number, nif, address, cb) {
  clientDetail = {
    name: name,
    birthdate: birthdate,
    phone_number: phone_number,
    nif: nif,
    address: address,
  };

  let client = new Client(clientDetail);
  client.save(function (err) {
    if (err) {
      cb(err, null);
    }
    console.log("New Client: " + client);
    clients.push(client);
    console.log(client);
    cb(null, client);
  });
}

function clientfileCreate(detail, cb) {
  let clientfile = new ClientFile(detail);
  clientfile.save(function (err) {
    if (err) {
      cb(err, null);
    }
    console.log("New ClientFile: " + clientfile);
    clientFiles.push(clientfile);
    cb(null, clientfile);
  });
}

function noteCreate(clientfile, content, image, cb) {
  noteDetail = { clientfile: clientfile, content: content, image: image };
  let note = new Note(noteDetail);
  note.save(function (err) {
    if (err) {
      cb(err, null);
    }
    console.log("New Note: " + note);
    notes.push(note);
    cb(null, note);
  });
}

function appointmentCreate(client, date, status, description, cb) {
  appointmentDetail = {
    client: client,
    date: date,
    status: status,
    description: description,
  };

  let appointment = new Appointment(appointmentDetail);
  appointment.save(function (err) {
    if (err) {
      cb(err, null);
    }
    console.log("New Appointment: " + appointment);
    appointments.push(appointment);
    cb(null, appointment);
  });
}

function createClients(cb) {
  async.series(
    [
      function (callback) {
        clientCreate(
          "Sérgio Igreja",
          new Date(),
          "918668437",
          "123123213",
          "Rua da praia 317",
          callback
        );
      },
      function (callback) {
        clientCreate(
          "Zeuzão Igreja",
          new Date(),
          "918668427",
          "123123213",
          "Rua x y",
          callback
        );
      },
      function (callback) {
        clientCreate(
          "afjdkajk afdsfds",
          new Date(),
          "918668437",
          "123123213",
          "",
          callback
        );
      },
      function (callback) {
        clientCreate(
          "Saqew eq weew re",
          new Date(),
          "918668437",
          "123123213",
          "",
          callback
        );
      },
      function (callback) {
        clientCreate(
          "eqrqR REWQ qwe",
          new Date(),
          "918668437",
          "123123213",
          "",
          callback
        );
      },
    ],
    cb
  );
}

function createClientFiles(cb) {
  async.parallel(
    [
      function (callback) {
        let detail = {
          client: clients[0],
          kids: 0,
          married: false,
          profession: "",
          hobbies: "correr",
          avaliation_of_posture: 8,
          tumble_history: [
            { date: new Date("2014", 0), description: "bicicleta" },
          ],
          dental_history: [{ description: "sem 3 dentes" }],
          cirurgical_history: [
            { date: new Date(2015, 0), description: "Ombro" },
          ],
          nutrition: "má nutrição",
          treatments_made: [{ issue: "dor no ombro", treatment: "Massagem" }],
        };
        clientfileCreate(detail, callback);
      },
      function (callback) {
        let detail = {
          client: clients[1],
          treatments_made: [{ issue: "dor no ombro", treatment: "Massagem" }],
        };
        clientfileCreate(detail, callback);
      },
      function (callback) {
        let detail = {
          client: clients[2],
        };
        clientfileCreate(detail, callback);
      },
      function (callback) {
        let detail = {
          client: clients[3],
          kids: 0,
          married: false,
          profession: "",
          hobbies: "correr",
          treatments_made: [{ issue: "dor no ombro", treatment: "Massagem" }],
        };
        clientfileCreate(detail, callback);
      },
      function (callback) {
        let detail = {
          client: clients[4],
          kids: 0,
          married: false,
          nutrition: "má nutrição",
          treatments_made: [{ issue: "dor no ombro", treatment: "Massagem" }],
        };
        clientfileCreate(detail, callback);
      },
    ],
    cb
  );
}

function createNotes(cb) {
  let placeholder = "https://via.placeholder.com/150";
  async.parallel(
    [
      function (callback) {
        noteCreate(
          clientFiles[0],
          "Dificuldade a movimentar braço",
          placeholder,
          callback
        );
      },
      function (callback) {
        noteCreate(clientFiles[0], "Dificuldade 2o", placeholder, callback);
      },
      function (callback) {
        noteCreate(
          clientFiles[1],
          "Dificuldade a movimentar braço",
          placeholder,
          callback
        );
      },
      function (callback) {
        noteCreate(
          clientFiles[0],
          "Dificuldade a movimentar braço",
          placeholder,
          callback
        );
      },
      function (callback) {
        noteCreate(
          clientFiles[2],
          "Dificuldade a movimentar braço",
          placeholder,
          callback
        );
      },
    ],
    cb
  );
}

function createAppointments(cb) {
  async.parallel(
    [
      function (callback) {
        appointmentCreate(
          clients[0],
          new Date(),
          "Due",
          "Continuar tratamento y",
          callback
        );
      },
      function (callback) {
        appointmentCreate(
          clients[1],
          new Date(),
          "Due",
          "Continuar tratamento x",
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [createClients, createClientFiles, createNotes, createAppointments],
  function (err, results) {
    if (err) {
      console.log("ERR: " + err);
    } else {
      console.log("Appointments: " + clients);
    }
    mongoose.connection.close();
  }
);
