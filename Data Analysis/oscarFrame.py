# %% 
import pandas as pd
import matplotlib.pyplot as plt
### This file has been changed and altered as I've moved through the process, so it is not a perfect roadmap of the route I took to make my visualisation.
### At the very least you should be able to see the main bit of exploratory analysis I did that informed my final visualisation, to run this see end of file
### Many of the csv files used in the first part of this code have been changed majorly since I used them, so this code will not run correctly.
### I have included it to show my thought process and the way I created my final product.

### Code has been commented out so the data analysis at the end of the file will run correctly.

# # Removing unneeded columns and rows, also made some alterations directly to csv file. These alterations included films spelled differently between the datasets, 
# # films with multiple entries that saved the incorrect result to final frame (e.g. Little Women, A Star is Born), and films that were released after the dataset
# # had been compiled.
# oscarFrame = pd.read_csv("oscars_df.csv")
# for i in range(24):
#     oscarFrame.drop(oscarFrame.columns[6], axis=1, inplace = True)
# for i in range(270):
#     oscarFrame = oscarFrame.drop([i])
# oscarFrame = oscarFrame.reset_index()
# oscarFrame.drop(oscarFrame.columns[0], axis=1, inplace = True)
# oscarFrame.to_csv("oscarFrame.csv")

# oscarFrame = pd.read_csv("oscarFrame4.csv")
# metaFrame = pd.read_csv("metacritic_movies.csv")
# winnersFrame = pd.read_csv("winnersFrame.csv")

# # Adding metacritic critic and user ratings
# metaCriticList = []
# metaUserList = []
# for i in range(301):
#     metaCriticList.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].metascore).split()[1])
#     metaUserList.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].userscore).split()[1])
# oscarFrame["Meta Critic"] = metaCriticList
# oscarFrame["Meta User"] = metaUserList
# oscarFrame.to_csv("oscarFrame3.csv", index=False)

# # Making the decimal ratings of Metacritic User ratings out of 100
# for i in range(301):
#     oscarFrame["IMDB Rating"].iloc[i] = oscarFrame["IMDB Rating"].iloc[i]*10
#     oscarFrame["Meta User"].iloc[i] = oscarFrame["Meta User"].iloc[i]*10

# oscarFrame["IMDB Rating"] = oscarFrame["IMDB Rating"].astype(int)
# oscarFrame["Meta User"] = oscarFrame["Meta User"].astype(int)
# oscarFrame.to_csv("oscarFrame4.csv", index=False)

# #Making dataframe with number of reviews to check how many seperate ratings each film has received.
# metaMixed = []
# metaPos = []
# metaNeg = []
# userMixed = []
# userPos = []
# userNeg = []

# for i in range(302):
#     metaMixed.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].meta_mixed).split()[1])
#     metaPos.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].meta_positive).split()[1])
#     metaNeg.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].meta_negative).split()[1])
#     userMixed.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].user_mixed).split()[1])
#     userPos.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].user_positive).split()[1])
#     userNeg.append(str(metaFrame.loc[metaFrame["movie_title"] == oscarFrame.loc[i,"Film"]].user_negative).split()[1])

# oscarFrame["MetaMixed"] = metaMixed
# oscarFrame["MetaPos"] = metaPos
# oscarFrame["MetaNeg"] = metaNeg
# oscarFrame["UserMixed"] = userMixed
# oscarFrame["UserPos"] = userPos
# oscarFrame["UserNeg"] = userNeg
# oscarFrame[100:].to_csv("reviewNumberFrame2.csv", index=False)


# #Analysing data and sorting it for easier viewing in first visualisation
# dateList = [1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015]  
# imdbList = []
# tomatCList = []
# tomatUList = []
# metaCList = []
# metaUList = []
# def winnerChecker (listName, columnName):
#     tempList = []
#     winnerRating = 77
#     winnerCount = 0
#     yearCount = 0
#     currentYear = 1970
#     for i in range(298):
#         if oscarFrame.iloc[i]["Year of Release"] != currentYear:
#             currentYear = oscarFrame.iloc[i]["Year of Release"] 
#             if len(tempList)>0 and max(tempList) == winnerRating:
#                 winnerCount+=1
#             tempList = []
#             winnerRating = oscarFrame.iloc[i][columnName]
#             yearCount+=1
#         if yearCount == 5:
#             listName.append(winnerCount)
#             tempList = []
#             yearCount = 0
#             winnerCount = 0
#         tempList.append(oscarFrame.iloc[i][columnName])
# winnerChecker(imdbList, "IMDB Rating")
# winnerChecker(tomatCList, "Tomatometer Rating")
# winnerChecker(tomatUList, "Audience Rating")
# winnerChecker(metaCList, "Meta Critic")
# winnerChecker(metaUList, "Meta User")

# data = {"RT Tomatometer Ratings":tomatCList,"MC Critic Ratings": metaCList,"RT Audience Ratings":tomatUList, "MC User Ratings":metaUList}
# firstFrame = pd.DataFrame(data, index=["70s","75s","80s","85","90s","95","00s","05","10s","15"])

# firstFrame.to_csv("winnersFrame.5.csv")
# oscarFrame = pd.read_csv("oscarFrameCritic6.csv")
# oscarFrame2 = pd.read_csv("oscarFrameUser3.csv")

# oscarFrame.to_csv("oscarFrameCritic11.csv",index=False)
# oscarFrame2.to_csv("oscarFrameUser5.csv", index=False)

# oscarFrame = pd.read_csv("oscarFrame4.csv")
# metaFrame = pd.read_csv("metacritic_movies.csv")

## Plotlib stuff

reviewFrame = pd.read_csv("reviewNumberFrame3.csv")
MCcritic = pd.read_csv("oscarFrameFinal3.csv")
winnerFrame = MCcritic[MCcritic.Award == 'Winner']

##FIXME
# The number of ratings each film received from critics.
plt.scatter(reviewFrame["Year of Release"], reviewFrame["Meta"], s=2,c="grey")
plt.show()
# The number of ratings each film received from users. 
plt.scatter(reviewFrame["Year of Release"], reviewFrame["User"], s=2,c="grey")
plt.ylim(ymin=0,ymax=2000)
plt.show()
# I decided to start my main visualisation from 1996 as it was around that 
# point that the number of critic reviews began to increase. More detail on 
# my reasoning can be found in my analysis.)


# Dot Strip plot showing the critic rating of each Best Picture nominee by 
# year, with the winner for that year displayed in orange.
plt.scatter(MCcritic.Year,MCcritic.MetaScore,s=2,c="grey")
plt.scatter(winnerFrame.Year,winnerFrame.MetaScore,s=2.5,c="orange")
plt.ylim(ymin=0,ymax=100)
plt.show()

# Dot Strip plot showing the user rating of each Best Picture nominee by 
# year, with the winner for that year displayed in blue.
plt.scatter(MCcritic.Year,MCcritic.UserScore,s=2,c="grey")
plt.scatter(winnerFrame.Year,winnerFrame.UserScore,s=2.5,c="blue")
plt.ylim(ymin=0,ymax=100)
plt.show()

## Press Run Above to see the two main bits of data analysis I did for this project.
#%%