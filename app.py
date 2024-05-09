from flask import Flask, render_template, request
import sqlite3

# -- FLASK/JINJA VARIABLES --
app = Flask(__name__)

# -- SQLITE3 VARIABLES --


#   --- ERROR HANDLERS ---

@app.errorhandler(400)
def err400(error):
    return render_template('/errors/400.html')

@app.errorhandler(401)
def err401(error):
    return render_template('/errors/401.html')

@app.errorhandler(403)
def err403(error):
    return render_template('/errors/403.html')

@app.errorhandler(404)
def err404(error):
    return render_template('/errors/404.html')

@app.errorhandler(500)
def err500(error):
    return render_template('/errors/500.html')

def upload_data(email, username, password):
    con = sqlite3.connect("data/user-data.db")
    cur = con.cursor()


    print(cur.execute("SELECT * FROM userData;").fetchall())
    print(email)

    dupe_check = cur.execute(f"SELECT * FROM userData WHERE email = '{email}';").fetchall()
    print(dupe_check)
    if dupe_check == 0:
        print("no duplicates")
        cur.execute(f"INSERT INTO userData (email, username, password) VALUES (?, ?, ?);", (email, username, password)) # passing variables after (?, ?, ?) reduces risk of SQL injection
        con.commit()
    elif dupe_check != 0:
        print("email taken")

    res = cur.execute("SELECT * FROM userData;").fetchall()
    print(res)
    print("success")


# --- PAGE ROUTING ---

@app.route("/")
@app.route("/index")
def index():
    return render_template('index.html')

@app.route("/login", methods=["POST"])
def login():
    con = sqlite3.connect("data/user-data.db")
    cur = con.cursor()
    cur.execute("DELETE FROM userData")
    con.commit()
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

    return render_template('index.html')

@app.route("/signup", methods=["POST"])
def signup():
    if request.method == "POST":
        email = request.form.get("email")
        username = request.form.get("username")
        password = request.form.get("password")

        upload_data(email, username, password)

    return render_template('index.html')

@app.route("/wiki")
def wiki():
    return render_template('wiki.html')

@app.route("/mindle")
def mindle():
    return render_template('mindle.html')

@app.route("/about_us")
def about_us():
    return render_template('about-us.html')

@app.route("/settings")
def settings():
    return render_template('settings.html')


if __name__ == "__main__":
    app.run()