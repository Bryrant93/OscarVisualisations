# %% 
import pandas as pd
import matplotlib.pyplot as plt

reviewFrame = pd.read_csv("reviewNumberFrame4.csv")
reviewFrameCut = pd.read_csv("reviewNumberFrame3.csv")
MCcritic = pd.read_csv("oscarFrameFinal.csv")
winnerFrame = MCcritic[MCcritic.Award == 'Winner']

print("As the data I have chosen covers a large time period, and the further back you went the more incomplete the data became I had to decide on the period which had the most accurate and truthful data.")
print("The following two histograms display the distribution of films from 1990-2018 by the number of reviews they received.")
print("Each bin in the critic reviews is approximately 20, while each bin in the user reviews in approximately 60.")
print("Please note the user review histogram has been dramatically truncated, as the second half of the chart was sparsely populated. I have included this seperately.")
plt.hist(reviewFrame["Meta"],25)
plt.title("Number of critical reviews recieved by Best Picture Nominees 1990-2018")
plt.show()
plt.hist(reviewFrame["User"],66)
plt.title("Number of user reviews recieved by Best Picture Nominees 1990-2018")
plt.xlim(xmax=2000)
plt.show()
plt.hist(reviewFrame["User"],66)
plt.title("Number of user reviews recieved by Best Picture Nominees 1990-2018 (2000+)")
plt.xlim(xmin=2000)
plt.show()
print("These were not hugely enlightening, so I decided to examine the data in a scattergraph so I could see the distribution of number of films by year.")
print(" ")

plt.scatter(reviewFrame["Year of Release"], reviewFrame["Meta"], s=2,c="grey")
plt.title("Number of critical reviews recieved by Best Picture Nominees 1990-2018")
plt.show()
plt.scatter(reviewFrame["Year of Release"], reviewFrame["User"], s=2,c="grey")
plt.title("Number of user reviews recieved by Best Picture Nominees 1990-2018")
plt.ylim(ymin=0,ymax=2000)
plt.show()
print("In the scatter graphs above I noticed that there was a change in 1996 for Critic reviews, as the films in that period stopped averaging fewer than 20 reviews and jumped up to high 20s and only rose from there.")
print("There was not as noticable a trend for user reviews, but when displayed on the histogram below (1996-2018) it became apparant that there were approximately only 7 films in the period 1996-2018 that had 60 or fewer reviews. As in the entire dataset there was no film with a number of critical reviews higher than 60 I decided this was an acceptable period of time to explore.")
plt.hist(reviewFrameCut["Meta"],25)
plt.title("Number of critical reviews recieved by Best Picture Nominees 1996-2018")
plt.show()
plt.hist(reviewFrameCut["User"],66)
plt.title("Number of critical reviews recieved by Best Picture Nominees 1996-2018")
plt.xlim(xmax=2000)
plt.show()
print(" ")

print("I made histograms for the following section, but they showed nothing and have chosen to omit them.")
print("These scatter graphs were far more enlightening and are the skeleton of what my final visualisation became.")
print("Each grey dot represents the aggregate rating of a film by either group, while the coloured dots represent the aggregate rating of the Best Picture winner for that year.")
print("There is a trend in this period that before 2009 critics and users were around equal at 'predicting' the winner, with users holding a slight advantage. (Critics: 3 correct, Users: 5 correct)")
print("Then on and after 2009, the critic's accuracy jumps up and user's accuracy drops down. (Critics: 7 correct, Users: 1 correct)")
print("There were changes made to Oscar voting procedures in 2009, which some claimed would cause more generic films to win the Best Picture, so I knew I had found something worth visualising and began from here.")
plt.scatter(MCcritic.Year,MCcritic.MetaScore,s=2,c="grey")
plt.scatter(winnerFrame.Year,winnerFrame.MetaScore,s=2.5,c="orange")
plt.title("Critical ratings of Best Picture nominees between 1996-2021, winner displayed in orange")
plt.ylim(ymin=0,ymax=100)
plt.show()

plt.scatter(MCcritic.Year,MCcritic.UserScore,s=2,c="grey")
plt.scatter(winnerFrame.Year,winnerFrame.UserScore,s=2.5,c="blue")
plt.title("User ratings of Best Picture nominees between 1996-2021, winner displayed in blue")
plt.ylim(ymin=0,ymax=100)
plt.show()
print(" ")



## Press Run Above to see the two main bits of data analysis I did for this project.
#%%