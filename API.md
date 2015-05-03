#MPMAP 2.0 RESTful API

Use these endpoints to access the MPELD data set used in MPMAP.


###Incident Data (JSON, GeoJSON, CSV)
```
GET: mpmap.mappingpiracy.net/geodata/:format?beginDate=yyyy-MM-dd&endDate=yyyy-MM-dd&&closestCountry=n1,n2,n3&waterCountry=n1,n2,n3&vesselCountry=n1,n2,n3&vesselType=n1,n2,n3&vesselStatus=n1,n2,n3&incidentType=n1,n2,n3&incidentAction=n1,n2,n3
```