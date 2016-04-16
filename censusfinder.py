import pandas as pd
import numpy as np
import geopandas as gpd
from shapely.geometry import *

census = gpd.read_file("cb_2014_36_tract_500k/cb_2014_36_tract_500k.shp")
three = pd.read_csv("erm2-nwe9.csv")
def censusfinder(lat,lon):
    try:
        if(np.isnan(lat)==True):
            return 0
        else:
            lat=np.float64(lat)
            lon= np.float64(lon)
            co = Point(lat,lon)
            count=0
            for i in census.intersects(co):
                count+=1
                if i == True:
                    return census["TRACTCE"][count-1]
    except:
        return 0
latlon= three[['Longitude','Latitude']]
d=[]
for i,j in zip(latlon['Longitude'],latlon['Latitude']):
    d.append(censusfinder(i,j))
file=pd.DataFrame({"cesusTract":d,"lat":latlon["Latitude"],"lon":latlon['Longitude']})
file.to_csv("censuslocation.csv")