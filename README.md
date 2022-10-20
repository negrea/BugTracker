# Instructions (for Windows 10) #

## Prerequisites ##

Make sure to install the following:
- .NET 6 SDK (https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- Node.js 16.18.0 (https://nodejs.org/en/download/)
- Angular CLI 
		Install the CLI using the npm package manager:
			
			npm install -g @angular/cli

## Building the API ##

From the solution folder run:

	dotnet build --project '.\BugTracker.API\BugTracker.API.csproj'

## Building the Angular application ##

From the solution folder navigate to the BugTrackerApp folder and run:
	
	npm build

## Testing the API ##

From the solution folder run:

	dotnet test

## Testing the Angular application ##

From the solution folder navigate to the BugTrackerApp folder and run:
	
	npm test

## Creating the SQLite database for development ##

Install the CLI tools for Entity Framework Core by running:
	
	dotnet tool install --global dotnet-ef

From the solution folder navigate to the BugTracker.Infrastructure folder. To create the database run:
	
	dotnet ef database update

The above will create an SQLite database file in the special "local" folder for your platform. E.g.: C:\Users\<your username>\AppData\Local\bugTracker.db

## Running the API ##

From the solution folder run:

	dotnet run --project '.\BugTracker.API\BugTracker.API.csproj'

The API will be available at https://localhost:7073/index.html 

## Running the Angular application ##

From the solution folder navigate to the BugTrackerApp folder and restore the node modules by running:
	
	npm start

The Angular application will be available at https://localhost:4200

## Visual Studio ##

The solution can also be run by opening the solution file BugTracker.sln using Visual Studio (https://visualstudio.microsoft.com/vs/community/)


In Solution Explorer, right-click the solution name and select Set Startup Project. Change the startup project from Single startup project to Multiple startup projects. Select Start for the BugTracker.API and BugTrackerApp projects.


Select the Debug profile and Start the solution.

## Commentary ##

Considering this is just a technical exercise and that I needed to limit the time spent on completing it, several features/improvements have been purposely ignored even though some of them might be of a significance importance for a production ready release.
Please see my thoughts below on some of the extra steps I would have taken if this was part of a ‘on the job’ task. 


I regret the lack of testing and maybe I should have focused on delivering a smaller vertical slice that would have included a complete suite of unit and integration (API) tests instead of implementing all of the requested features.
Hopefully this doesn’t reflect poorly on my ability to write tests.

### Angular application code improvements ###
- Implement a Toast Module that includes a Toast Management Service and Toast Component. The Toast Management Service could then be injected in both the Bug and People Effects and be used to display HTTP response error message to the user as dismissible toasts.
- Create a Generic Form and Table Component for the Shared Forms Module and a newly created Shared Table Module, respectively. Bugs and People Modules could then consume these components through configuration via Input/Output properties.
- Improve form usability by highlining the input and displaying the validation message when errors occur during filling of the form.
- Improve table usability and performance by implementing a Table Filter Component and adding support for server-side pagination and filtering to the Table Component.  
- Abstract the Navigation Bar functionality and template into a separate component.
- Introduce a new isLoading property on the state objects that will track if a request has yet to complete. This value will be used to prevent the rare event of a user clicking Save twice before the request completes.
- Add support for GDPR by implementing a Cookie Consent Component.
- Add unit tests, especially for action dispatching and effects.

### API improvements ###
- Implement Authentication/Authorization, most likely using ASP.NET Core Identity.
- Add logging.
- Enable CORS.
- Configure and use Content-Security-Policy.
- Unit test the Command Validators.
- Add unit tests to enforce the current architecture.
- Replace the SQLite database for production.
- Store date times in UTC and use Moment.js to display the local time.
- Remove any leading and trailing whitespaces from string properties before updating entities.
- Separate appsettings files for different environments.
- Implement soft deletes for closed bugs.
- With regards to future performance consideration, I would ensure that data is not being over fetched (only select the properties required by the use case) when querying data and only mark properties that have changed their value as modified when performing updates.


