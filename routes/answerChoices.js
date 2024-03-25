import mysql from 'mysql2/promise';
import DBConnection from '../database/connection-util.js';
import express from 'express';

const router = express.Router();

/*
    NOTE: Most of our endpoints are going to follow the same get/put/post/delete ops
*/
router.get('/answers_choices', async(req,res)=>{
    try{
        const [rows] = await DBConnection.execute(`
            SELECT *
            FROM Answers_Choices
            ORDER BY id
        `);
        
        res.json({rows:rows})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/answers_choices/:id', async(req,res)=>{
    try{
        const answerId = req.params.id;
        const [rows] = await DBConnection.execute(`
            SELECT *
            FROM Answers_Choices
            WHERE id = ?
            ORDER BY id
        `,[answerId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: "Answer choice notfound." });
        }
        res.json({rows:rows})

    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// Note to self: Basically the same as questions
router.post('/answers_choices', async (req, res) => {
    try {
        const questionId = req.body.question_id || null;
        const choiceText = req.body.choice_text || null;
        const choiceValue = req.body.choice_value || null;
    
        if (!questionId || !choiceText || !choiceValue) {
          return res.status(400).json({ error: "Missing required fields in request body." });
        }
    
        const result = await DBConnection.execute(
          'INSERT INTO Answers_Choices (question_id, choice_text, choice_value) VALUES (?, ?, ?)',
          [questionId, choiceText, choiceValue]
        );
    
        res.json({ message: "Answer choice created successfully!", result: result });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
      }
  });


router.delete('/answers_choices/:id', async (req, res) => {
    try {
      const choiceId = req.params.id;
  
      if (!choiceId) {
        return res.status(400).json({ error: "Missing answer choice ID in request." });
      }
  
      const result = await DBConnection.execute(
        'DELETE FROM Answers_Choices WHERE id = ?',
        [choiceId]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Answer choice not found." });
      }
  
      res.json({ message: "Answer choice deleted successfully!" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });

router.put('/answers_choices/:id', async (req, res) => {
    try {
        const choiceId = req.params.id;
        const choiceText = req.body.choice_text || null;
        const choiceValue = req.body.choice_value || null;
    
        if (!choiceId) {
          return res.status(400).json({ error: "Missing answer choice ID in request." });
        }
    
        // TODO: I have to do more of that string building to build the args for the update
        let updateString = 'UPDATE Answers_Choices SET ';
        const updateValues = [];
    
        if (choiceText) {
          updateValues.push(choiceText);
          updateString += 'choice_text = ?, ';
        }
        if (choiceValue) {
          updateValues.push(choiceValue);
          updateString += 'choice_value = ?, ';
        }
        // Get rid of the comma and white space at the end
        updateString = updateString.slice(0, -2);
    
        // Add WHERE clause for update
        updateString += ' WHERE id = ?';
        updateValues.push(choiceId);
    
        const result = await DBConnection.execute(updateString, updateValues);
    
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Answer choice not found." });
        }
    
        res.json({ message: "Answer choice updated successfully!" });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
      }
    });
export default router;