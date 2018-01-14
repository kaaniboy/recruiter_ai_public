import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
from sklearn.externals import joblib

training = pd.read_csv("data/training.csv", index_col=0)

X = training.iloc[:, 1:-1].as_matrix()
y = training.iloc[:, -1].as_matrix()

print(X)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# lr = LogisticRegression()
# lr = lr.fit(X_scaled, y)

# print(lr.predict(X_scaled))
# print(accuracy_score(y, lr.predict(X_scaled)))

mlp = MLPClassifier(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(5, 2), random_state=1)

mlp = mlp.fit(X_scaled, y)

print("Model has accuracy of " + str(accuracy_score(y, mlp.predict(X_scaled))) + ".")
joblib.dump(mlp, 'data/neuralnet.pkl')
joblib.dump(scaler, 'data/scaler.pkl')
