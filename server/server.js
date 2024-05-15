const express = require('express');
const { MongoClient } = require('mongodb');
const next = require('next');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 8080;
const db = require('./db.js');



//const
app.prepare().then(() => {

    const server = express()
    server.use(bodyParser.json());


    server.post('/api/delete/category', async (req, res) => {
        console.log(`Handling ${req.method} ${req.url}`);
        try {
            const {category } = req.body;
            // Here you can add your logic to add the card to your database
            // For example, if you're using MongoDB:
            let result = await db.deleteCategory(category)
           // console.log(result);
            // Send a response back
            res.status(201).json({ message: `Deleted ${category} from server.`, data: {...result} }); //data: {...result}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        } finally {
           // await client.close();
        }
    });

    server.post('/api/addcard', async (req, res) => {
        console.log(`Handling ${req.method} ${req.url}`);
        try {
            const { question, answer, category } = req.body;
            // Here you can add your logic to add the card to your database
            // For example, if you're using MongoDB:
            let result = await db.insertCard({ question, answer, category });
           // console.log(result);
            // Send a response back
            res.status(201).json({ message: 'New card added to server' , data: {...result}});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        } finally {
           // await client.close();
        }
    });
    
    server.get('/api/cards/category', async (req, res) => {
        console.log(`Handling ${req.method} ${req.url}`);
        
    });

    server.get('/api/data', async (req, res) => {
        console.log(`Handling ${req.method} ${req.url}`);
        try {
          const data = await db.getData(); //.getCards() //.getData();

          res.json(data);
        } catch (error) { 
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } finally {
          //await client.close();
        }
    });
    
    
    server.get('/api/cards', async (req, res) => {
        console.log(`Handling ${req.method} ${req.url}`);
        try {
          
          const data = await db.getCards();
          console.log(data);
          res.json(data);
        } catch (error) { 
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } finally {
          //await client.close();
        }
    });
    
    server.get('/api/categories', async (req, res) => {
        console.log(`Handling ${req.method} ${req.url}`);
        //const { question, answer, category } = req.body;
        try {
           
            
            const data = db.getCategories();
            res.json(data);
        } catch (error) { 
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        } finally {
            //await client.close();
        }
    });

    server.get('*', (req, res) => {
        //console.log(`Handling ${req.method} ${req.url}`);
        
        return handle(req, res);
    });

    server.listen(port, () => {
        console.log(`API server listening at http://localhost:${port}`);
    });
})


