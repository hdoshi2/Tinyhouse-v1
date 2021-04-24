import bodyParser from 'body-parser';
import express from 'express';
import {ApolloServer} from "apollo-server-express";
import {listings} from './listings';
import {typeDefs, resolvers} from './graphql';

const app = express();
const port = 9000;

const server = new ApolloServer({typeDefs, resolvers});
server.applyMiddleware({app, path: "/api"})



app.use(bodyParser.json());

app.get('/', (_req, res) => res.send('Hello'));


app.get("/listings", (_req, res) => {
    return res.send(listings);
})


app.post('/delete-listing', (req, res) => {
    const id: string = req.body.id;

    for(let i = 0; i < listings.length; i++){
        if(listings[i].id === id){
            return listings.splice(i,1)
        }
    }

    return res.send("failed to delete listing");
});



app.listen(port);

console.log(`[app] http://localhost:${port}`);
