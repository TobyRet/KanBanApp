import React from 'react'
import uuid from 'uuid'
import connect from '../libs/connect'
import NoteActions from '../actions/NoteActions'
import LaneActions from '../actions/LaneActions'
import Notes from './Notes'


const Lane = ({lane, notes, NoteActions, LaneActions, ...props}) => {
  const editNote = (id, task) => {
    NoteActions.update({id, task, editing: false})
  }

  const addNote = e => {
    e.stopPropagation()

    const noteId = uuid.v4()

    NoteActions.create({
      id: noteId,
      task: 'New Task'
    })

    LaneActions.attachToLane({
      laneId: lane.id,
      noteId: noteId
    })
  }

  const deleteNote = (noteId, e) => {
    e.stopPropagation()

    LaneActions.detachFromLane({
      laneId: lane.id,
      noteId
    })

    NoteActions.delete(noteId)
  }

  const activateNoteEdit = id => {
    NoteActions.update({id, editing: true})
  }

  return (
    <div {...props}>
      <div className = 'lane-header'>
        <div className = 'lane-add-note'>
          <button onClick = {addNote} >+</button>
        </div>
        <div className = 'lane-name'>{lane.name}</div>
      </div>
      <Notes
        notes = {selectNotesById(notes, lane.notes)}
        onNoteClick = {activateNoteEdit}
        onEdit = {editNote}
        onDelete = {deleteNote}
      />
    </div>
  )
}

function selectNotesById(allNotes, noteIds = []) {
  const finalNotes = noteIds.reduce((notes, id) => {
    return notes.concat(allNotes.filter(note => note.id === id))
  }, [])

  return finalNotes || []
}

export default connect(
  ({notes}) => ({
    notes
  }), {
    NoteActions,
    LaneActions
  }
)(Lane)
