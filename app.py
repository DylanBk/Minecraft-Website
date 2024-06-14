from flask import Flask, render_template, url_for, request
import sqlite3, base64

# -- FLASK/JINJA VARIABLES --

app = Flask(__name__)


# -- SQLITE3 VARIABLES --

con = sqlite3.connect("data/user-data.db")
cur = con.cursor()

cur.execute("CREATE TABLE if not exists userData (email TEXT UNIQUE, username TEXT UNIQUE, password TEXT);")
cur.execute("CREATE TABLE if not exists palettes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, image BLOB);")


#   --- SQLITE3 SUBROUTINES ---

def upload_data(email, username, password):
    con = sqlite3.connect('data/user-data.db')
    cur = con.cursor()

    con.execute("BEGIN TRANSACTION;") # allows for a db rollback incase of an error

    try:
        email_dupe_check = cur.execute(f"SELECT * FROM userData WHERE email = ?;", (email,)).fetchall()
        username_dupe_check = cur.execute(f"SELECT * FROM userData WHERE username = ?;", (username,)).fetchall()

        if len(email_dupe_check) == 0:
            print("no duplicates")
            if len(username_dupe_check) == 0:
                cur.execute(f"INSERT INTO userData (email, username, password) VALUES (?, ?, ?);", (email, username, password)) # passing variables after (?, ?, ?) reduces risk of SQL injection
                con.commit()
            else:
                print("username taken")
        else:
            print("email taken")
    except Exception as err:
        con.rollback() # basically CTRL + Z for the db
        print(f"Error: {err}")

def check_data(email, password):
    con = sqlite3.connect('data/test.db')
    cur = con.cursor()

    res = cur.execute(f"SELECT * FROM userData WHERE email = ?;", (email,)).fetchall()

    if len(res) == 0:
        pass
    else:
        res = cur.execute(f"SELECT password FROM userData WHERE email = ?;", (email,)).fetchall()

        if res == password:
            pass

def remove_data(email, username, password):
    con = sqlite3.connect('data/test.db')
    cur = con.cursor()

    cur.execute("BEGIN TRANSACTION;")

    try:
        cur.execute(f"DELETE FROM userData WHERE email = ?;", (email,))
        con.commit()
    except Exception as err:
        con.rollback()
        print(f"Error: {err}")


#   --- ERROR HANDLERS ---

@app.errorhandler(400) # bad request
def err400(error):
    return render_template('/errors/error.html', error_title="Sorry! We cannot process your request.", error_subtitle="Double check your inputs and try again.")

@app.errorhandler(401) # unauthorised
def err401(error):
    return render_template('/errors/error.html', error_title="You do not have authorisation to view this content.", error_subtitle="Please log in to access this page.")

@app.errorhandler(403) # forbidden
def err403(error):
    return render_template('/errors/error.html', error_title="You do not have access to view this content.", error_subtitle="Please contact us if you believe this to be a mistake.")

@app.errorhandler(404) # not found
def err404(error):
    return render_template('/errors/error.html', error_title="Sorry! We could not find that page.", error_subtitle="Check the URL or return to the <a href='" + url_for('index') + "'>home page</a>.")

@app.errorhandler(500) # internal server error
def err500(error):
    return render_template('/errors/error.html', error_title="Sorry, something went wrong on our end.", error_subtitle="Check back later or report the issue at <a href='" + url_for('index') + "'>email or something</a>.")


# --- PAGE ROUTING ---

@app.route("/")
@app.route("/index")
def index():
    return render_template('index.html')

@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        check_data(email, password)

    return render_template('index.html')

@app.route("/signup", methods=["POST"])
def signup():
    if request.method == "POST":
        email = request.form["email"]
        username = request.form["username"]
        password = request.form["password"]

        upload_data(email, username, password)

    return render_template('index.html')

@app.route("/wiki")
def wiki():
    return render_template('wiki.html')

@app.route("/block-palettes")
def block_palettes(): # code not working
    # con = sqlite3.connect('data/block-palettes.db')
    # cur = con.cursor()

    # # !! CONVERT IMAGE BINARY DATA TO IMAGE !!
    # with open("static/images/account.png", "rb") as f:
    #     png_encoded = base64.b64encode(f.read())
    # # print(png_encoded)
    # encoded_b2 = "".join([format(n, '08b') for n in png_encoded])

    # print(encoded_b2)

    # # png_decoded = base64.b64decode(png_encoded)

    # res = cur.execute("SELECT * FROM palettes;")

    # return render_template('block-palettes.html', png_decoded=encoded_b2)
    return render_template('block-palettes.html')

@app.route("/upload-block-palette", methods=["POST"])
def upload_block_palette():
    print("checkpoint1")
    con = sqlite3.connect('data/block-palettes.db')
    cur = con.cursor()
    print("connected to db")

    if request.method == "POST":
        cur.execute("BEGIN TRANSACTION;")
        print("begun transaction")
        try:
            name = request.form["block-palette-name"]

            if 'block-palette-img' in request.files:
                image = request.files["block-palette-img"]
                image = image.read()
            else:
                print("no image")

            cur.execute(f"INSERT INTO palettes (name, image) VALUES (?, ?);", (name, image))
            con.commit()
        except Exception as err:
            con.rollback()
            print(f"Error: {err}")

    res = cur.execute("SELECT * FROM palettes;")
    return render_template('block-palettes.html', palettes=res)

@app.route("/upload-build")
def upload_build():
    pass

@app.route("/mindle")
def mindle():
    return render_template('mindle.html')

@app.route("/about-us")
def about_us():
    return render_template('about-us.html')

@app.route("/settings")
def settings():
    return render_template('settings.html')

@app.route("/delete-account")
def delete_account():
    email = "test@domain.com" # !! GET USER DATA SOMEHOW !!
    username = "aa"
    password = "password123"

    remove_data(email, username, password)

    return render_template('index.html')


if __name__ == "__main__":
    app.run()