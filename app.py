from flask import Flask, render_template
from flask import request
from flask import jsonify
from github import Github
from sklearn.externals import joblib

ACCESS_TOKEN = "----------"
app = Flask(__name__)

@app.route("/")
def hello_world():
  return render_template('index.html')

@app.route("/search/<username>")
def search(username):
    g = Github(ACCESS_TOKEN)

    user = g.search_users(username)[0]

    user_dict = {}
    user_dict["username"] = user.login
    user_dict["followers"] = user.followers
    user_dict["repositories"] = user.public_repos
    user_dict["stars"] = 0
    user_dict["forks"] = 0
    user_dict["contributions"] = 0

    user_dict["mean_followers"] = 84.9
    user_dict["mean_repositories"] = 32.7
    user_dict["mean_stars"] = 458.9
    user_dict["mean_forks"] = 114.7

    langs = {}

    for repo in user.get_repos():
        if not repo.fork:
            user_dict["stars"] += repo.stargazers_count
            user_dict["forks"] += repo.forks_count

            if repo.language != None:
                if repo.language not in langs:
                    langs[repo.language] = 1
                else:
                    langs[repo.language] += 1

            if repo.get_stats_contributors() is not None:
                for contributor in repo.get_stats_contributors():
                    if contributor is not None and contributor.author.id == user.id:
                        user_dict['contributions'] += contributor.total
                        break

    user_dict["languages"] = langs

    mlp = joblib.load('data/neuralnet.pkl')
    scaler = joblib.load('data/scaler.pkl')

    features = []
    features.append(user_dict["repositories"])
    features.append(user_dict["followers"])
    features.append(user_dict["stars"])
    features.append(user_dict["forks"])

    print(features)

    features = [features]

    features = scaler.transform(features)

    print(features)

    user_dict["net"] = mlp.predict_proba(features)[0][1]

    return jsonify(user_dict)

if __name__ == "__main__":
  app.run(debug=True)
