# main.py
from datetime import date
from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://odoo8:test@localhost/portfolio'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

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

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/news")
def requestNews():
    # Здесь должен быть запрос к БД на предмет новостей и возврат объекта в виде JSON
    # Проверил запрос к базе. Теперь можно и делать то, что надо.
    news = News.query.all()
    # import pdb; pdb.set_trace()
    # print (news)
    return jsonify(str(news).replace("'", "\""))

@app.route("/newsGet")
def backToIndex():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()