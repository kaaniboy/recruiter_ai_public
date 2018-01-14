from github import Github
import pandas as pd

BIG4 = ["Facebook", "Google", "Amazon", "Microsoft"]

g = Github("")

users = g.search_users("Software Engineer Facebook")

users_data = []
processed = 0

for user in users:
    user_dict = {}
    user_dict["username"] = user.login
    user_dict["followers"] = user.followers
    user_dict["repositories"] = user.public_repos
    user_dict["stars"] = 0
    user_dict["forks"] = 0
    user_dict["contributions"] = 0

    for repo in user.get_repos():
        if not repo.fork:
            user_dict["stars"] += repo.stargazers_count
            user_dict["forks"] += repo.forks_count

            if repo.get_stats_contributors() is not None:
                for contributor in repo.get_stats_contributors():
                    if contributor is not None and contributor.author.id == user.id:
                        user_dict['contributions'] += contributor.total
                        break

    users_data.append(user_dict)

    processed = processed + 1
    if processed % 2 == 0:
        print("Processed " + str(processed) + ".")

        df = pd.DataFrame(users_data, columns=user_dict.keys())
        df.to_csv("facebook.csv")
