# %% 
import pandas as pd
## This file has been changed and altered as I've moved through the process, so it is not a perfect roadmap of the route I took to make my visualisation.
## At the very least you should be able to see the main bit of exploratory analysis I did that informed my final visualisation, to run this see end of file
## Many of the csv files used in the first part of this code have been changed majorly since I used them, so this code will not run correctly.
## I have included it to show my thought process and the way I created my final product.

## Code has been commented out so the data analysis at the end of the file will run correctly.

# Removing unneeded columns and rows, also made some alterations directly to csv file. These alterations included films spelled differently between the datasets, 
# films with multiple entries that saved the incorrect result to final frame (e.g. Little Women, A Star is Born), and films that were released after the dataset
# had been compiled.
oscarFrame = pd.read_csv("oscars_df.csv")
for i in range(24):
    oscarFrame.drop(oscarFrame.columns[6], axis=1, inplace = True)
for i in range(270):
    oscarFrame = oscarFrame.drop([i])
oscarFrame = oscarFrame.reset_index()
oscarFrame.drop(oscarFrame.columns[0], axis=1, inplace = True)
oscarFrame.to_csv("oscarFrame.csv")

oscarFrame = pd.read_csv("oscarFrame4.csv")
metaFrame = pd.read_csv("metacritic_movies.csv")

# Adding metacritic critic and user ratings
metaCriticList = []
metaUserList = []
for i in range(301):
    metaCriticList.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].metascore).split()[1])
    metaUserList.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].userscore).split()[1])
oscarFrame["Meta Critic"] = metaCriticList
oscarFrame["Meta User"] = metaUserList
oscarFrame.to_csv("oscarFrame3.csv", index=False)

# Making the decimal ratings of Metacritic User ratings out of 100
for i in range(301):
    oscarFrame["IMDB Rating"].iloc[i] = oscarFrame["IMDB Rating"].iloc[i]*10
    oscarFrame["Meta User"].iloc[i] = oscarFrame["Meta User"].iloc[i]*10

oscarFrame["IMDB Rating"] = oscarFrame["IMDB Rating"].astype(int)
oscarFrame["Meta User"] = oscarFrame["Meta User"].astype(int)
oscarFrame.to_csv("oscarFrame4.csv", index=False)

#Making dataframe with number of reviews to check how many seperate ratings each film has received.
metaMixed = []
metaPos = []
metaNeg = []
userMixed = []
userPos = []
userNeg = []

for i in range(302):
    metaMixed.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].meta_mixed).split()[1])
    metaPos.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].meta_positive).split()[1])
    metaNeg.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].meta_negative).split()[1])
    userMixed.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].user_mixed).split()[1])
    userPos.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].user_positive).split()[1])
    userNeg.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].user_negative).split()[1])

oscarFrame["MetaMixed"] = metaMixed
oscarFrame["MetaPos"] = metaPos
oscarFrame["MetaNeg"] = metaNeg
oscarFrame["UserMixed"] = userMixed
oscarFrame["UserPos"] = userPos
oscarFrame["UserNeg"] = userNeg
oscarFrame[100:].to_csv("reviewNumberFrame4.csv", index=False)
