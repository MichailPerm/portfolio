# main.py
import os

from datetime import date
from flask import Flask, request, render_template, jsonify, send_from_directory
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

@app.route("/favicon.ico")
def favicon():
    print(app.root_path)
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

@app.route("/admin")
def adminToIndex():
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

if __name__ == "__main__":
    app.run()