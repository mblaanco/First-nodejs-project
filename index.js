const express = require('express');
const server = express();

// habilitar utilização de json nas requisições
server.use(express.json());

let numberOfRequests = 0;
const projects = [];

function logRequests(req, res, next)  {
  numberOfRequests++;

  console.log(numberOfRequests);
  return next();
};

function checkProjectInArray(req, res, next, ){
  
  if(req.body.id){
    const { id } = req.body;

    const project = projects.find(p => p.id == id);
    
    if(project){
      
      return res.status(400).json({ error: "Project already exists."});
    }
  
  }
  else if(req.params.id){
    const { id } = req.params;

    const project = projects.find(p => p.id == id);
    req.project = project;
    if(!project){
      return res.status(404).json({ error: "Project not found."});
    }
  
  }

  return next();
};

server.use(logRequests);

/**
 * Create Project
 */
server.post('/projects', checkProjectInArray, (req, res) => {
  const { id, title, tasks } = req.body;
  const project = {
    id,
    title,
    tasks
  };
  
  projects.push(project);

  return res.json(project);

});


server.get('/projects', (req, res) => {
  return res.json(projects);
});

/**
 * Edit Project
 */

server.put('/projects/:id', checkProjectInArray, (req, res) => {
  const { title } = req.body;
  
  req.project.title = title;

  return res.json(req.project)
});

/**
 * Delete Project
 */
server.delete('/projects/:id', checkProjectInArray, (req,res) => {

  const projectIndex = projects.findIndex(p => p.id == req.project.id);
  projects.splice(projectIndex, 1);

  return res.json({"Success": 'Project removed.', "Projects": projects});
});

/**
 * Add Tasks
 */
server.post('/projects/:id/tasks', checkProjectInArray, (req,res) => {
  const projectIndex = projects.findIndex(p => p.id == req.project.id);

  req.project.tasks.push(req.body.title);
  return res.json({"Success": 'Task added.', "Project": req.project})
});

server.listen(3000);