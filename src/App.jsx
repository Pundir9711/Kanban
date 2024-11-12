import React from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import KanbanBoard from './component/KanbanBoard'
import PriorityView from './component/PriorityView';
import TaskBoard from './component/Taskboard';


function App() {
  return (
    <div>
     <Routes>
        <Route path="/" element={<KanbanBoard/>} />
        <Route path="/priority-view" element={<PriorityView/>} />
        <Route path="/taskboard" element={<TaskBoard/>}/>
    </Routes>
    </div>
  )
}

export default App