# main.py
import os

from datetime import date
from flask import Flask, request, render_template, jsonify, send_from_directory, session
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)


config = {
    'mode': 'debug'
}


app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['JWT_SECRET_KEY'] = os.urandom(24)
if config['mode'] == 'debug':
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://odoo8:test@localhost/portfolio'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://uhdtsnrlhzdtzq:c4436192a460488ad0b6feab11420a3d99150df43dfb5c8bd34c869300036b34@ec2-54-204-40-248.compute-1.amazonaws.com:5432/ddqcnj9cogkr1j'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
jwt = JWTManager(app)

class News(db.Model):

    __tablename__ = 'News'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(120), nullable = False)
    text = db.Column(db.Text, nullable = False)
    author = db.Column(db.String(80), nullable = False)
    date = db.Column(db.Date)

    def __repr__(self):
        date_string = self.date.strftime("%d.%M.%y")
        return '{"id": %r, "title": %r, "text": %r, "author": %r, "date": %r}' % (self.id, self.title, self.text, self.author, date_string)


class User(db.Model):

    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key = True)
    fio = db.Column(db.String(120), nullable = False)
    login = db.Column(db.String(80), nullable = False)
    password = db.Column(db.String(80), nullable = False)
    token = db.Column(db.String(80), nullable = False)
    date = db.Column(db.Date)
    phone = db.Column(db.String(20))
    email = db.Column(db.String(20))

    def __repr__(self):
        # date_string = self.date.strftime("%d.%M.%y")
        return '{"id": %r, "fio": %r, "login": %r, "password": %r, "token": %r, "phone": %r, "email": %r }' % (
            self.id, self.fio, self.login, self.password, self.token, self.phone, self.email)


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, '../static'), 'favicon.ico',mimetype='image/vnd.microsoft.icon')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/news")
def requestNews():
    news = News.query.order_by(News.id.desc()).all()
    return jsonify(str(news).replace("'", "\""))

@app.route("/newsGet")
def backToIndex():
    return render_template("index.html")

@app.route("/setLogin")
def backFromLogin():
    return render_template("index.html")

@app.route("/admin")
def adminToIndex():
    return render_template("index.html")

@app.route("/addNew")
def addNewToIndex():
    return render_template("index.html")

@app.route("/newsList")
def newToIndex():
    return render_template("index.html")

@app.route("/post", methods=['POST'])
def addNews():
    new_dict = request.get_json()
    new_dict['date'] = date.today()
    new_record = News(
        author = new_dict['author'],
        title=new_dict['title'],
        text=new_dict['text'],
        date=new_dict['date']
    )
    db.session.add(new_record)
    db.session.commit()
    return "Ok"

@app.route("/login", methods=['POST'])
def LogIn():
    login_dict = request.get_json()
    account = User.query.filter(User.login==login_dict['login']).filter(User.password==login_dict['pass']).all()
    if account:
        access_token = create_access_token(identity=account[0].login)
        return jsonify(str({"access_token": access_token}).replace("'", "\""))
    else:
        return jsonify({"msg": "Bad login data"})

@app.route("/about")
def aboutToIndex():
    return render_template("index.html")

@app.route("/portfolio")
def portfolioToIndex():
    return render_template("index.html")

@app.route("/deleteNew", methods=['DELETE'])
def deleteNew():
    new_dict = request.get_json()
    new_to_delete = News.query.filter(News.id==new_dict['idx']).first()
    db.session.delete(new_to_delete)
    db.session.commit()
    return "Ok"

if __name__ == "__main__":
    app.run()
    