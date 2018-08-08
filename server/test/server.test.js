const request= require('supertest');
const expect= require('expect');

const {Todo}= require('./../models/todo.js');
const {app} =require('./../server');

const todos=[{
    text: "first test"
},{
    text: "second test"
}]

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>{
        done();
    },(e)=>{console.log(e)});
});

describe('POST/todos', ()=>{

    it('should create a new todo', (done)=>{
        var text= "Test todo text";
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        }).end((err,res)=>{
            if (err) return done(err);
            Todo.find().then((todos)=>{
            expect(todos.length).toEqual(3);
            expect(todos[2].text).toBe(text);
            done();
            }).catch((e)=>{
                done(e);
            })
        });
    });

    it('should not create todo with invalid body data', (done)=>{
        request(app)
        .post('/todos')
        .send({text:''})
        .expect(400)
        .end((err,res)=>{
            if (err) return done(err);
            Todo.find().then((todos)=>{
                expect(todos.length).toEqual(2);
                done();
            }).catch((e)=>{done(e);})
        });
    });
});

describe('GET/todos', ()=>{

    it('should fetch all todos', (done)=>{
        request(app)
        .get('/todos')
        .send()
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        }).end(done);
    });
});