import mysql from 'mysql2/promise';
import DBConnection from '../database/connection-util.js';
import express from 'express';

const router = express.Router();

/*
    NOTE: Most of our endpoints are going to follow the same get/put/post/delete ops
*/
router.get('/answers', async(req,res)=>{
    try{
        const [rows] = await DBConnection.execute(`
            SELECT *
            FROM Answers 
            ORDER BY id
        `);
        
        res.json({rows:rows})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/answers/:id', async(req,res)=>{
    try{
        const answerId = req.params.id;
        const [rows] = await DBConnection.execute(`
            SELECT *
            FROM Answers
            WHERE id = ?
            ORDER BY id
        `,[answerId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: "Answer notfound." });
        }
        res.json({rows:rows})

    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// Note to self: Basically the same as questions
router.post('/answers', async (req, res) => {
    try {
      const questionId = req.body.question_id || null;
      const answerValue = req.body.answer_value || null;
  
      if (!questionId || !answerValue) {
        return res.status(400).json({ error: "Missing required fields in request body." });
      }
  
      const result = await DBConnection.execute(
        'INSERT INTO Answers (question_id, answer_value) VALUES (?, ?)',
        [questionId, answerValue]
      );
  
      res.json({ message: "Answer submitted successfully!", result: result });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });

router.delete('/answers/:id', async (req, res) => {
    try {
      const answersId = req.params.id;
    
      // Check if the id even exists first
      if (!answersId) {
        return res.status(400).json({ error:"Missing question ID in request." });
      }
  
      const result = await DBConnection.execute(
        'DELETE FROM Answers WHERE id = ?',
        [answersId]
      );
    
      // If we have a result but it does nothing, then the answeer wasn't there
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Answer notfound." });
      }
  
      res.json({ message:" Answers deleted successfully!" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });

router.put('/answers/:id', async (req, res) => {
  try {
    const answerId = req.params.id;
    const answerValue = req.body.answer_value || null;

    // Check if the fiellds are included
    if (!answerId || !answerValue) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const updateString = 'UPDATE Answers SET answer_value = ? WHERE id = ?';
    const updateValues = [answerValue, answerId];

    const result = await DBConnection.execute(updateString, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Answer notfound." });
    }

    res.json({ message:"Answer updated successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});


export default router;