const expect = require('expect');
const request = require('supertest');

const { ObjectID } = require('mongodb');
const { app } = require('./../server');

const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');

const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST / todos', function (){

    it('should create a new todo', function (done) {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end(function (err, res) {
                if (err) {
                  done(err);
                }
            Todo.find({text}).then(function (todos) {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
            }).catch(function (e) { done(e) });
            });
    });


    it('should not create todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });

    });

});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
               
    });
});

describe('GET /todos/:id', () => {

    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        // make sure get 404 back
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should return 404 for non-object ids', (done) => {
        // make sure get 404 back
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e) => done(e));

            });
    });

    it('should return 404 if todo not found', (done) => {
        // make sure get 404 back
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });

    });

    it('should return 404 if object is invalid', (done) => {
        // make sure get 404 back
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });

    });

});

describe('PATCH /todos/:id', () => {
    it('Should update a todo', (done) => {
        var text = 'This should be the new text';
        var hexId = todos[0]._id.toHexString(); // grabs id of first item 
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe( 'number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();  // grabs id of second item 
        var text = 'This should be the new text!!';
       
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
    });
});

describe('GET / users/me', () => {

    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
                console.log(res.body._id);
                console.log(res.body.email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
          .get('/users/me')
          .expect(401)
          .expect((res) => {
              expect(res.body).toEqual({});
          })
          .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'ema@example.com';
        var password = '123mnb!'
        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {s
                    return done(err);
                }

                User.findOne({ email }).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.password !== password);
                    done();
                });
            });
    });


    it('should return validation errors if request invalid', (done) => {
        var email = 'xhdg';
        var password = '1gaga'
        request(app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done);

    });
});

    //it('should not create user if email is in use', (done) => {
    //    var email = 'jen@example.com';
    //    var password = '1'
    //    request(app)
    //        .post('/users')
    //        .send({ email, password })
    //        .expect(400)
    //        .end(done);
    //});