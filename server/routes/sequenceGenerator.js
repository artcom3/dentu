var Sequence = require('../models/sequence');

var maxPatientId;
var maxAgendaId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      const newSequence = {...sequence};

      sequenceId = sequence._id;
      maxPatientId = sequence.maxPatientId;
      maxAgendaId = newSequence._doc.maxAgendaId;

    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  console.log('ENTER COTY' + collectionType)

  switch (collectionType) {
    case 'patients':
      maxPatientId++;
      updateObject = {maxPatientId: maxPatientId};
      nextId = maxPatientId;
      break;
    case 'agenda':
      console.log('ENTER AGENDA' + maxAgendaId)
      maxAgendaId++;
      updateObject = {maxAgendaId: maxAgendaId};
      nextId = maxAgendaId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
