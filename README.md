# schooldaycalculator 
School Day Calculator is a tool to determine how many days of instruction there are in a given school's schedule. 
I wrote this application as way to practice my Meteor skills past those taught in Your First Meteor Application. 
To use the application, enter a start and end date for your school year as dictated by your school's schedule. 
Don't worry about eliminating weekends from the count as those are automatically factored out. 
Holidays that lie on weekends will not go into the database. 

The application will alert you when various problems arise in your submitted data. These problems may be: 
- Your break starts after the school year you defined 
- Your break starts before the school year you defined 

The application will also automatically remove any breaks that were once in the school year but no longer are 
after the school year's start or end dates were altered. 

Things to work on: 
- Invalidating breaks that lie outside the school year as a result of changes to the start/end date of the year 
rather than removing the break completely 
- Rewriting the MongoDB system as is so that the data is persistent for the client but not stored on the server 
- Making the website look less Bootstrappy 

Meteor packages in use: 
- twbs:bootstrap (Twitter's popular Bootstrap front-end framework for easy formatting of the site) 
- autopublish (Security) - insecure (Security) - less (for Bootstrap purposes)
