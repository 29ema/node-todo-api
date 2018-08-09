const request= require('supertest');
const expect= require('expect');
const {ObjectID}= require ('mongodb');

const {Todo}= require('./../models/todo.js');
const {app} =require('./../server');

const todos=[{
    _id: new ObjectID(),
    text: "first test"
},{
    text: "second test",
    // completed:true,
    // completedAt: 123
}]

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
        
    }).then(()=>{
        done();
    },(e)=>{console.log(e); done(e);});
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

describe('GET/todos/:id',()=>{
    it('should return a todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
                expect(res.body.todo.text).toEqual(todos[0].text);
            })
            .end(done);
        
    });

    it('should return 404 if todo not found',(done)=>{
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .expect((res)=>{
            expect(res.body).toEqual({});
        }).end(done);
    });

    it('should return 404 for non-object ids',(done)=>{
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .expect((res)=>{
            expect(res.body).toEqual({});
        }).end(done);
    });
});

describe('DELETE/todos/:id',()=>{
    var hexId= todos[0]._id.toHexString();
    
    it('should remove a todo',(done)=>{
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
        
            expect(res.body.todo._id).toEqual(hexId);
        })
        .end((err,res)=>{
            if(err){return done(err);}
            Todo.findById(hexId).then((todo)=>{
                expect(todo).toBeFalsy();
                done();
            }).catch((e)=>done(e))
        });
    });

    it('should return 404 if todo not found',(done)=>{
        request(app)
        .delete(`/todos/:${hexId}`)
        .expect(404)
        .expect((res)=>{
            expect(res.body).toEqual({});
        }).end(done);
    });

    it('should return 404 for non-object ids',(done)=>{
        request(app)
        .delete('/todos/123abc')
        .expect(404)
        .expect((res)=>{
            expect(res.body).toEqual({});
        }).end(done);
    });
});

describe('PATCH/todos/:id',()=>{
    var hexId= todos[0]._id.toHexString();
    

    it('should update the todo',(done)=>{
        var body={text:"testing set",completed:true};
        request(app)
        .patch(`/todos/${hexId}`)
        .send(body)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toEqual(body.text);
            expect(res.body.todo.completed).toEqual(true);
            expect(typeof res.body.todo.completedAt).toBe('number');
        }).end(done);
    });



    it('should clear completedAt when todo is not completed',(done)=>{
        var body={text:"testing 2",completed:false};
        request(app)
        .patch(`/todos/${hexId}`)
        .send(body)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toEqual(body.text);
            expect(res.body.todo.completed).toEqual(false);
            expect(res.body.todo.completedAt).toBe(null);
        }).end(done);

    });
    

});