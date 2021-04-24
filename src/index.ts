import express, {Application} from 'express';
import {ApolloServer} from "apollo-server-express";
import {typeDefs, resolvers} from './graphql';
import {connectDatabase} from './database';

const port = 9000;

const mount = async (app: Application) => {

    const db = await connectDatabase();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({db})
    });

    server.applyMiddleware({app, path: "/api"})

    app.listen(port);

    console.log(`[app] http://localhost:${port}`);

    const listings = await db.listings.find({}).toArray();
    console.log(listings);
}

mount(express());



// // app.use(bodyParser.json());

// app.get('/', (_req, res) => res.send('Hello'));


// app.get("/listings", (_req, res) => {
//     return res.send(listings);
// })


// app.post('/delete-listing', (req, res) => {
//     const id: string = req.body.id;

//     for(let i = 0; i < listings.length; i++){
//         if(listings[i].id === id){
//             return listings.splice(i,1)
//         }
//     }

//     return res.send("failed to delete listing");
// });

