from flask import Flask, render_template

app = Flask(__name__)


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


# --- PAGE ROUTING ---

@app.route("/")
@app.route("/index")
def index():
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
    app.run(debug=True)