const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../auth/model/user");
const mongoose = require('mongoose');
let server;

describe("/api/genres", () => {
  //initialize the server
  beforeEach(() => {
    server = require("../../index");
  });
  // close the server
  afterEach(async () => {
    server.close();
    // remove all the documents from a collection
    await Genre.remove({});
  });

  //Get all genres
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
        { name: "genre3" }
      ]);
      // test the get all genres
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
      expect(res.body.some(g => g.name === "genre1")).toBeTruthy();
    }); // it all genres
  }); // describe all genres

  // Get a genre by id
  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    }); // it

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    }); // it


    it("should return 404 if no genre with the given id exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get("/api/genres/" + id);
      expect(res.status).toBe(404);
    }); // it


  }); // describe get genre by

  describe("POST /", () => {
   // refactoring our test
   // define the happy path, and then in each test, we change
   // one parameter that clearly aligns with the name of the test

   let token;
   let name;


   // function to refactor de test
        const exec = async () => {
            return await request(server)
            .post("/api/genres")
            .set('x-auth-token', token)
            .send({ name });
        };

        // before each test we are initailizing our test with a valid json web token
        beforeEach( () => {
            // create a token to log the user
            token = new User().generateAuthToken();
            name = 'genre1'
        });

      // 401 if client is not logged in
    it("should return 401 if client is not logged in", async () => {
      //const res = await request(server)
       // .post("/api/genres")
       // .send({ name: "genre1" });

     // set the token to an empty string to simulate that the User is not logged in  
     token = '';
     const res =  await  exec();
     expect(res.status).toBe(401);

    }); // it

    //return 400 if genre is invalid
    it("should return 400 if genre is less than 5 characters", async () => {

        name = '1234';
        const res = await exec();
        expect(res.status).toBe(400);
      }); // it


         //return 400 if genre is invalid
    it("should return 400 if genre is greater than 50 characters", async () => {
        //generate a string of 50 characters
         name =  new Array(52).join('a');

         const res = await exec();
          expect(res.status).toBe(400);
        }); // it

        it("should save the genre if it is valid", async () => {
    
             await exec();
             const genre = await Genre.find({name: 'genre1'});
              expect(genre).not.toBeNull();
            }); // it


            it("should return  genre if it is valid", async () => {
    
                const res = await exec();
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('name', 'genre1');
               }); // it


  }); // describe POST
}); // describe parent
