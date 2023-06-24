const express = require('express')
const bodyParser = require('body-parser')
const sqlite = require('sqlite3')
const md5 = require('js-md5')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')

const db = new sqlite.Database('db.sqlite')

const initDatabase = () => {
    db.exec('DROP TABLE IF EXISTS `courses`;')
    db.exec('DROP TABLE IF EXISTS `tokens`;')
    db.exec('DROP TABLE IF EXISTS `members`;')
    db.exec('DROP TABLE IF EXISTS `registrations`;')
    db.exec(
      'CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY, title TEXT, description TEXT, date_time DATETIME, duration_days INT, location TEXT, instructor_name TEXT, seats INT);'
    )
    db.exec(
      "INSERT INTO `courses` (`id`, `title`, `description`, `date_time`, `duration_days`, `location`, `seats`, `instructor_name`) VALUES (1, 'HTML5, CSS3 Basics', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.', '2019-08-15 08:00:00', 3, 'Floor1', 15, 'Aleksey Abramov'),(2, 'Web conference', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi maiores praesentium vel voluptatum! A alias facilis id in necessitatibus, nobis non odio possimus, quisquam quo saepe sapiente sint, ullam!', '2019-09-12 08:00:00', 2, 'Floor3', 1, 'Pavel Zajec');"
    )
    
    db.exec(
      'CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY, username TEXT, password TEXT, firstname TEXT, lastname TEXT, email TEXT, photo_url TEXT, teacher_id TEXT, is_activated BOOL);'
    )
    db.exec(
      'CREATE TABLE IF NOT EXISTS registrations (id INTEGER PRIMARY KEY, course_id INT, member_id INT, registration_date DATETIME, course_rating INT);'
    )
    db.exec(
      'CREATE TABLE IF NOT EXISTS tokens (id INTEGER PRIMARY KEY, token TEXT, user_id INT);'
    )
    console.log("Init database")
}

initDatabase()

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
})

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('tiny'))

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// Member login
app.post('/api/v1/login', (req, res, next) => {
  db.get(
    'SELECT * FROM members WHERE username=? AND password=? AND is_activated=TRUE;',
    req.body.username,
    req.body.password,
    (err, member) => {
      if (!member) return res.status(401).send({ message: 'Invalid login' })
      let token = md5(member.username)
      db.run(
        'INSERT INTO tokens VALUES(NULL, ?, ?);',
        token,
        member.id,
        err => {
          res.send({ token })
        }
      )
    }
  )
})

// Deactivate member (id=1)
app.put('/api/v1/deactivate', (req, res, next) => {
    db.run(
        'UPDATE members SET is_activated=0 WHERE id=1;',
        err => {
          if (err) {
            console.log(err)
            return res.send({ message: 'Not updated' })
          }
          res.send({ message: 'Member deactivated' })
        }
      )
  })

// Member registration
app.post('/api/v1/profile', (req, res, next) => {
  if (!req.body.teacher_id) { return res.status(422).send({ message: 'Wrong teacher ID' }) }
  let teacher_id = req.body.teacher_id
  let sum = 0
  teacher_id
    .slice(0, -1)
    .split('')
    .map((n, key) => {
      sum += (key + 1) * Number(n)
    })
  if (sum % 11 != Number(teacher_id.substr(-1)) || teacher_id.length != 11) { return res.status(422).send({ message: 'Wrong teacher ID' }) }
  db.get(
    'SELECT * FROM members WHERE email=? OR username=?;',
    req.body.email,
    req.body.username,
    (err, exUser) => {
      if (exUser) {
        return res
          .status(422)
          .send({ message: 'Member email or username already registered' })
      }
      db.run(
        'INSERT INTO members VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, TRUE);',
        req.body.username,
        req.body.password,
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.photo,
        req.body.teacher_id,
        err => {
          if (err) console.log(err)
          if (err) return res.send({ message: 'Data can not be processed' })
          db.get(
            'SELECT * FROM members WHERE username=? AND password=?;',
            req.body.username,
            req.body.password,
            (err, member) => {
              if (!member) { return res.status(401).send({ message: 'Invalid login' }) }
              let token = md5(member.username)
              db.run(
                'INSERT INTO tokens VALUES(NULL, ?, ?);',
                token,
                member.id,
                err => {
                  res.send({ token })
                }
              )
            }
          )
        }
      )
    }
  )
})

