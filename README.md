## **evaluation-system API**

**This API** was developed for the program of Platzi, Platzi Master as test of the first week of the program, Diagnostic Week

**Was build Node.Js + TypeScript + Express, MongoAtlas** 

**`ENDPOINTS /api/questions`**

return all the documents in `questions` collection

    GET /api/questions
   
create a `question` with the correspondent **schema** validation with `JOI`

     POST /api/questions

**Schema** example

    {
    	"question":  "Cuanto es 20 / 1?",
    	"answer":  ["20",  "2",  "10",  "4"],
    	"topic":  "matematica",
    	"correctAnswer":  "20"
    }

For delete a question

    DELETE /api/questions/:questionId

To create a Test yo will send via `query.params` `topic` and the number of question(min 5)

    GET /api/test/:topic/:count

With this endpoint you will create a test with the `topic` and `count` you send

For verify a test you need to send via `req.body` an object througth this `endpoint`

    GET /api/test/
the **Schema** you need

    {
	    //Id of the test when you create
	    //id_question is the id of the question when you create the test
	    //answer is the answer you send 
    	"id":  "616cc0f3adc0c86a7c475c98",
    	"answers":  [
    	{"id_question":  "61696df2583a887710eaaf8c",  "answer":  "4"},
    	{"id_question":  "616970191d3fff3a5dd95c76",  "answer":  "5"}
    	]
    }

**DEPLOY**
Download the project and

    npm install
After that you must edit the `.env` file

    PORT=3000
    MONGO_USER=<user>
    MONGO_PASSWORD=<password>
    MONGO_HOST=<host>
    MONGO_DB_NAME=<db name>
    MONGO_CONNECTION=mongodb+srv:
Link heroku https://evaluation-system-api.herokuapp.com/