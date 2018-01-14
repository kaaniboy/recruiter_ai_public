import pandas as pd
from sklearn.preprocessing import StandardScaler

amazon = pd.read_csv("data/amazon.csv", index_col=0)
google = pd.read_csv("data/google.csv", index_col=0)
facebook = pd.read_csv("data/facebook.csv", index_col=0)
microsoft = pd.read_csv("data/microsoft.csv", index_col=0)

big_n = pd.concat([amazon, google, facebook, microsoft], ignore_index=True)
big_n = big_n.drop("contributions", 1)
big_n["big_n"] = 1

non_big_n = pd.read_csv("data/normies_3.csv", index_col=0)
non_big_n = non_big_n.drop("contributions", 1)
non_big_n["big_n"] = 0
non_big_n = non_big_n[non_big_n["repositories"] < 15]

big_n.to_csv("data/big_n.csv")
non_big_n.to_csv("data/non_big_n.csv")

training = pd.concat([big_n, non_big_n], ignore_index=True)
training.to_csv("data/training.csv")

X = training.iloc[:, 1:-1]
y = training.iloc[:, -1]