app.get('/api/v1/profile', (req, res, next) => {
  db.all('SELECT * FROM members', (err, users) => {
    res.send(
      users.map(user => {
        return {
          ...user,
          photo: user.photo_url,
          photo_url: '/api/v1/profile/' + user.username + '.png'
        }
      })
    )
  })
})

app.get('/api/v1/profile/:username.png', (req, res, next) => {
  db.get(
    'SELECT * FROM members WHERE username=?',
    req.params.username,
    (err, user) => {
      if (!user) return res.status(404).end()
      let data = user.photo_url
      if (!data) data = ''
      data = data.replace('data:image/png;base64,', '')
      var img = new Buffer(data, 'base64')
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      })
      res.end(img)
    }
  )
})

// Check token
app.use((req, res, next) => {
  db.get(
    'SELECT * FROM tokens WHERE token=?',
    req.query.token,
    (err, token) => {
      if (!token) { return res.status(401).send({ message: 'Unauthorized member' }) }
      req.memberId = token.user_id
      next()
    }
  )
})

// Member logout
app.post('/api/v1/logout', (req, res, next) => {
  db.run('DELETE FROM tokens WHERE token=?;', req.query.token, err => {
    res.send({ message: 'Logout success' })
  })
})

// Get courses
app.get('/api/v1/courses', (req, res, next) => {
  db.all('SELECT * FROM courses;', (err, courses) => {
    res.send(courses)
  })
})

// Get course registration
app.get('/api/v1/registrations', (req, res, next) => {
  db.all(
    'SELECT * FROM registrations WHERE member_id=?;',
    req.memberId,
    (err, regs) => {
      res.send(regs)
    }
  )
})

// Course rating
app.put('/api/v1/registrations/:id', (req, res, next) => {
  let rate = Number(req.body.course_rating) 
  console.log("rate", rate)
  let course_id = Number(req.params.id)
  if (!(rate==0 || rate==1 || rate==2)) return res.send({ message: 'Bad request' })
  else db.get('SELECT * FROM registrations WHERE course_id=? AND member_id=?;', course_id, req.memberId, (err, registration) => {
    if (!registration) res.send({ message: 'Bad request' })
    else {
        db.run(
          'UPDATE registrations SET course_rating=? WHERE course_id=? AND member_id=?;',
          Number(req.body.course_rating),
          Number(req.params.id),
          req.memberId,
          err => {
            if (err) {
              console.log(err)
              return res.send({ message: 'Bad request' })
            }
            res.send({ message: 'Rating success' })
          }
        )
    }
  })
})

// Course registration
app.post('/api/v1/registrations', (req, res, next) => {
  course_id = req.body.course_id
  db.get('SELECT * FROM courses WHERE id=?;', course_id, (err, course) => {
    if (err) console.log(err)
    if (!course) {
      return res.status(422).send({ message: 'Not found' })
    } else {
      db.get(
        'SELECT * FROM registrations WHERE member_id=? AND course_id=?;',
        req.memberId,
        course_id,
        (err, exReg) => {
          if (exReg) {
            return res
              .status(422)
              .send({ message: 'Member already registered' })
          }
          db.get(
            'SELECT COUNT(*) AS c FROM registrations WHERE course_id=?',
            course_id,
            (err, r) => {
              let numRegistered = r.c
              db.get(
                'SELECT seats FROM courses WHERE id=?',
                req.body.course_id,
                (err, course) => {
                  if (numRegistered >= course.seats) { return res.status(406).send({ message: 'No available seat' }) }
                  db.run(
                    "INSERT INTO registrations VALUES (NULL, ?, ?, datetime('now'), NULL);",
                    course_id,
                    req.memberId,
                    err => {
                      if (err) return res.send({ message: 'Error' })
                      res.send({ message: 'Registration success' })
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  })
})

app.listen(8001, () => {
  console.log('Listening on 8001')
})
