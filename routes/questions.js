import mysql from 'mysql2/promise';
import DBConnection from '../database/connection-util.js';
import express from 'express';

const router = express.Router();

/*
    NOTE: Most of our endpoints are going to follow the same get/put/post/delete ops
*/
router.get('/questions', async(req,res)=>{
    try{
        const [rows] = await DBConnection.execute(`
            SELECT *
            FROM Questions 
            ORDER BY id
        `);
        
        res.json({rows:rows})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/questions/:id', async(req,res)=>{
    try{
        const questionId = req.params.id;
        const [rows] = await DBConnection.execute(`
            SELECT *
            FROM Questions
            WHERE id = ?
            ORDER BY id
        `,[questionId]);
        
        res.json({rows:rows})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/questions', async(req,res)=>{
    try{
        const prompt = req.body.prompt || null
        const question_order = req.body.question_order || null
        const question_type = req.body.question_type || null

        const result = await DBConnection.execute(
            'INSERT INTO Questions (prompt, question_order, question_type) VALUES (?, ?, ?)',
            [prompt, question_order, question_type]
            );
        res.json({ message: 'Question created successfully!', result:result });
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
})

router.delete('/questions/:id', async (req, res) => {
    try {
      const questionId = req.params.id;
    
      // Check if the id even exists first
      if (!questionId) {
        return res.status(400).json({ error:"Missing question ID in request." });
      }
  
      const result = await DBConnection.execute(
        'DELETE FROM Questions WHERE id = ?',
        [questionId]
      );
    
      // If we have a result but it does nothing, then the question wasn't there
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Question notfound." });
      }
  
      res.json({ message:" Question deleted successfully!" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });

router.put('/questions/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const prompt = req.body.prompt;
    const question_order = req.body.question_order;
    const question_type = req.body.question_type;

    // TODO: I couldn't get this to work with null checks so I'm just going to build a string.
    // I'm sure there is a better way to do this.
    let updateString = 'UPDATE Questions SET ';
    const updateValues = [];

    if (prompt) {
      updateValues.push(prompt);
      updateString += 'prompt = ?, ';
    }
    if (question_order) {
      updateValues.push(question_order);
      updateString += 'question_order = ?, ';
    }
    if (question_type) {
      updateValues.push(question_type);
      updateString += 'question_type = ?, ';
    }

    // Because I have to build a string here, I need to get rid of the last comma and space
    updateString = updateString.slice(0, -2);

    // Add WHERE clause for update
    updateString += ' WHERE id = ?';
    updateValues.push(questionId);

    const result = await DBConnection.execute(updateString, updateValues);

    // More validation no ops
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question notfound." });
    }

    res.json({ message:"Question updated successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});


export default router;