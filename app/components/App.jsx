import React from 'react'
import Notes from './Notes'
import uuid from 'uuid'

import connect from '../libs/connect'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'learn react'
        },
        {
          id: uuid.v4(),
          task: 'learn bash'
        }
      ]
    }
  }

  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    })
  }

  deleteNote = (id, e) => {
    e.stopPropagation()
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
  }

  activateNoteEdit = (id) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(note.id === id) {
          note.editing = true
        }
        return note
      })
    })
  }

  editNote = (id, task) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(note.id === id) {
          note.editing = false
          note.task = task
        }
        return note
      })
    })
  }

  render() {
    const {notes} = this.state

    return (
      <div>
        {this.props.test}
        <button className='add-note' onClick={this.addNote}>+</button>
        <Notes
          notes={notes}
          onDelete={this.deleteNote}
          onEdit={this.editNote}
          onNoteClick={this.activateNoteEdit}/>
      </div>
    )
  }
}

export default connect(() => ({
  test: 'test'
}))(App)
