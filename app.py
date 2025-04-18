from flask import Flask, render_template, session, redirect, url_for, g, request
from database import get_db, close_db
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from forms import RegistrationForm, LoginForm
from functools import wraps

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
app.teardown_appcontext(close_db)
@app.before_request
def load_logged_in_user():
    g.user = session.get("user_id", None)

def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(*args, **kwargs)
    return wrapped_view

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/game")
def game():
    return render_template("game.html")

@app.route("/register", methods=["GET","POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        db = get_db()
        clash = db.execute("""SELECT * FROM users
                           WHERE user_id = ?;""", 
                           (user_id,)).fetchone()
        if clash is not None:
            form.user_id.errors.append("Username already taken")
        else:
            db.execute("""INSERT INTO users (user_id,password)
                       VALUES (?,?);""",
                       (user_id,generate_password_hash(password)))
            db.commit()
            return redirect( url_for("login") )
    return render_template("register.html", 
                            form = form)

@app.route("/login", methods=["GET","POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        db = get_db()
        user_in_db = db.execute("""SELECT * FROM users
                           WHERE user_id = ?;""", 
                           (user_id,)).fetchone()
        if user_in_db is None:
            form.user_id.errors.append("No such username")
        elif not check_password_hash(user_in_db["password"], password):
            form.password.errors.append("Incorrect password!")
        else:
            session.clear()
            session["user_id"] = user_id
            session.modified = True
            next_page = request.args.get("next")
            if not next_page:
                next_page = url_for("index")
            return redirect(next_page)
    return render_template("login.html", form = form)

@app.route("/logout")
def logout():
    session.clear()
    session.modified = True
    return redirect( url_for("index") )