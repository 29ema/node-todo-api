const request= require('supertest');
const expect= require('expect');
const {ObjectID}= require ('mongodb');

const {Todo}= require('./../models/todo');
const {User}= require('./../models/user');
const {app} =require('./../server');
const {todos,populateTodos,users,populateUsers}= require('./seed/seed')



beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe('POST/users/me',()=>{
    it('should return user when auth',(done)=>{
        var token= users[0].tokens[0].token;
        request(app)
        .get('/users/me')
        .set('x-auth', token)
        .expect(200)
        .expect((res)=>{
            expect(res.body._id).toEqual(users[0]._id.toHexString());
            expect(res.body.email).toEqual(users[0].email);
        }).end(done);
       
        
    });
    it('should return 401 when user !auth',(done)=>{
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res)=>{
            expect(res.body).toEqual({});
        }).end(done);
    });
});

describe('POST/users',()=>{
    
    it('should return a user',(done)=>{
        var newUser= new User({email:'eiwden@example.com',password:'1234ema'});
        request(app)
        .post('/users')
        .send(newUser)
        .expect(200)
        .expect((res)=>{
            expect(res.headers['x-auth']).toBeTruthy();
            expect(res.body.email).toEqual(newUser.email);
            expect(res.body.password).not.toEqual(newUser.password);
        }).end((err,res)=>{
            if (err) return done(err);
            User.find().then((users)=>{
            expect(users.length).toEqual(3);
             expect(users[2].email).toBe(newUser.email);
             done();
         }).catch((e)=>{
             done(e);
            });
        });
    });

    it('should return validation errors if request invalid',(done)=>{
        var newUser= {email:'',password:'1234ema'};
        request(app)
        .post('/users')
        .send(newUser)
        .expect(400)
        .end(done);
    });
    it('should not create user if email in use',(done)=>{
        request(app)
        .post('/users')
        .send({
            email: users[0].email,
            password:'1234ema'
        })
        .expect(400)
        .end(done);
    });
});

describe('POST/users/login',()=>{

    it('should login user and return auth token',(done)=>{
        var email=users[1].email;
        var password=users[1].password;

        request(app)
        .post('/users/login')
        .send({email,password})
        .expect(200)
        .expect((res)=>{
            expect(res.headers['x-auth']).toBeTruthy();
        }).end((err,res)=>{
            if(err) {
                return done(e);
            }
            User.findById(users[1]._id).then((user)=>{
            expect(user.toObject().tokens[0]).toMatchObject({  //replacement toInclude
                access:'auth',
                token:res.headers['x-auth']
            });
            done();
            }).catch((e)=>done(e));
            })
        });
    });

    it('should return 400 if data not valid',(done)=>{
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password:1234852
        })
        .expect(400)
        .expect((res)=>{
            expect(res.headers['x-auth']).toBeFalsy();
        }).end((err,res)=>{
            if(err) {
                return done(e);
            }
            User.findById(users[1]._id).then((user)=>{
            expect(user.tokens.length).toBe(0);
            done();
            }).catch((e)=>done(e));
    });
});

