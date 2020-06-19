const mongodb = require('mongodb')
const NoteEntity = require('../entity/note.entity')

const createNote = async (text, email) => {
  const newPost = new NoteEntity({
    text,
    email,
  })
  await newPost.save().then(() => {
    return newPost
  })
}

const findNotes = async (email, options) => {
  options.lean = true
  return await NoteEntity.paginate({ email }, options)
}

const findNotesBetweenDatesandKeyword = async (
  fromDate,
  toDate,
  keyword,
  email,
  options
) => {
  options.lean = true
  options.sort = { date: -1 }
  const regex = new RegExp(`${keyword}`, 'i')
  const query = {
    email,
    createdAt: {
      $gte: fromDate,
      $lt: toDate,
    },
  }
  if (keyword && keyword !== ' ') {
    query.text = { $regex: regex }
  }
  return await NoteEntity.paginate(query, options)
}

const editNote = async (id, email, text) => {
  await NoteEntity.findOneAndUpdate(
    { _id: id, email: email },
    { text: text, editedAt: new Date() },
    (err, updatedPost) => {
      if (err) {
        // TODO: Handle error
        // eslint-disable-next-line
        console.log(err)
      }

      return updatedPost
    }
  )
}

const deleteNote = async (email, id) => {
  let isUpdated = false
  await NoteEntity.deleteOne({
    _id: new mongodb.ObjectID(id),
    email: email,
  }).then(() => {
    // in mongo id is a special type of ObjectID
    isUpdated = true
  })
  return isUpdated
}

module.exports.createNote = createNote
module.exports.deleteNote = deleteNote
module.exports.findNotes = findNotes
module.exports.findNotesBetweenDatesandKeyword = findNotesBetweenDatesandKeyword
module.exports.editNote = editNote
